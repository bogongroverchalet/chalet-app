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

const MEAT_ITEMS = [
  { key: 'chicken', butcherLabel: 'Breast Fillet', label: 'Chicken', unit: 'kg' },
  { key: 'roastBeef', butcherLabel: 'Topside', label: 'Roast Beef', unit: 'kg' },
  { key: 'roastLamb', butcherLabel: 'Boneless lamb leg', label: 'Roast Lamb', unit: 'kg' },
  { key: 'bacon', butcherLabel: 'Bertocchi Long Rindless Bacon', label: 'Bacon', unit: 'kg' },
  { key: 'stewingSteak', butcherLabel: 'Braising Steak / Chuck', label: 'Stewing Steak', unit: 'kg' },
  { key: 'sausages', butcherLabel: 'Traditional Thin Beef Sausages', label: 'Sausages', unit: 'kg' },
  { key: 'salami', butcherLabel: 'Mild Sopressa', label: 'Salami', unit: 'kg' },
  { key: 'ham', butcherLabel: 'House Smoked Ham', label: 'Ham', unit: 'kg' },
  { key: 'steak', butcherLabel: 'Rump Steak', label: 'Steak', unit: 'kg' },
  { key: 'tofu', butcherLabel: 'Tofu', label: 'Tofu', unit: 'pkts' },
]

const MENU_DAYS = [
  { key: 'saturday', day: 'Saturday', suggested: 'Green Curry with chicken / tofu' },
  { key: 'sunday', day: 'Sunday', suggested: 'Roast Beef & Roast Veg / Ratatouille' },
  { key: 'monday', day: 'Monday', suggested: 'Pasta Bake' },
  { key: 'tuesday', day: 'Tuesday', suggested: 'Beef casserole / Bean stew' },
  { key: 'wednesday', day: 'Wednesday', suggested: 'Stir fry w/ rice & steak / TVP Burgers' },
  { key: 'thursday', day: 'Thursday', suggested: 'Roast lamb w/ veg / Falafels' },
  { key: 'friday', day: 'Friday', suggested: 'Pasta' },
]

const STOCK_ITEMS = [
  { key: 'crushedTomatoes', label: 'Crushed tomatoes / Diced tomatoes', unit: 'Cans' },
  { key: 'tomatoPaste', label: 'Tomato paste', unit: 'Packets/Cartons' },
  { key: 'coconutMilk', label: 'Coconut milk powder', unit: 'Packets (1kg)' },
  { key: 'brownSugar', label: 'Brown sugar', unit: 'KGs' },
  { key: 'cannedLentils', label: 'Canned lentils', unit: 'Cans' },
  { key: 'cheese', label: 'Devondale Cheese', unit: 'Blocks' },
  { key: 'pastaSpirals', label: 'Pasta Spirals', unit: 'Packets' },
  { key: 'margarine', label: 'Margarine', unit: '1kg buckets' },
  { key: 'plainFlour', label: 'Plain flour', unit: 'KGs' },
  { key: 'toiletPaper', label: 'Toilet Paper', unit: 'Packets' },
  { key: 'paperTowel', label: 'Paper towel', unit: 'Full rolls' },
  { key: 'sanitiser', label: 'Sanitiser (RF-12)', unit: '5L drums/jerry' },
  { key: 'handWash', label: 'Hand wash (pink)', unit: '5L drums/jerry' },
  { key: 'dishSoap', label: 'Dish soap', unit: 'Bottles' },
  { key: 'lemonDisinfectant', label: 'Lemon disinfectant', unit: '20L drums' },
]

