import React from 'react'
import { Link } from 'react-router-dom'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import PrintIcon from '@mui/icons-material/Print'
import ShareIcon from '@mui/icons-material/Share'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import ClearFormDialog from './ClearFormDialog'
import winterWeeks from './winter-weeks.yaml'

const YEAR = String(winterWeeks.year)

export const MERCH_ITEMS = [
  { key: 'fleece-jackets', label: 'Polar Fleece Jackets', price: 55, hasSizes: true },
  { key: 'fleece-vests', label: 'Polar Fleece Vests', price: 40, hasSizes: true },
  { key: 'ls-sub-polos', label: 'Long Sleeve Sub-Polos', price: 45, hasSizes: true },
  { key: 'nalgene-red', label: 'Nalgene Bottle – Red', price: 25 },
  { key: 'nalgene-blue', label: 'Nalgene Bottle – Blue', price: 25 },
  { key: 'nalgene-glow', label: 'Nalgene Bottle – Glow', price: 25 },
  { key: 'nalgene-easy-sippers', label: 'Nalgene Easy Sippers', price: 5 },
  { key: 'bucket-hats', label: 'Bucket Hats', price: 15, hasSizes: true },
  { key: 'beanies', label: 'Beanies', price: 15, hasSizes: true },
  { key: 'buff-rover-skiing', label: 'Buffs – Rover Skiing', price: 15 },
  { key: 'buff-milky-way', label: 'Buffs – Chalet Milky Way', price: 15 },
  { key: 'buff-bogong-map', label: 'Buffs – Bogong Map', price: 15 },
  { key: 'stubby-holders', label: 'Stubby Holders', price: 10 },
  { key: 'bills-book', label: "Bill's Book", price: 10 },
  { key: 'ski-leashes', label: 'Ski Leashes (inc. Mt Beauty Scout Hall)', price: 5 },
  { key: 'badge-logo', label: 'Badges – Logo', price: 2 },
  { key: 'badge-vintage-logo', label: 'Badges – Vintage Logo', price: 2 },
  { key: 'badge-snow-venture', label: 'Badges – Snow Venture', price: 2 },
  { key: 'badge-75-years', label: 'Badges – 75 Years', price: 2 },
  { key: 'badge-80-years', label: 'Badges – 80 Years', price: 2 },
  { key: 'woggles', label: 'Woggles', price: 2 },
  { key: 'rs-magnets', label: 'Rover Skiing – Magnets', price: 2 },
  { key: 'rs-pins', label: 'Rover Skiing – Pins', price: 2 },
  { key: 'rs-coasters', label: 'Rover Skiing – Coasters', price: 2 },
  { key: 'sticker-logo', label: 'Stickers – Logo', price: 1 },
  { key: 'sticker-vintage-logo', label: 'Stickers – Vintage Logo', price: 1 },
  { key: 'sticker-rover-skiing', label: 'Stickers – Rover Skiing', price: 1 },
]

export const SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL']

export function formatSizes(sizes) {
  if (!sizes || typeof sizes !== 'object') return sizes || ''
  const parts = SIZES.filter((s) => parseInt(sizes[s]) > 0).map((s) => `${sizes[s]}×${s}`)
  if (sizes.other) parts.push(sizes.other)
  return parts.join(', ')
}

export const INVESTITURE_ITEMS = [
  { key: 'inv-scarves', label: 'Scarves*' },
  { key: 'inv-scarf-badges', label: 'Scarf Badges' },
  { key: 'inv-tapes', label: 'Tapes' },
  { key: 'inv-repl-scarves', label: 'Replacement – Scarves*', price: 12 },
  { key: 'inv-repl-scarf-badges', label: 'Replacement – Scarf Badges', price: 2 },
  { key: 'inv-repl-tapes', label: 'Replacement – Tapes' },
]

