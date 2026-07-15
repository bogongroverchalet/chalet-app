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
  return `nobs-ce-${YEAR}-${weekName}`
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
    name: '',
    startListerResettable: '',
    startListerTotal: '',
    startListerFuel: '',
    startPetterResettable: '',
    startPetterTotal: '',
    startPetterFuel: '',
    endListerResettable: '',
    endListerTotal: '',
    endListerFuel: '',
    endPetterResettable: '',
    endPetterTotal: '',
    endPetterFuel: '',
    logbookCompleted: false,
    breakagesFixes: '',
    theodore: '',
    waterSupply: '',
    gasSupply: '',
    sewerage: '',
    bin1Start: '',
    bin1End: '',
    bin2Start: '',
    bin2End: '',
    bin3Start: '',
    bin3End: '',
    chaletEquipment: '',
    otherStructures: '',
  }
}

function GeneratorTable({ prefix, fields, updateField }) {
  const numField = (key, id) => (
    <>
      <input
        id={id}
        type='text'
        inputMode='decimal'
        className='no-print w-20 bg-transparent outline-none border-b border-slate-400'
        value={fields[key] ?? ''}
        onChange={(e) => updateField(key, e.target.value)}
      />
      <span className='print-only'>{fields[key]}</span>
    </>
  )
  return (
    <table className='text-sm border-collapse mb-4'>
      <thead>
        <tr>
          <th className='border border-slate-300 px-2 py-1 text-left bg-slate-100 w-44'>Generators</th>
          <th className='border border-slate-300 px-2 py-1 bg-slate-100 w-24'></th>
          <th className='border border-slate-300 px-2 py-1 text-left bg-slate-100 w-40'>Fuel Levels</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className='border border-slate-300 px-2 py-1 font-semibold bg-slate-50' colSpan={2}>
            Lister
          </td>
          <td className='border border-slate-300 px-2 py-1' rowSpan={3}>
            <div className='font-semibold text-xs mb-1'>Generator Tank</div>
            <div className='flex items-center gap-1 text-xs'>
              Litres: {numField(`${prefix}ListerFuel`, `gen-${prefix}ListerFuel`)}
            </div>
          </td>
        </tr>
        <tr>
          <td className='border border-slate-300 px-2 py-1'>
            <label htmlFor={`gen-${prefix}ListerResettable`} className='block cursor-pointer'>
              Resettable Hours
            </label>
          </td>
          <td className='border border-slate-300 px-2 py-1'>
            {numField(`${prefix}ListerResettable`, `gen-${prefix}ListerResettable`)}
          </td>
        </tr>
        <tr>
          <td className='border border-slate-300 px-2 py-1'>
            <label htmlFor={`gen-${prefix}ListerTotal`} className='block cursor-pointer'>
              Total Hours
            </label>
          </td>
          <td className='border border-slate-300 px-2 py-1'>
            {numField(`${prefix}ListerTotal`, `gen-${prefix}ListerTotal`)}
          </td>
        </tr>
        <tr>
          <td className='border border-slate-300 px-2 py-1 font-semibold bg-slate-50' colSpan={2}>
            Petter
          </td>
          <td className='border border-slate-300 px-2 py-1' rowSpan={3}>
            <div className='font-semibold text-xs mb-1'>Drying Room Tank</div>
            <div className='flex items-center gap-1 text-xs'>
              Litres: {numField(`${prefix}PetterFuel`, `gen-${prefix}PetterFuel`)}
            </div>
          </td>
        </tr>
        <tr>
          <td className='border border-slate-300 px-2 py-1'>
            <label htmlFor={`gen-${prefix}PetterResettable`} className='block cursor-pointer'>
              Resettable Hours
            </label>
          </td>
          <td className='border border-slate-300 px-2 py-1'>
            {numField(`${prefix}PetterResettable`, `gen-${prefix}PetterResettable`)}
          </td>
        </tr>
        <tr>
          <td className='border border-slate-300 px-2 py-1'>
            <label htmlFor={`gen-${prefix}PetterTotal`} className='block cursor-pointer'>
              Total Hours
            </label>
          </td>
          <td className='border border-slate-300 px-2 py-1'>
            {numField(`${prefix}PetterTotal`, `gen-${prefix}PetterTotal`)}
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default function NobsReportCE() {
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

  const handleShare = async () => {
    setSharing(true)
    try {
      const { pdf } = await import('@react-pdf/renderer')
      const { CEDocument } = await import('./NobsReportCEPDF')
      const logoUrl = `${window.location.origin}/bcmg-logo.png`
      const blob = await pdf(<CEDocument week={selectedWeek} year={YEAR} fields={fields} logoUrl={logoUrl} />).toBlob()
      const filename = `CE-Report-${selectedWeek.replace(/\W+/g, '-')}.pdf`
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
            Chief Engineer report
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
              Chief Engineer
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
          <label htmlFor='ce-name' className='font-bold whitespace-nowrap'>
            Name of Chief Engineer:
          </label>
          <input
            id='ce-name'
            type='text'
            className='no-print flex-1 bg-transparent outline-none min-w-0'
            value={fields.name ?? ''}
            onChange={(e) => updateField('name', e.target.value)}
            placeholder='Enter name…'
          />
          <span className='print-only flex-1'>{fields.name}</span>
        </div>

        {/* Generators / Electrical System */}
        <div className='mb-6'>
          <h2 className='text-xl font-bold mb-1'>Generators / Electrical System</h2>
          <p className='text-sm italic mb-3'>
            – Issues/maintenance done – Fill in hours run per generator – Fuel levels.
          </p>

          <h3 className='font-semibold mb-2'>Start of week</h3>
          <GeneratorTable prefix='start' fields={fields} updateField={updateField} />

          <h3 className='font-semibold mb-2'>End of week</h3>
          <GeneratorTable prefix='end' fields={fields} updateField={updateField} />

          <div className='text-sm mb-4 mt-2'>
            <p className='font-semibold underline mb-1'>At end of week, if there is:</p>
            <ul className='list-disc ml-4 space-y-1'>
              <li>
                <span className='font-semibold underline'>No incoming week</span>
                <ul className='list-[circle] ml-4 mt-0.5'>
                  <li>
                    <span className='font-semibold underline'>"TURN OFF" Diesel Taps</span>
                  </li>
                  <li>
                    <span className='underline'>Follow shutdown instruction in operation manual</span>
                  </li>
                </ul>
              </li>
              <li>
                <span className='font-semibold underline'>There is an incoming week</span>
                <ul className='list-[circle] ml-4 mt-0.5'>
                  <li>
                    <span className='underline'>Leave "Diesel Tap 4 On"</span>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <label className='flex items-center gap-2 text-sm font-semibold cursor-pointer'>
            <input
              type='checkbox'
              className='no-print w-4 h-4'
              checked={fields.logbookCompleted ?? false}
              onChange={(e) => updateField('logbookCompleted', e.target.checked)}
            />
            <span className='print-only'>{fields.logbookCompleted ? '☑' : '☐'}</span>
            Generator Logbook Completed
          </label>
        </div>

        {/* Breakages & Fixes */}
        <div className='mb-6'>
          <h2 className='text-xl font-bold mb-1'>Breakages & Fixes</h2>
          <p className='text-sm italic mb-2'>Did you fix anything? Did anything break that you didn't fix?</p>
          <textarea
            className='no-print w-full border border-slate-300 rounded p-2 min-h-[150px] resize-y text-base'
            value={fields.breakagesFixes ?? ''}
            onChange={(e) => updateField('breakagesFixes', e.target.value)}
            placeholder='Enter report…'
          />
          <div className='print-only min-h-[150px] whitespace-pre-wrap text-sm'>{fields.breakagesFixes}</div>
        </div>

        {/* Theodore */}
        <div className='mb-6'>
          <h2 className='text-xl font-bold mb-1'>Theodore</h2>
          <p className='text-sm italic mb-2'>– Issues.</p>
          <textarea
            className='no-print w-full border border-slate-300 rounded p-2 min-h-[120px] resize-y text-base'
            value={fields.theodore ?? ''}
            onChange={(e) => updateField('theodore', e.target.value)}
            placeholder='Enter report…'
          />
          <div className='print-only min-h-[120px] whitespace-pre-wrap text-sm'>{fields.theodore}</div>
        </div>

        {/* Water Supply */}
        <div className='mb-6'>
          <h2 className='text-xl font-bold mb-1'>Water Supply</h2>
          <p className='text-sm italic mb-2'>– Issues/maintenance done – Clarity.</p>
          <textarea
            className='no-print w-full border border-slate-300 rounded p-2 min-h-[120px] resize-y text-base'
            value={fields.waterSupply ?? ''}
            onChange={(e) => updateField('waterSupply', e.target.value)}
            placeholder='Enter report…'
          />
          <div className='print-only min-h-[120px] whitespace-pre-wrap text-sm'>{fields.waterSupply}</div>
        </div>

        {/* Gas Supply */}
        <div className='mb-6'>
          <h2 className='text-xl font-bold mb-1'>Gas Supply</h2>
          <p className='text-sm italic mb-2'>
            – Issues – Which bottle/s did you use / did you swap bottles e.g. 1-2, 4-5 etc.
          </p>
          <textarea
            className='no-print w-full border border-slate-300 rounded p-2 min-h-[120px] resize-y text-base'
            value={fields.gasSupply ?? ''}
            onChange={(e) => updateField('gasSupply', e.target.value)}
            placeholder='Enter report…'
          />
          <div className='print-only min-h-[120px] whitespace-pre-wrap text-sm'>{fields.gasSupply}</div>
        </div>

        {/* Sewerage */}
        <div className='mb-6'>
          <h2 className='text-xl font-bold mb-1'>Sewerage</h2>
          <p className='text-sm italic mb-2'>– Issues – Any issues or blockages.</p>
          <textarea
            className='no-print w-full border border-slate-300 rounded p-2 min-h-[120px] resize-y text-base'
            value={fields.sewerage ?? ''}
            onChange={(e) => updateField('sewerage', e.target.value)}
            placeholder='Enter report…'
          />
          <div className='print-only min-h-[120px] whitespace-pre-wrap text-sm'>{fields.sewerage}</div>
        </div>

        {/* Tow */}
        <div className='mb-6'>
          <h2 className='text-xl font-bold mb-1'>Tow</h2>
          <p className='text-sm'>Make sure the Tow Leader has completed their report.</p>
        </div>

        {/* Food Scrap Bins */}
        <div className='mb-6'>
          <h2 className='text-xl font-bold mb-1'>Food Scrap Bins</h2>
          <p className='text-sm italic mb-1'>
            – How many bins are in use – Food scrap levels %. (Beginning AND end of the week).
          </p>
          <p className='text-sm italic mb-1'>
            – Odd number week, use odd number bin; Even number week, use even number bin (e.g. Week 6 = use even number
            bin).
          </p>
          <p className='text-sm italic mb-3 font-semibold underline'>
            – Make sure you monitor the food scrap bin levels and drain them on Mondays & Thursdays.
          </p>
          <div className='overflow-x-auto'>
            <table className='text-sm border-collapse'>
              <thead>
                <tr>
                  <th className='border border-slate-300 px-3 py-1 text-left w-16'></th>
                  <th className='border border-slate-300 px-3 py-1 text-left'>Beginning of week</th>
                  <th className='border border-slate-300 px-3 py-1 text-left'>End of week</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3].map((bin) => (
                  <tr key={bin}>
                    <td className='border border-slate-300 px-3 py-1 font-semibold'>Bin {bin}</td>
                    <td className='border border-slate-300 px-2 py-1'>
                      <input
                        type='text'
                        aria-label={`Bin ${bin} – beginning of week`}
                        className='no-print w-full bg-transparent outline-none'
                        value={fields[`bin${bin}Start`] ?? ''}
                        onChange={(e) => updateField(`bin${bin}Start`, e.target.value)}
                        placeholder='e.g. 25%'
                      />
                      <span className='print-only'>{fields[`bin${bin}Start`]}</span>
                    </td>
                    <td className='border border-slate-300 px-2 py-1'>
                      <input
                        type='text'
                        aria-label={`Bin ${bin} – end of week`}
                        className='no-print w-full bg-transparent outline-none'
                        value={fields[`bin${bin}End`] ?? ''}
                        onChange={(e) => updateField(`bin${bin}End`, e.target.value)}
                        placeholder='e.g. 75%'
                      />
                      <span className='print-only'>{fields[`bin${bin}End`]}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Chalet Equipment */}
        <div className='mb-6'>
          <h2 className='text-xl font-bold mb-1'>Chalet Equipment</h2>
          <p className='text-sm italic mb-2'>
            How many axe handles have been broken this week? Any broken Radios? Any antennas missing? Any other damaged
            equipment?
          </p>
          <textarea
            className='no-print w-full border border-slate-300 rounded p-2 min-h-[120px] resize-y text-base'
            value={fields.chaletEquipment ?? ''}
            onChange={(e) => updateField('chaletEquipment', e.target.value)}
            placeholder='Enter report…'
          />
          <div className='print-only min-h-[120px] whitespace-pre-wrap text-sm'>{fields.chaletEquipment}</div>
          <p className='text-sm mt-4 mb-2'>Any other structures / items requiring repair or replacement next summer?</p>
          <textarea
            className='no-print w-full border border-slate-300 rounded p-2 min-h-[120px] resize-y text-base'
            value={fields.otherStructures ?? ''}
            onChange={(e) => updateField('otherStructures', e.target.value)}
            placeholder='Enter report…'
          />
          <div className='print-only min-h-[120px] whitespace-pre-wrap text-sm'>{fields.otherStructures}</div>
        </div>

        <p className='text-sm font-bold italic mb-4'>
          IMPORTANT – You are responsible for the information contained in this report. You may be required to elaborate
          upon it at length at a later date.
        </p>

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