const HERBS = [
  { key: 'basilLeaves', label: 'Basil Leaves' },
  { key: 'bayLeaves', label: 'Bay Leaves' },
  { key: 'cajunSeasoning', label: 'Cajun Seasoning' },
  { key: 'cayanne', label: 'Cayanne' },
  { key: 'chilliPowder', label: 'Chilli powder/flakes' },
  { key: 'chives', label: 'Chives' },
  { key: 'cinnamonSugar', label: 'Cinnamon sugar' },
  { key: 'cinnamon', label: 'Cinnamon' },
  { key: 'cloves', label: 'Cloves' },
  { key: 'corianderLeaves', label: 'Coriander Leaves' },
  { key: 'corianderPowder', label: 'Coriander Powder/Ground' },
  { key: 'corianderSeeds', label: 'Coriander Seeds' },
  { key: 'crushedChilli', label: 'Crushed Chilli' },
  { key: 'cummin', label: 'Cummin' },
  { key: 'fiveSpice', label: 'Five Spice Powder (Chinese)' },
  { key: 'garlicGranulates', label: 'Garlic Granulates' },
  { key: 'garumMarsala', label: 'Garum Marsala' },
  { key: 'groundNutmeg', label: 'Ground Nutmeg' },
  { key: 'gingerPowder', label: 'Ginger Powder' },
  { key: 'italianHerbs', label: 'Italian Herbs / Mixed Herbs' },
  { key: 'lemonPepper', label: 'Lemon pepper' },
  { key: 'mixedSpice', label: 'Mixed Spice / All Spice' },
  { key: 'oregano', label: 'Oregano Leaves' },
  { key: 'paprika', label: 'Paprika / sweet' },
  { key: 'parsley', label: 'Parsley' },
  { key: 'poppySeeds', label: 'Poppy Seeds' },
  { key: 'rosemary', label: 'Rosemary Leaves' },
  { key: 'sage', label: 'Sage' },
  { key: 'sesameSeeds', label: 'Sesame Seeds' },
  { key: 'thyme', label: 'Thyme Leaves' },
  { key: 'turmeric', label: 'Turmeric' },
]

const defaultWeek = getDefaultWeek()

function storageKey(weekName) {
  return `nobs-qm-${YEAR}-${weekName}`
}

function loadSaved(weekName) {
  try {
    return JSON.parse(localStorage.getItem(storageKey(weekName))) ?? {}
  } catch {
    return {}
  }
}

function emptyFields() {
  const meat = Object.fromEntries(MEAT_ITEMS.map(({ key }) => [key, '']))
  const stock = Object.fromEntries(STOCK_ITEMS.map(({ key }) => [`stock_${key}`, '']))
  const herbs = Object.fromEntries(HERBS.map(({ key }) => [`herb_${key}`, false]))
  const menuAlts = Object.fromEntries(MENU_DAYS.map(({ key }) => [`alt_${key}`, '']))
  return {
    name: '',
    participantCount: '',
    totalMeatTofu: '',
    ...meat,
    meatComments: '',
    foodSafety: '',
    bulkPantry: '',
    dehumidifierDays: '',
    suggestions: '',
    menuChanges: '',
    ...menuAlts,
    excessMeat: '',
    foodShortages: '',
    kitchenEquipment: '',
    ...stock,
    ...herbs,
    dietaryProducts: '',
    otherNotes: '',
    fridgeTempCompleted: false,
  }
}