function InfoTooltip({ title, children }) {
  return (
    <Tooltip title={title} arrow enterTouchDelay={0} leaveTouchDelay={3000}>
      {children}
    </Tooltip>
  )
}

function detectCurrentWeek() {
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Australia/Melbourne' }).format(new Date())
  return winterWeeks.weeks.find(({ start, end }) => today >= start && today <= end)?.name
}

const defaultWeek = detectCurrentWeek() ?? winterWeeks.weeks[0].name

function storageKey(weekName) {
  return `nobs-merch-${YEAR}-${weekName}`
}

function emptySizes() {
  return Object.fromEntries([...SIZES, 'other'].map((s) => [s, '']))
}

function emptyItemRow() {
  return { count: '', sizes: emptySizes(), cash: '', eft: '' }
}

function emptyInvRow() {
  return { avu: '', arc: '', brc: '' }
}

function emptyFields() {
  return {
    name: '',
    items: Object.fromEntries(MERCH_ITEMS.map(({ key }) => [key, emptyItemRow()])),
    investiture: Object.fromEntries(INVESTITURE_ITEMS.map(({ key }) => [key, emptyInvRow()])),
    donations: '',
  }
}

function loadSaved(weekName) {
  try {
    return JSON.parse(localStorage.getItem(storageKey(weekName))) ?? {}
  } catch {
    return {}
  }
}

function mergeSizes(saved) {
  const empty = emptySizes()
  if (!saved || typeof saved !== 'object') return empty
  return { ...empty, ...saved }
}

function mergeWithEmpty(saved) {
  const base = emptyFields()
  return {
    ...base,
    ...saved,
    items: Object.fromEntries(
      MERCH_ITEMS.map(({ key }) => {
        const savedItem = saved.items?.[key] || {}
        return [key, { ...emptyItemRow(), ...savedItem, sizes: mergeSizes(savedItem.sizes) }]
      })
    ),
    investiture: { ...base.investiture, ...saved.investiture },
  }
}

export function rowTotal(row) {
  return (parseFloat(row?.cash) || 0) + (parseFloat(row?.eft) || 0)
}

export function invRowTotal(row, price) {
  if (!price) return 0
  return ((parseInt(row?.avu) || 0) + (parseInt(row?.arc) || 0) + (parseInt(row?.brc) || 0)) * price
}

export function grandTotal(fields) {
  return (
    MERCH_ITEMS.reduce((sum, { key }) => sum + rowTotal(fields.items?.[key]), 0) +
    INVESTITURE_ITEMS.reduce((sum, { key, price }) => sum + invRowTotal(fields.investiture?.[key], price), 0) +
    (parseFloat(fields.donations) || 0)
  )
}

