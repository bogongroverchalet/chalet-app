import React from 'react'
import { Link } from 'react-router-dom'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import PrintIcon from '@mui/icons-material/Print'
import ShareIcon from '@mui/icons-material/Share'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/material/Button'
import ClearFormDialog from './ClearFormDialog'
import IconButton from '@mui/material/IconButton'
import winterWeeks from './winter-weeks.yaml'
import { getDefaultWeek, saveSelectedWeek } from './nobs-week'

const YEAR = String(winterWeeks.year)

const DAYS = ['sat', 'sun', 'mon', 'tue', 'wed', 'thu', 'fri']
const DAY_LABELS = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']

const START_CHECKS = [
  { key: 'followStartup', label: 'Follow startup checklist' },
  { key: 'sheaths', label: 'Sheaths approximately 1m above snow' },
  { key: 'ropeOffHook', label: 'Rope off hook and sitting on all wheels' },
  { key: 'ropeTensioned', label: 'Rope tensioned' },
  { key: 'ropeEntry', label: 'Rope entry to tow hut clear of snow and ice' },
  { key: 'oilLevel', label: 'Oil level checked' },
  { key: 'coolantLevel', label: 'Coolant level checked' },
  { key: 'fuelLevel', label: 'Fuel level checked' },
  { key: 'fuelTap', label: 'Fuel tap open' },
  { key: 'eStops', label: 'E-Stops and safety gate tested and reset (x5)' },
  { key: 'towHutTidy', label: 'Tow hut tidy' },
]

const END_CHECKS = [
  { key: 'followShutdown', label: 'Follow shutdown checklist' },
  { key: 'fuelTapClosed', label: 'Fuel tap closed' },
  { key: 'masterKeyOff', label: 'Control panel master key off' },
  { key: 'batteryIsolators', label: 'Battery isolators off' },
  { key: 'ropeHooked', label: 'Rope hooked above road' },
]

const defaultWeek = getDefaultWeek()

function storageKey(weekName) {
  return `nobs-tl-${YEAR}-${weekName}`
}

function loadSaved(weekName) {
  try {
    return JSON.parse(localStorage.getItem(storageKey(weekName))) ?? {}
  } catch {
    return {}
  }
}

function emptyFields() {
  return {
    towLeader: '',
    fuelAdded: '',
    oilAdded: '',
    coolantAdded: '',
    totalRunningHours: '',
    startChecks: {},
    startInitials: {},
    endChecks: {},
    endInitials: {},
    hourMeter: {},
    issues: '',
    incidentReports: false,
    towUsers: [],
  }
}