export default function NobsReportQM() {
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
      const { QMDocument } = await import('./NobsReportQMPDF')
      const logoUrl = `${window.location.origin}/bcmg-logo.png`
      const blob = await pdf(<QMDocument week={selectedWeek} year={YEAR} fields={fields} logoUrl={logoUrl} />).toBlob()
      const filename = `QM-Report-${selectedWeek.replace(/\W+/g, '-')}.pdf`
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

  const outOfStockHerbs = HERBS.filter(({ key }) => fields[`herb_${key}`]).map(({ label }) => label)

  return (
    <>
      <div className='no-print p-3 max-w-2xl mx-auto'>
        <h1 className='text-3xl my-4 -indent-12 max-sm:pl-10'>
          <Link to='..' relative='path'>
            <ChevronLeftIcon sx={{ fontSize: 40, position: 'relative', top: -3 }} />
            Quartermaster report
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
              Quartermaster
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
          <span className='font-bold whitespace-nowrap'>Name of Quartermaster:</span>
          <input
            type='text'
            className='no-print flex-1 bg-transparent outline-none min-w-0'
            value={fields.name ?? ''}
            onChange={(e) => updateField('name', e.target.value)}
            placeholder='Enter name…'
          />
          <span className='print-only flex-1'>{fields.name}</span>
        </div>

        {/* Start of week meat */}
        <div className='mb-6'>
          <p className='font-bold mb-3'>
            Please fill in <span className='underline'>AT THE START OF THE WEEK</span> when sorting the meat at the
            chalet:
          </p>

          <div className='flex gap-6 mb-4 flex-wrap text-sm'>
            <div className='flex items-baseline gap-2'>
              <span className='font-semibold'>Number of participants in party:</span>
              <input
                type='text'
                inputMode='numeric'
                className='no-print border-b border-slate-500 bg-transparent outline-none w-24'
                value={fields.participantCount ?? ''}
                onChange={(e) => updateField('participantCount', e.target.value)}
                placeholder='e.g. 30'
              />
              <span className='print-only min-w-[6rem] border-b border-black'>{fields.participantCount}</span>
            </div>
            <div className='flex items-baseline gap-2'>
              <span className='font-semibold'>Total weight of meat & tofu received:</span>
              <input
                type='text'
                inputMode='decimal'
                className='no-print border-b border-slate-500 bg-transparent outline-none w-24'
                value={fields.totalMeatTofu ?? ''}
                onChange={(e) => updateField('totalMeatTofu', e.target.value)}
                placeholder='e.g. 42 kg'
              />
              <span className='print-only min-w-[6rem] border-b border-black'>{fields.totalMeatTofu}</span>
            </div>
          </div>

          <div className='overflow-x-auto'>
            <table className='text-sm border-collapse w-full'>
              <thead>
                <tr>
                  <th className='border border-slate-300 px-2 py-1 text-left'>Butcher slip label</th>
                  <th className='border border-slate-300 px-2 py-1 text-left'>Label</th>
                  <th className='border border-slate-300 px-2 py-1 text-left'>Received</th>
                  <th className='border border-slate-300 px-2 py-1 text-left w-16'>Unit</th>
                </tr>
              </thead>
              <tbody>
                {MEAT_ITEMS.map(({ key, butcherLabel, label, unit }) => (
                  <tr key={key}>
                    <td className='border border-slate-300 px-2 py-1'>
                      <label htmlFor={`meat-input-${key}`} className='block cursor-pointer'>
                        {butcherLabel}
                      </label>
                    </td>
                    <td className='border border-slate-300 px-2 py-1'>
                      <label htmlFor={`meat-input-${key}`} className='block cursor-pointer'>
                        {label}
                      </label>
                    </td>
                    <td className='border border-slate-300 px-2 py-1'>
                      <input
                        id={`meat-input-${key}`}
                        type='text'
                        inputMode='decimal'
                        className='no-print w-full bg-transparent outline-none border-b border-slate-400'
                        value={fields[key] ?? ''}
                        onChange={(e) => updateField(key, e.target.value)}
                      />
                      <span className='print-only'>{fields[key]}</span>
                    </td>
                    <td className='border border-slate-300 px-2 py-1 text-slate-500'>
                      <label htmlFor={`meat-input-${key}`} className='block cursor-pointer'>
                        {unit}
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className='text-sm italic mt-2'>
            Please comment if the amount per person per meal is too much, not enough or just right.
          </p>
          <textarea
            className='no-print w-full border border-slate-300 rounded p-2 min-h-[80px] resize-y text-base mt-1'
            value={fields.meatComments ?? ''}
            onChange={(e) => updateField('meatComments', e.target.value)}
            placeholder='Comments on portions…'
          />
          <div className='print-only min-h-[80px] whitespace-pre-wrap text-sm'>{fields.meatComments}</div>
        </div>

        {/* Food Safety Issues */}
        <div className='mb-6'>
          <h2 className='text-xl font-bold mb-1'>Food Safety Issues</h2>
          <p className='text-sm italic mb-2'>
            Food items destroyed, spoiled food, and food recalls. Allergy/dietary near misses.
          </p>
          <textarea
            className='no-print w-full border border-slate-300 rounded p-2 min-h-[120px] resize-y text-base'
            value={fields.foodSafety ?? ''}
            onChange={(e) => updateField('foodSafety', e.target.value)}
            placeholder='Enter report…'
          />
          <div className='print-only min-h-[120px] whitespace-pre-wrap text-sm'>{fields.foodSafety}</div>
        </div>

        {/* Bulk Food Pantry */}
        <div className='mb-6'>
          <h2 className='text-xl font-bold mb-1'>Bulk Food Pantry</h2>
          <p className='text-sm italic mb-2'>Broken packaging, spills, rust, evidence of vermin, etc.</p>
          <textarea
            className='no-print w-full border border-slate-300 rounded p-2 min-h-[120px] resize-y text-base'
            value={fields.bulkPantry ?? ''}
            onChange={(e) => updateField('bulkPantry', e.target.value)}
            placeholder='Enter report…'
          />
          <div className='print-only min-h-[120px] whitespace-pre-wrap text-sm'>{fields.bulkPantry}</div>
          <p className='text-sm mt-3 mb-1'>Please list the day/s that the dehumidifier penguins were reset:</p>
          <textarea
            className='no-print w-full border border-slate-300 rounded p-2 min-h-[60px] resize-y text-base'
            value={fields.dehumidifierDays ?? ''}
            onChange={(e) => updateField('dehumidifierDays', e.target.value)}
            placeholder='e.g. Monday, Thursday'
          />
          <div className='print-only min-h-[60px] whitespace-pre-wrap text-sm'>{fields.dehumidifierDays}</div>
        </div>

        {/* Suggestions */}
        <div className='mb-6'>
          <h2 className='text-xl font-bold mb-1'>Suggestions</h2>
          <p className='text-sm italic mb-2'>New ingredients, menu variations, etc.</p>
          <textarea
            className='no-print w-full border border-slate-300 rounded p-2 min-h-[120px] resize-y text-base'
            value={fields.suggestions ?? ''}
            onChange={(e) => updateField('suggestions', e.target.value)}
            placeholder='Enter suggestions…'
          />
          <div className='print-only min-h-[120px] whitespace-pre-wrap text-sm'>{fields.suggestions}</div>
        </div>

        {/* Menu Changes */}
        <div className='mb-6'>
          <h2 className='text-xl font-bold mb-1'>Menu Changes</h2>
          <p className='text-sm italic mb-2'>Any particularly good or bad menu items?</p>
          <textarea
            className='no-print w-full border border-slate-300 rounded p-2 min-h-[100px] resize-y text-base'
            value={fields.menuChanges ?? ''}
            onChange={(e) => updateField('menuChanges', e.target.value)}
            placeholder='Enter notes…'
          />
          <div className='print-only min-h-[100px] whitespace-pre-wrap text-sm'>{fields.menuChanges}</div>

          <p className='text-sm mt-3 mb-2'>
            Please note any menu changes. If there was a reason other than preference, please detail (e.g. Out of X; Too
            hard to manage dietaries, etc.)
          </p>
          <div className='overflow-x-auto'>
            <table className='text-sm border-collapse w-full'>
              <thead>
                <tr>
                  <th className='border border-slate-300 px-2 py-1 text-left w-24'></th>
                  <th className='border border-slate-300 px-2 py-1 text-left'>Suggested</th>
                  <th className='border border-slate-300 px-2 py-1 text-left'>
                    Alternative (i.e. what you made instead)
                  </th>
                </tr>
              </thead>
              <tbody>
                {MENU_DAYS.map(({ key, day, suggested }) => (
                  <tr key={key}>
                    <td className='border border-slate-300 px-2 py-1 font-semibold'>
                      <label htmlFor={`menu-input-${key}`} className='block cursor-pointer'>
                        {day}
                      </label>
                    </td>
                    <td className='border border-slate-300 px-2 py-1 text-slate-600'>
                      <label htmlFor={`menu-input-${key}`} className='block cursor-pointer'>
                        {suggested}
                      </label>
                    </td>
                    <td className='border border-slate-300 px-2 py-1'>
                      <input
                        id={`menu-input-${key}`}
                        type='text'
                        className='no-print w-full bg-transparent outline-none border-b border-slate-400'
                        value={fields[`alt_${key}`] ?? ''}
                        onChange={(e) => updateField(`alt_${key}`, e.target.value)}
                        placeholder='If changed…'
                      />
                      <span className='print-only'>{fields[`alt_${key}`]}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className='text-xs text-slate-500 mt-1'>
            (We're asking this to gauge what is being cooked every week and whether changes are needed long-term)
          </p>
        </div>

        {/* Excess Meat & Vegies */}
        <div className='mb-6'>
          <h2 className='text-xl font-bold mb-1'>Excess Meat & Vegies</h2>
          <p className='text-sm italic mb-2'>
            Please list the amount of lunch meats and veggies you have left over at the end of the week, chop them up
            into smaller sizes and put them in the food scraps bin. Ensure any raw meat/fat is cooked before going in
            the food scraps bin.
          </p>
          <textarea
            className='no-print w-full border border-slate-300 rounded p-2 min-h-[100px] resize-y text-base'
            value={fields.excessMeat ?? ''}
            onChange={(e) => updateField('excessMeat', e.target.value)}
            placeholder='Enter report…'
          />
          <div className='print-only min-h-[100px] whitespace-pre-wrap text-sm'>{fields.excessMeat}</div>
        </div>

        {/* Food Shortages */}
        <div className='mb-6'>
          <h2 className='text-xl font-bold mb-1'>Food Shortages</h2>
          <p className='text-sm italic mb-2'>
            Please ensure that any shortages of ESSENTIAL food items that will be required to be brought in by the
            following week are brought to the attention of the Booking Officer by Wednesday night at the latest. Please
            conduct a thorough search of the Bulk Food Pantry prior to reporting any shortage.
          </p>
          <textarea
            className='no-print w-full border border-slate-300 rounded p-2 min-h-[100px] resize-y text-base'
            value={fields.foodShortages ?? ''}
            onChange={(e) => updateField('foodShortages', e.target.value)}
            placeholder='Enter report…'
          />
          <div className='print-only min-h-[100px] whitespace-pre-wrap text-sm'>{fields.foodShortages}</div>
        </div>

        {/* Kitchen equipment */}
        <div className='mb-6'>
          <h2 className='text-xl font-bold mb-1'>Kitchen equipment breakages or shortages</h2>
          <p className='text-sm italic mb-2'>
            Check the Wardens flat and Nobs Cupboard first, before reporting. Please list below:
          </p>
          <textarea
            className='no-print w-full border border-slate-300 rounded p-2 min-h-[100px] resize-y text-base'
            value={fields.kitchenEquipment ?? ''}
            onChange={(e) => updateField('kitchenEquipment', e.target.value)}
            placeholder='Enter report…'
          />
          <div className='print-only min-h-[100px] whitespace-pre-wrap text-sm'>{fields.kitchenEquipment}</div>
        </div>

        {/* Stock */}
        <div className='mb-6'>
          <h2 className='text-xl font-bold mb-1'>Stock</h2>
          <p className='text-sm mb-3'>
            Please stocktake the following ingredients & cleaning stock on{' '}
            <span className='font-bold'>Friday night, either before or after dinner.</span>
          </p>
          <div className='overflow-x-auto'>
            <table className='text-sm border-collapse w-full'>
              <tbody>
                {STOCK_ITEMS.map(({ key, label, unit }) => (
                  <tr key={key}>
                    <td className='border border-slate-300 px-2 py-1 w-56'>
                      <label htmlFor={`stock-input-${key}`} className='block cursor-pointer'>
                        {label}
                      </label>
                    </td>
                    <td className='border border-slate-300 px-2 py-1 min-w-[6rem]'>
                      <input
                        id={`stock-input-${key}`}
                        type='text'
                        inputMode='decimal'
                        className='no-print w-full bg-transparent outline-none border-b border-slate-400'
                        value={fields[`stock_${key}`] ?? ''}
                        onChange={(e) => updateField(`stock_${key}`, e.target.value)}
                      />
                      <span className='print-only'>{fields[`stock_${key}`]}</span>
                    </td>
                    <td className='border border-slate-300 px-2 py-1 text-slate-500 w-36'>
                      <label htmlFor={`stock-input-${key}`} className='block cursor-pointer'>
                        {unit}
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Herbs / spices */}
        <div className='mb-6'>
          <h2 className='text-xl font-bold mb-1'>Herbs & Spices out of stock</h2>
          <p className='text-sm italic mb-3'>
            Tick any that are out of stock (in alphabetical order in the big pantry):
          </p>
          <div className='no-print flex flex-wrap gap-x-5 gap-y-2'>
            {HERBS.map(({ key, label }) => (
              <label key={key} className='flex items-center gap-1.5 text-sm cursor-pointer'>
                <input
                  type='checkbox'
                  className='w-4 h-4'
                  checked={fields[`herb_${key}`] ?? false}
                  onChange={(e) => updateField(`herb_${key}`, e.target.checked)}
                />
                {label}
              </label>
            ))}
          </div>
          <div className='print-only text-sm'>{outOfStockHerbs.length > 0 ? outOfStockHerbs.join(', ') : 'None'}</div>
        </div>

        {/* Dietary products */}
        <div className='mb-6'>
          <h2 className='text-xl font-bold mb-1'>Dietary products used & finished</h2>
          <p className='text-sm italic mb-2'>
            If you've used & finished any dietary products, please stocktake these (e.g. we've used 10kg of Gluten free
            flour; Used all vegan whipping cream).
          </p>
          <textarea
            className='no-print w-full border border-slate-300 rounded p-2 min-h-[80px] resize-y text-base'
            value={fields.dietaryProducts ?? ''}
            onChange={(e) => updateField('dietaryProducts', e.target.value)}
            placeholder='Enter report…'
          />
          <div className='print-only min-h-[80px] whitespace-pre-wrap text-sm'>{fields.dietaryProducts}</div>
        </div>

        {/* Other Notes */}
        <div className='mb-6'>
          <h2 className='text-xl font-bold mb-1'>Other Notes</h2>
          <textarea
            className='no-print w-full border border-slate-300 rounded p-2 min-h-[150px] resize-y text-base'
            value={fields.otherNotes ?? ''}
            onChange={(e) => updateField('otherNotes', e.target.value)}
            placeholder='Enter notes…'
          />
          <div className='print-only min-h-[150px] whitespace-pre-wrap text-sm'>{fields.otherNotes}</div>
        </div>

        {/* Checklist */}
        <div className='mb-6'>
          <h2 className='text-xl font-bold mb-2'>Checklist</h2>
          <label className='flex items-center gap-2 text-sm cursor-pointer'>
            <input
              type='checkbox'
              className='no-print w-4 h-4'
              checked={fields.fridgeTempCompleted ?? false}
              onChange={(e) => updateField('fridgeTempCompleted', e.target.checked)}
            />
            <span className='print-only'>{fields.fridgeTempCompleted ? '☑' : '☐'}</span>
            The fridge temperature spreadsheet is filled out (Leave at the Chalet above the fridge).
          </label>
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