export default function NobsReportMerch() {
  const [selectedWeek, setSelectedWeek] = React.useState(defaultWeek)
  const [fields, setFields] = React.useState(() => mergeWithEmpty(loadSaved(defaultWeek)))
  const [sharing, setSharing] = React.useState(false)
  const [clearing, setClearing] = React.useState(false)

  React.useEffect(() => {
    setFields(mergeWithEmpty(loadSaved(selectedWeek)))
  }, [selectedWeek])

  const save = (updated) => {
    localStorage.setItem(storageKey(selectedWeek), JSON.stringify(updated))
    setFields(updated)
  }

  const updateField = (key, value) => save({ ...fields, [key]: value })

  const updateItemField = (itemKey, field, value) =>
    save({ ...fields, items: { ...fields.items, [itemKey]: { ...fields.items[itemKey], [field]: value } } })

  const updateItemSizeField = (itemKey, size, value) =>
    save({
      ...fields,
      items: {
        ...fields.items,
        [itemKey]: { ...fields.items[itemKey], sizes: { ...fields.items[itemKey].sizes, [size]: value } },
      },
    })

  const updateInvField = (itemKey, field, value) =>
    save({
      ...fields,
      investiture: { ...fields.investiture, [itemKey]: { ...fields.investiture[itemKey], [field]: value } },
    })

  const handleClear = () => {
    localStorage.removeItem(storageKey(selectedWeek))
    setFields(emptyFields())
    setClearing(false)
  }

  const handleShare = async () => {
    setSharing(true)
    try {
      const { pdf } = await import('@react-pdf/renderer')
      const { MerchDocument } = await import('./NobsReportMerchPDF')
      const logoUrl = `${window.location.origin}/bcmg-logo.png`
      const blob = await pdf(
        <MerchDocument week={selectedWeek} year={YEAR} fields={fields} logoUrl={logoUrl} />
      ).toBlob()
      const filename = `Merch-Sales-${selectedWeek.replace(/\W+/g, '-')}.pdf`
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

  const total = grandTotal(fields)

  const th = 'border border-slate-300 px-2 py-1 text-left font-semibold bg-slate-100 text-xs whitespace-nowrap'
  const td = 'border border-slate-300 px-1 py-0.5'
  const inp = 'no-print w-full bg-transparent outline-none'
  const numInp = `${inp} text-right`

  return (
    <>
      <div className='no-print p-3 max-w-3xl mx-auto'>
        <h1 className='text-3xl my-4 -indent-12 max-sm:pl-10'>
          <Link to='..' relative='path'>
            <ChevronLeftIcon sx={{ fontSize: 40, position: 'relative', top: -3 }} />
            Merchandise sales record
          </Link>
        </h1>
      </div>

      <div className='nobs-report-print-area max-w-3xl mx-auto px-4 pb-4'>
        {/* Header */}
        <div className='flex items-start gap-4 mb-5'>
          <img src='/bcmg-logo.png' alt='Bogong Rover Chalet' className='w-14 h-14 flex-shrink-0' />
          <div>
            <div className='text-xs mb-1 text-slate-500'>Last Updated March 2026</div>
            <div className='text-3xl font-bold'>Merchandise Sales Record</div>
          </div>
        </div>

        {/* Week / Year / Name */}
        <div className='flex gap-6 mb-5 flex-wrap items-baseline'>
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
            <span className='print-only border-b border-black pb-0.5 min-w-[10em]'>{selectedWeek}</span>
          </div>
          <div className='flex items-baseline gap-2'>
            <span className='font-bold'>Year:</span>
            <span>{YEAR}</span>
          </div>
          <div className='flex items-baseline gap-2'>
            <span className='font-bold whitespace-nowrap'>PA Name:</span>
            <input
              type='text'
              className='no-print border-b border-slate-500 bg-transparent outline-none min-w-[12em]'
              value={fields.name}
              onChange={(e) => updateField('name', e.target.value)}
              placeholder='Enter name…'
            />
            <span className='print-only border-b border-black pb-0.5 min-w-[12em]'>{fields.name}</span>
          </div>
        </div>

        {/* Merch items table */}
        <div className='overflow-x-auto mb-8'>
          <table className='text-sm border-collapse w-full min-w-[36rem]'>
            <thead>
              <tr>
                <th className={th}>Item</th>
                <th className={`${th} text-right`}>Price</th>
                <th className={`${th} text-right`}># Sold</th>
                <th className={`${th} min-w-[13rem]`}>Sizes sold</th>
                <th className={`${th} text-right`}>Cash $</th>
                <th className={`${th} text-right`}>EFT $</th>
                <th className={`${th} text-right`}>Total</th>
              </tr>
            </thead>
            <tbody>
              {MERCH_ITEMS.map(({ key, label, price, hasSizes }) => {
                const row = fields.items[key] || emptyItemRow()
                const total = rowTotal(row)
                const count = parseInt(row.count) || 0
                const expectedTotal = price * count
                const isInvalid = (count > 0 || total > 0) && total !== expectedTotal
                const sizeSum = hasSizes ? SIZES.reduce((s, sz) => s + (parseInt(row.sizes[sz]) || 0), 0) : 0
                const sizesInvalid = hasSizes && count > 0 && sizeSum > 0 && sizeSum !== count
                return (
                  <tr key={key}>
                    <td className={td}>{label}</td>
                    <td className={`${td} text-right text-slate-400 text-xs`}>${price}</td>
                    <td className={td}>
                      <input
                        type='number'
                        min='0'
                        className={numInp}
                        value={row.count}
                        onChange={(e) => updateItemField(key, 'count', e.target.value)}
                      />
                      <span className='print-only block text-right'>{row.count}</span>
                    </td>
                    <td className={`${td} min-w-[13rem]`}>
                      {hasSizes ? (
                        <>
                          <div className='no-print grid grid-cols-3 gap-x-3 gap-y-0.5 text-xs mb-1'>
                            {SIZES.map((size) => (
                              <div key={size} className='flex items-center gap-1'>
                                <label htmlFor={`${key}-${size}`} className='text-slate-400 w-6 shrink-0'>
                                  {size}
                                </label>
                                <input
                                  type='number'
                                  min='0'
                                  id={`${key}-${size}`}
                                  className='w-8 bg-transparent outline-none text-right'
                                  value={row.sizes[size]}
                                  onChange={(e) => updateItemSizeField(key, size, e.target.value)}
                                />
                              </div>
                            ))}
                          </div>
                          <div className='no-print flex items-center gap-1 text-xs'>
                            {sizesInvalid ? (
                              <InfoTooltip
                                title={`Sizes total ${sizeSum}${
                                  row.sizes.other ? ` + 'Other'` : ''
                                }, but # sold is ${count}`}
                              >
                                <label htmlFor={`${key}-other`} className='text-red-500 font-semibold shrink-0'>
                                  ⚠ Other
                                </label>
                              </InfoTooltip>
                            ) : (
                              <label htmlFor={`${key}-other`} className='text-slate-400 shrink-0'>
                                Other
                              </label>
                            )}
                            <input
                              type='text'
                              id={`${key}-other`}
                              className='bg-transparent outline-none min-w-0 w-full'
                              value={row.sizes.other}
                              onChange={(e) => updateItemSizeField(key, 'other', e.target.value)}
                              placeholder='e.g. 1×3XL'
                            />
                          </div>
                          <span className='print-only text-xs'>{formatSizes(row.sizes)}</span>
                        </>
                      ) : (
                        <span className='text-slate-400 text-xs'>N/A</span>
                      )}
                    </td>
                    <td className={td}>
                      <input
                        type='number'
                        min='0'
                        className={numInp}
                        value={row.cash}
                        onChange={(e) => updateItemField(key, 'cash', e.target.value)}
                      />
                      <span className='print-only block text-right'>{row.cash}</span>
                    </td>
                    <td className={td}>
                      <input
                        type='number'
                        min='0'
                        className={numInp}
                        value={row.eft}
                        onChange={(e) => updateItemField(key, 'eft', e.target.value)}
                      />
                      <span className='print-only block text-right'>{row.eft}</span>
                    </td>
                    <td className={`${td} text-right font-semibold ${isInvalid ? 'text-red-600' : 'text-slate-600'}`}>
                      {isInvalid ? (
                        <InfoTooltip title={`Expected $${expectedTotal} (${count} × $${price})`}>
                          <span>{total > 0 ? `$${total}` : '$0'}</span>
                        </InfoTooltip>
                      ) : total > 0 ? (
                        `$${total}`
                      ) : (
                        ''
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Investiture table */}
        <div className='mb-8'>
          <h2 className='text-xl font-bold mb-1'>Investitures</h2>
          <p className='text-xs text-slate-500 mb-3'>
            Record all scarves and badges used for investitures. Replacement items must be paid for and recorded. *Scarf
            badges are sold separately from scarves.
          </p>
          <div className='overflow-x-auto'>
            <table className='text-sm border-collapse'>
              <thead>
                <tr>
                  <th className={`${th} min-w-[14rem]`}>Item</th>
                  <th className={`${th} text-right`}>Price</th>
                  <th className={`${th} w-14 text-center`}>AVU</th>
                  <th className={`${th} w-14 text-center`}>ARC</th>
                  <th className={`${th} w-14 text-center`}>BRC</th>
                  <th className={`${th} w-16 text-right`}>Total</th>
                </tr>
              </thead>
              <tbody>
                {INVESTITURE_ITEMS.map(({ key, label, price }) => {
                  const row = fields.investiture[key] || emptyInvRow()
                  const t = invRowTotal(row, price)
                  return (
                    <tr key={key}>
                      <td className={td}>{label}</td>
                      <td className={`${td} text-right text-slate-400 text-xs`}>
                        {price != null ? `$${price}` : 'N/A'}
                      </td>
                      {['avu', 'arc', 'brc'].map((col) => (
                        <td key={col} className={`${td} text-center`}>
                          <input
                            type='number'
                            min='0'
                            className='no-print w-full bg-transparent outline-none text-center'
                            value={row[col]}
                            onChange={(e) => updateInvField(key, col, e.target.value)}
                          />
                          <span className='print-only block text-center'>{row[col]}</span>
                        </td>
                      ))}
                      <td className={`${td} text-right text-slate-600`}>
                        {price == null ? 'N/A' : t > 0 ? `$${t}` : ''}
                      </td>
                    </tr>
                  )
                })}
                <tr>
                  <td className={td} colSpan={2}>
                    Donations (write amount)
                  </td>
                  <td className={`${td}`} colSpan={3}>
                    <input
                      type='number'
                      min='0'
                      className='no-print w-full bg-transparent outline-none'
                      value={fields.donations}
                      onChange={(e) => updateField('donations', e.target.value)}
                      placeholder='$'
                    />
                    <span className='print-only'>{fields.donations ? `$${fields.donations}` : ''}</span>
                  </td>
                  <td className={`${td} text-right text-slate-600`}>
                    {fields.donations ? `$${parseFloat(fields.donations).toFixed(0)}` : ''}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Grand total */}
        <div className='flex items-baseline gap-3 mb-6 text-xl font-bold'>
          <span>Total Sales:</span>
          <span>{total > 0 ? `$${total.toFixed(0)}` : '$—'}</span>
        </div>

        {/* Rules */}
        <p className='text-sm font-bold mb-1'>DO NOT CHANGE MERCH PRICES</p>
        <p className='text-sm font-bold mb-4'>DO NOT SELL MERCH THAT IS NOT IN STOCK</p>
        <p className='text-xs text-slate-500 mb-6'>
          A preorder form will be emailed to all participants following the week.
        </p>

        {/* Payment details */}
        <div className='mb-6 text-sm border border-slate-200 rounded p-3 bg-slate-50'>
          <p className='mb-2 text-slate-600'>
            If the PA wishes to accept EFT, arrange for payment to be sent to the PA's own account. All sales (cash
            and/or EFT) are to be sent to the below account in 1 transaction within <strong>30 days</strong> of the
            event's conclusion.
          </p>
          <p>
            <strong>Account Name:</strong> Bogong Operating Account
          </p>
          <p>
            <strong>BSB:</strong> 633 000
          </p>
          <p>
            <strong>Account Number:</strong> 133 498 345
          </p>
          <p>
            <strong>Reference:</strong> Merch {selectedWeek}{' '}
            <span className='text-slate-500'>(e.g. "Merch Week 1")</span>
          </p>
        </div>

        <p className='no-print text-sm text-slate-500 mb-3'>
          Use the <strong>Share / Download</strong> (or <strong>Print</strong>) button below to save this report to your
          phone, then share it with your Party Leader.
        </p>

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
