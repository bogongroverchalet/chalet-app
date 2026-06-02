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

const YEAR = String(winterWeeks.year)

const DAYS = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
const EXITS = ['History room', 'Pigmy Possum shelter', 'Games room', 'Kitchen', 'Balcony']
const EXIT_ABBR = ['Hist.', 'Pigmy', 'Games', 'Kitch.', 'Balc.']
const CREWS = ['AVC', 'ARC', 'BRC']

const BULLET_PROMPTS = [
  'Identify future Nobs',
  'Critically reflect on the performance of the Nobs (if necessary report directly to the Wardens)',
  'Major issues requiring BCMG discussion',
  'Safety concerns or concerns with participants',
  'List of Invested attendees',
  'Sales of merchandise (including all sizes)',
  'ESM matters & feedback (e.g. snow clearing from emergency exits)',
]

function detectCurrentWeek() {
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Australia/Melbourne' }).format(new Date())
  return winterWeeks.weeks.find(({ start, end }) => today >= start && today <= end)?.name
}

const defaultWeek = detectCurrentWeek() ?? winterWeeks.weeks[0].name

function storageKey(weekName) {
  return `nobs-pa-${YEAR}-${weekName}`
}

function loadSaved(weekName) {
  try {
    return JSON.parse(localStorage.getItem(storageKey(weekName))) ?? {}
  } catch {
    return {}
  }
}

function emptyFields() {
  return { name: '', report: '', esmPaths: {}, investiture: [], investedBy: '', investitureDate: '' }
}

function esmKey(dayIdx, period, exitIdx) {
  return `${dayIdx}-${period}-${exitIdx}`
}

