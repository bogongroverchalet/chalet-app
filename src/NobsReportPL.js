import React from 'react'
import { Link } from 'react-router-dom'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import PrintIcon from '@mui/icons-material/Print'
import ShareIcon from '@mui/icons-material/Share'
import Button from '@mui/material/Button'
import ClearFormDialog from './ClearFormDialog'
import winterWeeks from './winter-weeks.yaml'
import { getDefaultWeek, saveSelectedWeek } from './nobs-week'

const YEAR = String(winterWeeks.year)

const defaultWeek = getDefaultWeek()

function storageKey(weekName) {
  return `nobs-pl-${YEAR}-${weekName}`
}

function loadSaved(weekName) {
  try {
    return JSON.parse(localStorage.getItem(storageKey(weekName))) ?? {}
  } catch {
    return {}
  }
}

export default function NobsReportPL() {
  const [selectedWeek, setSelectedWeek] = React.useState(defaultWeek)
  const [fields, setFields] = React.useState(() => loadSaved(defaultWeek))
  const [sharing, setSharing] = React.useState(false)
  const [clearing, setClearing] = React.useState(false)

  const handleClear = () => {
    localStorage.removeItem(storageKey(selectedWeek))
    setFields({})
    setClearing(false)
  }

  React.useEffect(() => {
    setFields(loadSaved(selectedWeek))
  }, [selectedWeek])

  const updateField = (key, value) => {
    setFields((prev) => {
      const updated = { ...prev, [key]: value }
      localStorage.setItem(storageKey(selectedWeek), JSON.stringify(updated))
      return updated
    })
  }

  const handleShare = async () => {
    setSharing(true)
    try {
      const { pdf } = await import('@react-pdf/renderer')
      const { PLDocument } = await import('./NobsReportPLPDF')
      const logoUrl = `${window.location.origin}/bcmg-logo.png`
      const doc = (
        <PLDocument
          week={selectedWeek}
          year={YEAR}
          name={fields.name ?? ''}
          winterPartyReport={fields.winterPartyReport ?? ''}
          leadershipTeam={fields.leadershipTeam ?? ''}
          logoUrl={logoUrl}
        />
      )
      const blob = await pdf(doc).toBlob()
      const filename = `PL-Report-${selectedWeek.replace(/\W+/g, '-')}.pdf`
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
            Party Leader report
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
              Party Leader
              <br />
              Report
            </div>
          </div>
        </div>

        {/* Week / Year */}
        <div className='flex gap-8 mb-3 flex-wrap items-baseline'>
          <div className='flex items-baseline gap-2'>
            <label htmlFor='week-select' className='font-bold'>
              Week:
            </label>
            <select
              id='week-select'
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

        {/* Name */}
        <div className='flex items-baseline gap-2 border-b border-black pb-1 mb-6'>
          <label htmlFor='pl-name' className='font-bold whitespace-nowrap'>
            Name of Party Leader:
          </label>
          <input
            id='pl-name'
            type='text'
            className='no-print flex-1 bg-transparent outline-none min-w-0'
            value={fields.name ?? ''}
            onChange={(e) => updateField('name', e.target.value)}
            placeholder='Enter name…'
          />
          <span className='print-only flex-1'>{fields.name}</span>
        </div>

        {/* Winter Party Report */}
        <div className='mb-6'>
          <h2 className='text-xl font-bold mb-1'>Winter Party Report</h2>
          <p className='text-sm italic mb-2'>
            (Weather, significant events, rescues, injuries, safety concerns, participant concerns, illness, incidents
            of note. Major issues requiring BCMG discussion)
          </p>
          <textarea
            className='no-print w-full border border-slate-300 rounded p-2 min-h-[200px] resize-y text-base'
            value={fields.winterPartyReport ?? ''}
            onChange={(e) => updateField('winterPartyReport', e.target.value)}
            placeholder='Enter report…'
          />
          <div className='print-only min-h-[200px] whitespace-pre-wrap text-sm'>{fields.winterPartyReport}</div>
        </div>

        {/* Leadership Team */}
        <div className='mb-6'>
          <h2 className='text-xl font-bold mb-1'>Leadership Team</h2>
          <p className='text-sm italic mb-2'>
            (Critically reflect on the performance of the Nobs, their suitability to perform the role again, other
            potential Nobs from the Winter Party. If necessary, report directly to Wardens)
          </p>
          <textarea
            className='no-print w-full border border-slate-300 rounded p-2 min-h-[200px] resize-y text-base'
            value={fields.leadershipTeam ?? ''}
            onChange={(e) => updateField('leadershipTeam', e.target.value)}
            placeholder='Enter report…'
          />
          <div className='print-only min-h-[200px] whitespace-pre-wrap text-sm'>{fields.leadershipTeam}</div>
        </div>

        <p className='no-print text-sm text-slate-500 mb-3'>
          Use the <strong>Share / Download</strong> (or <strong>Print</strong>) button below to save this report to your
          phone, then{' '}
          <a
            href='https://www.dropbox.com/request/pLxk8watNOTyhy1PuTvo'
            target='_blank'
            rel='noreferrer'
            className='underline'
          >
            upload it
          </a>
          .
        </p>

        {/* Actions */}
        <div className='no-print flex gap-3 flex-wrap'>
          <Button variant='outlined' startIcon={<PrintIcon />} onClick={() => window.print()}>
            Print
          </Button>
          <Button variant='contained' startIcon={<ShareIcon />} onClick={handleShare} disabled={sharing}>
            {sharing ? 'Generating…' : 'Share / Download'}
          </Button>
          <Button
            variant='contained'
            color='success'
            href='https://www.dropbox.com/request/pLxk8watNOTyhy1PuTvo'
            target='_blank'
            rel='noreferrer'
          >
            Upload all reports
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
