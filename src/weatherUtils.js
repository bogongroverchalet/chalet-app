import { groupBy, map, mapValues, keyBy, filter, meanBy, sumBy, maxBy, minBy, some } from 'lodash'

export const WEATHER_API_URL =
  'https://api.open-meteo.com/v1/forecast?latitude=-36.90407103087054&longitude=147.30311304330826&hourly=temperature_2m,weathercode,precipitation_probability,precipitation,snowfall,windspeed_10m,windgusts_10m&timezone=Australia%2FMelbourne&forecast_days=10&wind_speed_unit=kmh'

const WMO_DESCRIPTIONS = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Icy fog',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Dense drizzle',
  56: 'Light freezing drizzle',
  57: 'Heavy freezing drizzle',
  61: 'Slight rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  66: 'Light freezing rain',
  67: 'Heavy freezing rain',
  71: 'Slight snow',
  73: 'Moderate snow',
  75: 'Heavy snow',
  77: 'Snow grains',
  80: 'Slight showers',
  81: 'Moderate showers',
  82: 'Heavy showers',
  85: 'Slight snow showers',
  86: 'Heavy snow showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with hail',
  99: 'Thunderstorm, heavy hail',
}

// Higher = more severe; used to pick the dominant condition code for a period
const WMO_PRIORITY = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  45: 5,
  48: 6,
  51: 8,
  53: 9,
  55: 10,
  56: 11,
  57: 12,
  61: 14,
  63: 15,
  65: 16,
  66: 17,
  67: 18,
  77: 19,
  71: 20,
  73: 21,
  75: 22,
  80: 23,
  81: 24,
  82: 25,
  85: 26,
  86: 27,
  95: 30,
  96: 31,
  99: 32,
}

export const wmoDescription = (code) => WMO_DESCRIPTIONS[code] ?? `Conditions (${code})`

export const isStormCode = (code) => code === 95 || code === 96 || code === 99

export const PERIODS = [
  { key: 'morning', label: 'Morning', sublabel: '6am–12pm', hourStart: 6, hourEnd: 12 },
  { key: 'midday', label: 'Midday', sublabel: '12–3pm', hourStart: 12, hourEnd: 15 },
  { key: 'afternoon', label: 'Afternoon', sublabel: '3–6pm', hourStart: 15, hourEnd: 18 },
  { key: 'night', label: 'Night', sublabel: '6pm–12am', hourStart: 18, hourEnd: 24 },
]

function aggregatePeriod(hours) {
  if (!hours.length) return null
  const codes = map(hours, 'weathercode')
  return {
    temp: Math.round(meanBy(hours, 'temperature_2m')),
    wmoCode: maxBy(codes, (c) => WMO_PRIORITY[c] ?? 0) ?? 0,
    precipProb: maxBy(hours, 'precipitation_probability')?.precipitation_probability ?? 0,
    precip: Math.round(sumBy(hours, (h) => h.precipitation ?? 0) * 10) / 10,
    snowfall: Math.round(sumBy(hours, (h) => h.snowfall ?? 0) * 10) / 10,
    wind: Math.round(maxBy(hours, 'windspeed_10m')?.windspeed_10m ?? 0),
    gusts: Math.round(maxBy(hours, 'windgusts_10m')?.windgusts_10m ?? 0),
    isStorm: some(codes, isStormCode),
  }
}

export function primeWeatherCache() {
  fetch('/api/weather').catch(() => {})
}

export async function registerPeriodicSync() {
  if (!('serviceWorker' in navigator)) return
  try {
    const reg = await navigator.serviceWorker.ready
    if (!('periodicSync' in reg)) return
    const perm = await navigator.permissions.query({ name: 'periodic-background-sync' })
    if (perm.state === 'granted') {
      await reg.periodicSync.register('weather-sync', { minInterval: 60 * 60 * 1000 })
    }
  } catch {
    // Not supported or permission denied
  }
}

export async function unregisterPeriodicSync() {
  if (!('serviceWorker' in navigator)) return
  try {
    const reg = await navigator.serviceWorker.ready
    if ('periodicSync' in reg) await reg.periodicSync.unregister('weather-sync')
  } catch {}
}

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export function parseHourly(raw) {
  const {
    time,
    temperature_2m,
    weathercode,
    precipitation_probability,
    precipitation,
    snowfall,
    windspeed_10m,
    windgusts_10m,
  } = raw.hourly

  const entries = time.map((t, i) => ({
    date: t.slice(0, 10),
    hour: parseInt(t.slice(11, 13), 10),
    temperature_2m: temperature_2m[i],
    weathercode: weathercode[i],
    precipitation_probability: precipitation_probability[i] ?? 0,
    precipitation: precipitation[i] ?? 0,
    snowfall: snowfall[i] ?? 0,
    windspeed_10m: windspeed_10m[i] ?? 0,
    windgusts_10m: windgusts_10m[i] ?? 0,
  }))

  return {
    days: map(groupBy(entries, 'date'), (dayHours, date) => {
      const periods = mapValues(keyBy(PERIODS, 'key'), ({ hourStart, hourEnd }) =>
        aggregatePeriod(filter(dayHours, (h) => h.hour >= hourStart && h.hour < hourEnd))
      )
      const d = new Date(date + 'T12:00:00')
      return {
        date,
        dayName: DAY_NAMES[d.getDay()],
        dateLabel: d.toLocaleDateString('en-AU', { day: 'numeric', month: 'short' }),
        high: Math.round(maxBy(dayHours, 'temperature_2m').temperature_2m),
        low: Math.round(minBy(dayHours, 'temperature_2m').temperature_2m),
        hasStorm: some(periods, 'isStorm'),
        periods,
      }
    }),
  }
}