export default function NobsReportTL() {
  const [selectedWeek, setSelectedWeek] = React.useState(defaultWeek)
  const [fields, setFields] = React.useState(() => ({ ...emptyFields(), ...loadSaved(defaultWeek) }))
  const [sharing, setSharing] = React.useState(false)
  const [clearing, setClearing] = React.useState(false)

  const handleClear = () => {
    localStorage.removeItem(storageKey(selectedWeek))
    setFields(emptyFields())
    setClearing(false)
  }

  React.useEffect(() => {
    setFields({ ...emptyFields(), ...loadSaved(selectedWeek) })
  }, [selectedWeek])

  const updateField = (key, value) => {
    setFields((prev) => {
      const updated = { ...prev, [key]: value }
      localStorage.setItem(storageKey(selectedWeek), JSON.stringify(updated))
      return updated
    })
  }

  const toggleStartCheck = (day, checkKey) => {
    const k = `${day}_${checkKey}`
    updateField('startChecks', { ...fields.startChecks, [k]: !fields.startChecks[k] })
  }

  const isStartChecked = (day, checkKey) => !!fields.startChecks[`${day}_${checkKey}`]

  const toggleEndCheck = (day, checkKey) => {
    const k = `${day}_${checkKey}`
    updateField('endChecks', { ...fields.endChecks, [k]: !fields.endChecks[k] })
  }

  const isEndChecked = (day, checkKey) => !!fields.endChecks[`${day}_${checkKey}`]

  const addTowUser = () =>
    updateField('towUsers', [...fields.towUsers, { name: '', trainingProvided: false, other: '' }])

  const updateTowUser = (idx, key, value) =>
    updateField(
      'towUsers',
      fields.towUsers.map((r, i) => (i === idx ? { ...r, [key]: value } : r))
    )

  const removeTowUser = (idx) =>
    updateField(
      'towUsers',
      fields.towUsers.filter((_, i) => i !== idx)
    )

  const handleShare = async () => {
    setSharing(true)
    try {
      const { pdf } = await import('@react-pdf/renderer')
      const { TLDocument } = await import('./NobsReportTLPDF')
      const logoUrl = `${window.location.origin}/bcmg-logo.png`
      const blob = await pdf(<TLDocument week={selectedWeek} year={YEAR} fields={fields} logoUrl={logoUrl} />).toBlob()
      const filename = `TL-Report-${selectedWeek.replace(/\W+/g, '-')}.pdf`
      const file = new File([blob], filename, { type: 'application/pdf' })
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: filename })
      } else {
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = filename
        a.click()
        URL.revokeObjectURL(url)
      }
    } catch (e) {
      if (e?.name !== 'AbortError') console.error('Share failed', e)
    } finally {
      setSharing(false)
    }
  }

  return (
    <>
      <div className='no-print p-3 max-w-3xl mx-auto'>
        <h1 className='text-3xl my-4 -indent-12 max-sm:pl-10'>
          <Link to='..' relative='path'>
            <ChevronLeftIcon sx={{ fontSize: 40, position: 'relative', top: -3 }} />
            Tow Leader report
          </Link>
        </h1>
      </div>

      <div className='nobs-report-print-area max-w-3xl mx-auto px-4 pb-4'>
        {/* Report header */}
        <div className='flex items-start gap-4 mb-5'>
          <img src='/bcmg-logo.png' alt='Bogong Rover Chalet' className='w-20 h-20 flex-shrink-0' />
          <div>
            <div className='text-xs mb-1'>2026 version</div>
            <div className='text-4xl font-bold leading-tight'>
              Tow Leader
              <br />
              Report
            </div>
          </div>
        </div>

        <p className='text-sm italic mb-4'>Copy details from the tow hut logbook.</p>

        {/* Week / Year */}
        <div className='flex gap-8 mb-3 flex-wrap items-baseline'>
          <div className='flex items-baseline gap-2'>
            <span className='font-bold'>Week:</span>
            <select
              className='no-print border-b border-slate-500 bg-transparent py-0.5'
              value={selectedWeek}
              onChange={(e) => {
                saveSelectedWeek(e.target.value)
                setSelectedWeek(e.target.value)
              }}
            >
              {winterWeeks.weeks.map((w) => (
                <option key={w.name} value={w.name}>
                  {w.name} ({w.dates})
                </option>
              ))}
            </select>
            <span className='print-only border-b border-black pb-0.5 min-w-[12em]'>{selectedWeek}</span>
          </div>
          <div className='flex items-baseline gap-2'>
            <span className='font-bold'>Year:</span>
            <span>{YEAR}</span>
          </div>
        </div>

        {/* Tow Leader name */}
        <div className='flex items-baseline gap-2 border-b border-black pb-1 mb-6'>
          <span className='font-bold whitespace-nowrap'>Tow Leader:</span>
          <input
            type='text'
            className='no-print flex-1 bg-transparent outline-none min-w-0'
            value={fields.towLeader ?? ''}
            onChange={(e) => updateField('towLeader', e.target.value)}
            placeholder='Enter name…'
          />
          <span className='print-only flex-1'>{fields.towLeader}</span>
        </div>

        {/* Weekly totals */}
        <div className='mb-6'>
          <h2 className='text-xl font-bold mb-2'>Weekly totals</h2>
          <table className='text-sm border-collapse w-full max-w-md'>
            <tbody>
              {[
                { key: 'fuelAdded', label: 'Fuel added to fuel tank' },
                { key: 'oilAdded', label: 'Oil added to sump' },
                { key: 'coolantAdded', label: 'Coolant added to radiator' },
                { key: 'totalRunningHours', label: 'Total running hours for the week' },
              ].map(({ key, label }) => (
                <tr key={key}>
                  <td className='border border-slate-300 px-2 py-1'>{label}</td>
                  <td className='border border-slate-300 px-2 py-1 w-32'>
                    <input
                      type='text'
                      inputMode='decimal'
                      className='no-print w-full bg-transparent outline-none'
                      value={fields[key] ?? ''}
                      onChange={(e) => updateField(key, e.target.value)}
                    />
                    <span className='print-only'>{fields[key]}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Start of day checks */}
        <div className='mb-6'>
          <h2 className='text-xl font-bold mb-2'>Start of day checks</h2>
          <div className='overflow-x-auto'>
            <table className='text-xs border-collapse'>
              <thead>
                <tr>
                  <th className='border border-slate-300 px-2 py-1 text-left min-w-[14rem]'></th>
                  {DAY_LABELS.map((d) => (
                    <th key={d} className='border border-slate-300 px-2 py-1 text-center w-10'>
                      {d}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {START_CHECKS.map(({ key, label }) => (
                  <tr key={key}>
                    <td className='border border-slate-300 px-2 py-1'>{label}</td>
                    {DAYS.map((day) => (
                      <td key={day} className='border border-slate-300 px-2 py-1 text-center'>
                        <input
                          type='checkbox'
                          className='no-print w-4 h-4 cursor-pointer'
                          checked={isStartChecked(day, key)}
                          onChange={() => toggleStartCheck(day, key)}
                        />
                        <span className='print-only'>{isStartChecked(day, key) ? '✓' : ''}</span>
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td className='border border-slate-300 px-2 py-1 font-semibold'>
                    Initials of Designated Tow Operator
                  </td>
                  {DAYS.map((day) => (
                    <td key={day} className='border border-slate-300 px-1 py-1 text-center'>
                      <input
                        type='text'
                        className='no-print w-8 bg-transparent outline-none text-center text-xs border-b border-slate-400'
                        value={fields.startInitials?.[day] ?? ''}
                        onChange={(e) =>
                          updateField('startInitials', { ...fields.startInitials, [day]: e.target.value })
                        }
                        maxLength={4}
                      />
                      <span className='print-only text-xs'>{fields.startInitials?.[day]}</span>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* End of day checks */}
        <div className='mb-6'>
          <h2 className='text-xl font-bold mb-2'>End of day checks</h2>
          <div className='overflow-x-auto'>
            <table className='text-xs border-collapse'>
              <thead>
                <tr>
                  <th className='border border-slate-300 px-2 py-1 text-left min-w-[14rem]'></th>
                  {DAY_LABELS.map((d) => (
                    <th key={d} className='border border-slate-300 px-2 py-1 text-center w-10'>
                      {d}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {END_CHECKS.map(({ key, label }) => (
                  <tr key={key}>
                    <td className='border border-slate-300 px-2 py-1'>{label}</td>
                    {DAYS.map((day) => (
                      <td key={day} className='border border-slate-300 px-2 py-1 text-center'>
                        <input
                          type='checkbox'
                          className='no-print w-4 h-4 cursor-pointer'
                          checked={isEndChecked(day, key)}
                          onChange={() => toggleEndCheck(day, key)}
                        />
                        <span className='print-only'>{isEndChecked(day, key) ? '✓' : ''}</span>
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td className='border border-slate-300 px-2 py-1 font-semibold'>
                    Hour meter reading (total system time)
                  </td>
                  {DAYS.map((day) => (
                    <td key={day} className='border border-slate-300 px-1 py-1 text-center'>
                      <input
                        type='text'
                        inputMode='decimal'
                        className='no-print w-8 bg-transparent outline-none text-center text-xs border-b border-slate-400'
                        value={fields.hourMeter?.[day] ?? ''}
                        onChange={(e) => updateField('hourMeter', { ...fields.hourMeter, [day]: e.target.value })}
                      />
                      <span className='print-only text-xs'>{fields.hourMeter?.[day]}</span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className='border border-slate-300 px-2 py-1 font-semibold'>
                    Initials of Designated Tow Operator
                  </td>
                  {DAYS.map((day) => (
                    <td key={day} className='border border-slate-300 px-1 py-1 text-center'>
                      <input
                        type='text'
                        className='no-print w-8 bg-transparent outline-none text-center text-xs border-b border-slate-400'
                        value={fields.endInitials?.[day] ?? ''}
                        onChange={(e) => updateField('endInitials', { ...fields.endInitials, [day]: e.target.value })}
                        maxLength={4}
                      />
                      <span className='print-only text-xs'>{fields.endInitials?.[day]}</span>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Issues / comments */}
        <div className='mb-6'>
          <h2 className='text-xl font-bold mb-1'>Issues & comments</h2>
          <p className='text-sm italic mb-2'>
            Issues, comments, list of designated Tow Operators, date and time of Tow Trained User briefing.
          </p>
          <textarea
            className='no-print w-full border border-slate-300 rounded p-2 min-h-[150px] resize-y text-base'
            value={fields.issues ?? ''}
            onChange={(e) => updateField('issues', e.target.value)}
            placeholder='Enter issues and comments…'
          />
          <div className='print-only min-h-[150px] whitespace-pre-wrap text-sm'>{fields.issues}</div>

          <label className='flex items-center gap-2 text-sm font-semibold cursor-pointer mt-3'>
            <input
              type='checkbox'
              className='no-print w-4 h-4'
              checked={fields.incidentReports ?? false}
              onChange={(e) => updateField('incidentReports', e.target.checked)}
            />
            <span className='print-only'>{fields.incidentReports ? '☑' : '☐'}</span>
            Have you completed your incident reports?
          </label>
        </div>

        {/* Tow Operators list */}
        <div className='mb-6'>
          <h2 className='text-xl font-bold mb-3'>Designated Tow Operators</h2>

          {fields.towUsers.length > 0 && (
            <table className='text-sm border-collapse w-full mb-2'>
              <thead>
                <tr>
                  <th className='border border-slate-300 px-2 py-1 text-left w-8'>#</th>
                  <th className='border border-slate-300 px-2 py-1 text-left'>Name</th>
                  <th className='border border-slate-300 px-2 py-1 text-center w-28'>Training Provided</th>
                  <th className='border border-slate-300 px-2 py-1 text-left'>Other</th>
                  <th className='no-print border border-slate-300 px-1 py-1 w-8'></th>
                </tr>
              </thead>
              <tbody>
                {fields.towUsers.map((row, idx) => (
                  <tr key={idx}>
                    <td className='border border-slate-300 px-2 py-1 text-slate-400 text-center'>{idx + 1}</td>
                    <td className='border border-slate-300 px-2 py-1'>
                      <input
                        type='text'
                        className='no-print w-full bg-transparent outline-none'
                        value={row.name}
                        onChange={(e) => updateTowUser(idx, 'name', e.target.value)}
                        placeholder='Full name…'
                      />
                      <span className='print-only'>{row.name}</span>
                    </td>
                    <td className='border border-slate-300 px-2 py-1 text-center'>
                      <input
                        type='checkbox'
                        className='no-print w-4 h-4 cursor-pointer'
                        checked={row.trainingProvided ?? false}
                        onChange={(e) => updateTowUser(idx, 'trainingProvided', e.target.checked)}
                      />
                      <span className='print-only'>{row.trainingProvided ? '✓' : ''}</span>
                    </td>
                    <td className='border border-slate-300 px-2 py-1'>
                      <input
                        type='text'
                        className='no-print w-full bg-transparent outline-none'
                        value={row.other}
                        onChange={(e) => updateTowUser(idx, 'other', e.target.value)}
                        placeholder='Notes…'
                      />
                      <span className='print-only'>{row.other}</span>
                    </td>
                    <td className='no-print border border-slate-300 px-1 py-1 text-center'>
                      <IconButton size='small' onClick={() => removeTowUser(idx)}>
                        <DeleteIcon fontSize='small' />
                      </IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div className='no-print'>
            <Button size='small' startIcon={<AddIcon />} onClick={addTowUser} variant='outlined'>
              Add person
            </Button>
          </div>
        </div>

        <p className='no-print text-sm text-slate-500 mb-3'>
          Use the <strong>Share / Download</strong> (or <strong>Print</strong>) button below to save this report to your
          phone, then share it with your Party Leader.
        </p>

        {/* Actions */}
        <div className='no-print flex gap-3 flex-wrap'>
          <Button variant='outlined' startIcon={<PrintIcon />} onClick={() => window.print()}>
            Print
          </Button>
          <Button variant='contained' startIcon={<ShareIcon />} onClick={handleShare} disabled={sharing}>
            {sharing ? 'Generating…' : 'Share / Download'}
          </Button>
          <Button variant='outlined' color='error' onClick={() => setClearing(true)}>
            Clear
          </Button>
        </div>
      </div>

      <ClearFormDialog
        open={clearing}
        weekName={selectedWeek}
        onClose={() => setClearing(false)}
        onConfirm={handleClear}
      />
    </>
  )
}
