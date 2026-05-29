import React from 'react'
import { Link } from 'react-router-dom'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import RefreshIcon from '@mui/icons-material/Refresh'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import IconButton from '@mui/material/IconButton'
import Switch from '@mui/material/Switch'
import Tooltip from '@mui/material/Tooltip'
import classnames from 'classnames'
import { filter } from 'lodash'
import { parseHourly, wmoDescription, PERIODS, WEATHER_API_URL } from './weatherUtils'

const tipClass = { tooltip: 'text-center !text-[0.9rem]' }

export default function Weather() {
  const [weatherData, setWeatherData] = React.useState(null)
  const [fetchedAt, setFetchedAt] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(false)
  const [syncSupported, setSyncSupported] = React.useState(false)
  const [syncEnabled, setSyncEnabled] = React.useState(() => localStorage.getItem('weatherPeriodicSync') !== 'false')

  const load = React.useCallback(async () => {
    setLoading(true)
    setError(false)
    try {
      const resp = await fetch('/api/weather')
      if (!resp.ok) throw new Error('sw-not-ready')
      const { data, fetchedAt: ts } = await resp.json()
      setWeatherData(parseHourly(data))
      setFetchedAt(ts)
    } catch {
      // Service worker not yet controlling page (first install) — fetch directly
      try {
        const resp = await fetch(WEATHER_API_URL)
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
        const data = await resp.json()
        setWeatherData(parseHourly(data))
        setFetchedAt(Date.now())
      } catch {
        setError(true)
      }
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => {
    load()
    window.addEventListener('online', load)
    navigator.serviceWorker?.ready.then((reg) => {
      if ('sync' in reg) reg.sync.register('weather-sync-once').catch(() => {})
    })
    const onSwMessage = ({ data }) => {
      if (data?.type === 'weatherUpdated') load()
    }
    navigator.serviceWorker?.addEventListener('message', onSwMessage)
    return () => {
      window.removeEventListener('online', load)
      navigator.serviceWorker?.removeEventListener('message', onSwMessage)
    }
  }, [load])

  React.useEffect(() => {
    navigator.serviceWorker?.ready.then((reg) => setSyncSupported('periodicSync' in reg))
  }, [])

  React.useEffect(() => {
    if (syncEnabled) registerPeriodicSync()
    else unregisterPeriodicSync()
  }, [syncEnabled])

  const toggleSync = (e) => {
    const enabled = e.target.checked
    setSyncEnabled(enabled)
    localStorage.setItem('weatherPeriodicSync', enabled ? 'true' : 'false')
  }

  const stormDays = filter(weatherData?.days, 'hasStorm')
  const isStale = fetchedAt != null && Date.now() - fetchedAt > 6 * 60 * 60 * 1000

  return (
    <div className='min-h-screen p-3 max-w-2xl mx-auto'>
      <div className='flex items-center'>
        <h1 className='text-3xl my-4 -indent-12 max-sm:pl-10 flex-1'>
          <Link to='/'>
            <ChevronLeftIcon sx={{ fontSize: 40, position: 'relative', top: -3 }} />
            Weather
          </Link>
        </h1>
        <div className='flex items-center gap-1 shrink-0'>
          {syncSupported && (
            <Tooltip
              title={syncEnabled ? 'Hourly background refresh on' : 'Hourly background refresh off'}
              arrow
              classes={tipClass}
            >
              <span className='flex items-center'>
                <Switch
                  checked={syncEnabled}
                  onChange={toggleSync}
                  size='small'
                  inputProps={{ 'aria-label': 'Background auto-refresh' }}
                />
              </span>
            </Tooltip>
          )}
          {fetchedAt != null && (
            <span className='text-sm text-slate-500 whitespace-nowrap'>{formatAge(fetchedAt)}</span>
          )}
          <IconButton onClick={load} disabled={loading} size='small' aria-label='Refresh weather'>
            <RefreshIcon className={classnames(loading && 'animate-spin')} />
          </IconButton>
        </div>
      </div>

      {isStale && (
        <Alert severity='warning' className='mb-3'>
          Forecast is over 6 hours old — connect to the internet and refresh for the latest.
        </Alert>
      )}

      {stormDays.length > 0 && (
        <Alert severity='error' className='mb-3'>
          <strong>Storm warning</strong> — thunderstorms forecast on{' '}
          {stormDays.map((d, i) => (
            <span key={d.date}>
              {i > 0 ? ', ' : ''}
              {d.dayName} {d.dateLabel}
            </span>
          ))}
        </Alert>
      )}

      {loading && !weatherData && (
        <div className='flex justify-center py-12'>
          <CircularProgress />
        </div>
      )}

      {!loading && error && !weatherData && (
        <Alert severity='info'>
          No weather data available yet. Open the app with an internet connection to load the 7-day forecast.
        </Alert>
      )}

      {weatherData && weatherData.days.map((day, i) => <DayCard key={day.date} day={day} isToday={i === 0} />)}

      {weatherData && (
        <p className='text-xs text-slate-400 mt-2 mb-6 text-center'>Bogong Rover Chalet, 1494m · Source: Open-Meteo</p>
      )}
    </div>
  )
}

function DayCard({ day, isToday }) {
  const { dayName, dateLabel, high, low, hasStorm, periods } = day
  return (
    <div className='mb-3 border border-slate-300 rounded-lg overflow-hidden'>
      <div
        className={classnames(
          'px-3 py-2 flex justify-between items-center',
          isToday ? 'bg-blue-700 text-white' : 'bg-slate-700 text-white'
        )}
      >
        <span className='font-bold'>
          {isToday ? 'Today' : dayName} <span className='font-normal text-sm opacity-80'>{dateLabel}</span>
        </span>
        <span className='flex items-center gap-2 text-sm'>
          {hasStorm && <span className='text-yellow-300 font-bold'>⚡ Storm</span>}
          <Tooltip title='Full-day high / low (all 24 hours)' arrow classes={tipClass}>
            <span className='cursor-help'>
              {high}° / {low}°C
            </span>
          </Tooltip>
        </span>
      </div>

      <div className='grid grid-cols-4 bg-slate-100 border-b border-slate-200 text-center text-xs'>
        {PERIODS.map(({ key, label, sublabel }) => (
          <div key={key} className='py-1 px-0.5 border-r last:border-r-0 border-slate-200'>
            <div className='font-semibold'>{label}</div>
            <div className='text-slate-500'>{sublabel}</div>
          </div>
        ))}
      </div>

      <div className='grid grid-cols-4 divide-x divide-slate-200'>
        {PERIODS.map(({ key }) => (
          <PeriodCell key={key} data={periods[key]} />
        ))}
      </div>
    </div>
  )
}

function PeriodCell({ data }) {
  if (!data) return <div className='p-1 text-center text-xs text-slate-400'>N/A</div>
  return (
    <div className='p-1.5 flex flex-col gap-0.5 items-center text-center'>
      <Tooltip
        title='The dominant weather condition for this period — based on the most severe hour'
        arrow
        classes={tipClass}
      >
        <div
          className={classnames(
            'text-xs leading-tight cursor-help',
            data.isStorm ? 'text-red-600 font-bold' : 'text-slate-600'
          )}
        >
          {wmoDescription(data.wmoCode)}
        </div>
      </Tooltip>
      <div className='text-base font-bold'>{data.temp}°C</div>
      <Tooltip title='Chance of precipitation · total amount for this period' arrow classes={tipClass}>
        <div className='text-xs text-slate-600 cursor-help'>
          {data.precipProb}%{data.precip > 0 ? ` / ${data.precip}mm` : ''}
        </div>
      </Tooltip>
      {data.snowfall > 0 && (
        <Tooltip title='Total snowfall expected in this period' arrow classes={tipClass}>
          <div className='text-xs font-semibold text-sky-600 cursor-help'>{data.snowfall}cm snow</div>
        </Tooltip>
      )}
      <Tooltip title='Max sustained wind speed · max gusts for this period' arrow classes={tipClass}>
        <div className='text-xs text-slate-500 leading-tight text-center cursor-help'>
          <div>{data.wind} km/h</div>
          <div>gusts of {data.gusts} km/h</div>
        </div>
      </Tooltip>
    </div>
  )
}

function formatAge(fetchedAt) {
  const mins = Math.round((Date.now() - fetchedAt) / 60000)
  if (mins < 1) return 'Just updated'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

async function registerPeriodicSync() {
  if (!('serviceWorker' in navigator)) return
  try {
    const reg = await navigator.serviceWorker.ready
    if (!('periodicSync' in reg)) return
    const perm = await navigator.permissions.query({ name: 'periodic-background-sync' })
    if (perm.state === 'granted') {
      await reg.periodicSync.register('weather-sync', { minInterval: 60 * 60 * 1000 })
    }
  } catch {
    // Not supported or permission denied — on-mount and manual refresh only
  }
}

async function unregisterPeriodicSync() {
  if (!('serviceWorker' in navigator)) return
  try {
    const reg = await navigator.serviceWorker.ready
    if ('periodicSync' in reg) await reg.periodicSync.unregister('weather-sync')
  } catch {}
}