export default function NobsReportPA() {
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

  const toggleEsm = (dayIdx, period, exitIdx) => {
    const k = esmKey(dayIdx, period, exitIdx)
    updateField('esmPaths', { ...fields.esmPaths, [k]: !fields.esmPaths[k] })
  }

  const isEsmChecked = (dayIdx, period, exitIdx) => !!fields.esmPaths[esmKey(dayIdx, period, exitIdx)]

  const addInvestiture = () => updateField('investiture', [...fields.investiture, { name: '', crew: 'ARC' }])

  const updateInvestiture = (idx, key, value) =>
    updateField(
      'investiture',
      fields.investiture.map((r, i) => (i === idx ? { ...r, [key]: value } : r))
    )

  const removeInvestiture = (idx) =>
    updateField(
      'investiture',
      fields.investiture.filter((_, i) => i !== idx)
    )

  const handleShare = async () => {
    setSharing(true)
    try {
      const { pdf } = await import('@react-pdf/renderer')
      const { PADocument } = await import('./NobsReportPAPDF')
      const logoUrl = `${window.location.origin}/bcmg-logo.png`
      const blob = await pdf(<PADocument week={selectedWeek} year={YEAR} fields={fields} logoUrl={logoUrl} />).toBlob()
      const filename = `PA-Report-${selectedWeek.replace(/\W+/g, '-')}.pdf`
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
      <div className='no-print p-3 max-w-2xl mx-auto'>
        <h1 className='text-3xl my-4 -indent-12 max-sm:pl-10'>
          <Link to='..' relative='path'>
            <ChevronLeftIcon sx={{ fontSize: 40, position: 'relative', top: -3 }} />
            Party Advisor report
          </Link>
        </h1>
      </div>

      <div className='nobs-report-print-area max-w-2xl mx-auto px-4 pb-4'>
        {/* Report header */}
        <div className='flex items-start gap-4 mb-5'>
          <img src='/bcmg-logo.png' alt='Bogong Rover Chalet' className='w-20 h-20 flex-shrink-0' />
          <div>
            <div className='text-xs mb-1'>2026 version</div>
            <div className='text-4xl font-bold leading-tight'>
              Party Advisor
              <br />
              Report
            </div>
          </div>
        </div>

        {/* Week / Year */}
        <div className='flex gap-8 mb-3 flex-wrap items-baseline'>
          <div className='flex items-baseline gap-2'>
            <span className='font-bold'>Week:</span>
            <select
              className='no-print border-b border-slate-500 bg-transparent py-0.5'
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(e.target.value)}
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

        {/* Name */}
        <div className='flex items-baseline gap-2 border-b border-black pb-1 mb-6'>
          <span className='font-bold whitespace-nowrap'>Name of Party Advisor:</span>
          <input
            type='text'
            className='no-print flex-1 bg-transparent outline-none min-w-0'
            value={fields.name}
            onChange={(e) => updateField('name', e.target.value)}
            placeholder='Enter name…'
          />
          <span className='print-only flex-1'>{fields.name}</span>
        </div>

        {/* Main report */}
        <div className='mb-8'>
          <h2 className='text-xl font-bold mb-2'>Report</h2>
          <p className='text-sm mb-2'>Your report could touch on any of the following:</p>
          <ul className='text-sm list-disc ml-4 mb-3 space-y-0.5'>
            {BULLET_PROMPTS.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <textarea
            className='no-print w-full border border-slate-300 rounded p-2 min-h-[200px] resize-y text-base'
            value={fields.report}
            onChange={(e) => updateField('report', e.target.value)}
            placeholder='Enter report…'
          />
          <div className='print-only min-h-[200px] whitespace-pre-wrap text-sm'>{fields.report}</div>
        </div>

        {/* ESM exit paths */}
        <div className='mb-8'>
          <h2 className='text-xl font-bold mb-1'>ESM exit paths</h2>
          <p className='text-sm italic mb-3'>
            Check each exit twice daily to confirm it was clear of snow and other obstructions.
          </p>
          <div className='overflow-x-auto'>
            <table className='text-sm border-collapse'>
              <thead>
                <tr>
                  <th className='border border-slate-300 px-2 py-1 text-left min-w-[6rem]'></th>
                  {EXIT_ABBR.map((e, i) => (
                    <th key={i} className='border border-slate-300 px-2 py-1 text-center font-semibold min-w-[3.5rem]'>
                      {e}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {DAYS.map((day, dayIdx) =>
                  ['am', 'pm'].map((period) => (
                    <tr key={`${dayIdx}-${period}`}>
                      <td className='border border-slate-300 px-2 py-1 whitespace-nowrap'>
                        {period === 'am' && <span className='font-semibold'>{day} </span>}
                        {period.toUpperCase()}
                      </td>
                      {EXITS.map((_, exitIdx) => (
                        <td key={exitIdx} className='border border-slate-300 px-2 py-1 text-center'>
                          <input
                            type='checkbox'
                            className='no-print w-4 h-4 cursor-pointer'
                            checked={isEsmChecked(dayIdx, period, exitIdx)}
                            onChange={() => toggleEsm(dayIdx, period, exitIdx)}
                          />
                          <span className='print-only'>{isEsmChecked(dayIdx, period, exitIdx) ? '✓' : ''}</span>
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Investiture list */}
        <div className='mb-8'>
          <h2 className='text-xl font-bold mb-3'>Investiture list</h2>
          <div className='flex gap-6 mb-3 flex-wrap text-sm'>
            <div className='flex items-baseline gap-2'>
              <span className='font-semibold'>Date:</span>
              <input
                type='date'
                className='no-print border-b border-slate-500 bg-transparent outline-none'
                value={fields.investitureDate}
                onChange={(e) => updateField('investitureDate', e.target.value)}
              />
              <span className='print-only'>{fields.investitureDate}</span>
            </div>
            <div className='flex items-baseline gap-2'>
              <span className='font-semibold'>Invested by:</span>
              <input
                type='text'
                className='no-print border-b border-slate-500 bg-transparent outline-none'
                value={fields.investedBy}
                onChange={(e) => updateField('investedBy', e.target.value)}
                placeholder='Enter name…'
              />
              <span className='print-only'>{fields.investedBy}</span>
            </div>
          </div>

          {fields.investiture.length > 0 && (
            <table className='text-sm border-collapse w-full mb-2'>
              <thead>
                <tr>
                  <th className='border border-slate-300 px-2 py-1 text-left'>Name</th>
                  <th className='border border-slate-300 px-2 py-1 text-left w-24'>Crew</th>
                  <th className='no-print border border-slate-300 px-1 py-1 w-8'></th>
                </tr>
              </thead>
              <tbody>
                {fields.investiture.map((row, idx) => (
                  <tr key={idx}>
                    <td className='border border-slate-300 px-2 py-1'>
                      <input
                        type='text'
                        className='no-print w-full bg-transparent outline-none'
                        value={row.name}
                        onChange={(e) => updateInvestiture(idx, 'name', e.target.value)}
                        placeholder='Full name…'
                      />
                      <span className='print-only'>{row.name}</span>
                    </td>
                    <td className='border border-slate-300 px-2 py-1'>
                      <select
                        className='no-print bg-transparent'
                        value={row.crew}
                        onChange={(e) => updateInvestiture(idx, 'crew', e.target.value)}
                      >
                        {CREWS.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                      <span className='print-only'>{row.crew}</span>
                    </td>
                    <td className='no-print border border-slate-300 px-1 py-1 text-center'>
                      <IconButton size='small' onClick={() => removeInvestiture(idx)}>
                        <DeleteIcon fontSize='small' />
                      </IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div className='no-print'>
            <Button size='small' startIcon={<AddIcon />} onClick={addInvestiture} variant='outlined'>
              Add person
            </Button>
          </div>
          <p className='text-xs text-slate-500 mt-2'>
            AVC = Alpine Venturer Crew · ARC = Alpine Rover Crew · BRC = Bogong Rover Crew
          </p>
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
