import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import { addCartToForm, SIZES } from './NobsReportMerch'
import { getDefaultWeek } from './nobs-week'

// Cart ids like 'fleece-jackets:M' carry the size through to the sales record form.
const sized = (id) => SIZES.map((size) => ({ id: `${id}:${size}`, label: size }))

const CLOTHING = [
  {
    id: 'fleece-jackets',
    label: 'Polar Fleece Jacket',
    price: 55,
    photo: '/merch/fleece-jacket.jpg',
    note: 'XS – 2XL',
    variants: sized('fleece-jackets'),
  },
  {
    id: 'fleece-vests',
    label: 'Polar Fleece Vest',
    price: 40,
    photo: '/merch/fleece-vest.jpg',
    note: 'XS – 2XL',
    variants: sized('fleece-vests'),
  },
  {
    id: 'ls-sub-polos',
    label: 'Long Sleeve Sub-Polo',
    price: 45,
    photo: '/merch/sublimated-polo.jpg',
    note: 'XS – 2XL',
    variants: sized('ls-sub-polos'),
  },
]

const ACCESSORIES = [
  { id: 'bucket-hats', label: 'Bucket Hat', price: 15, photo: '/merch/bucket-hat.jpg' },
  { id: 'beanies', label: 'Beanie', price: 15, photo: null },
  { id: 'buff-rover-skiing', label: 'Buff – Rover Skiing', price: 15, photo: '/merch/rover-skiing-buff.jpg' },
  { id: 'buff-milky-way', label: 'Buff – Chalet Milky Way', price: 15, photo: '/merch/chalet-buff.jpg' },
  { id: 'buff-bogong-map', label: 'Buff – Bogong Map', price: 15, photo: '/merch/map-buff.jpg' },
  {
    id: 'nalgene',
    label: 'Nalgene Bottle',
    price: 25,
    photo: '/merch/nalgene.jpg',
    note: 'Red, Blue, or Glow',
    variants: [
      { id: 'nalgene-red', label: 'Red' },
      { id: 'nalgene-blue', label: 'Blue' },
      { id: 'nalgene-glow', label: 'Glow' },
    ],
  },
  { id: 'nalgene-easy-sippers', label: 'Nalgene Easy Sipper lid', price: 5, photo: null },
  { id: 'stubby-holders', label: 'Stubby Holder', price: 10, photo: '/merch/stubby-holder.jpg' },
  { id: 'bills-book', label: "Bill's Book", price: 10, photo: '/merch/bills-book.jpg' },
  { id: 'ski-leashes', label: 'Ski Leash', price: 5, photo: null, note: 'available at Mt Beauty Scout Hall' },
]

const SMALL_ITEMS = [
  { id: 'badge-logo', label: 'Badge – Logo', price: 2, photo: '/merch/triangle-badge.jpg' },
  { id: 'badge-80-years', label: 'Badge – 80 Years', price: 2, photo: '/merch/80Years-Sample.jpg' },
  { id: 'badge-vintage-logo', label: 'Badge – Vintage Logo', price: 2, photo: null },
  { id: 'badge-snow-venture', label: 'Badge – Snow Venture', price: 2, photo: null },
  { id: 'badge-75-years', label: 'Badge – 75 Years', price: 2, photo: null },
  { id: 'woggles', label: 'Woggle', price: 2, photo: '/merch/woggle.jpg' },
  { id: 'rs-magnets', label: 'Rover Skiing – Magnet', price: 2, photo: null },
  { id: 'rs-pins', label: 'Rover Skiing – Pin', price: 2, photo: null },
  { id: 'rs-coasters', label: 'Rover Skiing – Coaster', price: 2, photo: null },
  { id: 'sticker-logo', label: 'Sticker – Logo', price: 1, photo: '/merch/triangle-sticker.jpg' },
  { id: 'sticker-vintage-logo', label: 'Sticker – Vintage Logo', price: 1, photo: null },
  { id: 'sticker-rover-skiing', label: 'Sticker – Rover Skiing', price: 1, photo: null },
]

function Qty({ label, qty = 0, onChange }) {
  return (
    <div className='flex items-center gap-1 shrink-0'>
      <button
        type='button'
        aria-label={`Remove one ${label}`}
        disabled={!qty}
        onClick={() => onChange(qty - 1)}
        className='w-8 h-8 rounded border border-slate-300 font-bold disabled:opacity-30'
      >
        −
      </button>
      <span className='w-6 text-center text-sm tabular-nums' aria-live='polite'>
        {qty}
      </span>
      <button
        type='button'
        aria-label={`Add one ${label}`}
        onClick={() => onChange(qty + 1)}
        className='w-8 h-8 rounded border border-slate-300 font-bold'
      >
        +
      </button>
    </div>
  )
}

function MerchCard({ id, label, price, photo, note, large, onPhotoClick, variants, cartProps }) {
  return (
    <div className='rounded-lg overflow-hidden border border-slate-200 bg-white shadow-sm'>
      {photo ? (
        <img
          src={photo}
          alt={label}
          className={`w-full object-cover cursor-zoom-in ${large ? 'h-56 sm:h-72' : 'h-40 sm:h-48'}`}
          onClick={() => onPhotoClick(photo, label)}
        />
      ) : (
        <div
          className={`w-full bg-slate-100 flex items-center justify-center ${large ? 'h-56 sm:h-72' : 'h-40 sm:h-48'}`}
        >
          <img src='/bcmg-logo.png' alt='' className='w-16 h-16 opacity-20' />
        </div>
      )}
      <div className='p-3'>
        <div className='flex items-start justify-between gap-2'>
          <span className='font-semibold text-sm leading-tight'>{label}</span>
          <span className='text-base font-bold text-slate-700 shrink-0'>${price}</span>
        </div>
        {note && <div className='text-xs text-slate-400 mt-1'>{note}</div>}
        {cartProps &&
          (variants || [{ id }]).map((v) => (
            <div key={v.id} className='mt-2 flex items-center justify-end gap-2'>
              {v.label && <span className='text-sm flex-1'>{v.label}</span>}
              <Qty label={v.label ? `${label} – ${v.label}` : label} {...cartProps(v.id)} />
            </div>
          ))}
      </div>
    </div>
  )
}

function SmallItem({ id, label, price, photo, onPhotoClick, cartProps }) {
  return (
    <div className='flex items-center gap-3 py-2 border-b border-slate-100 last:border-0 pr-4'>
      {photo ? (
        <img
          src={photo}
          alt={label}
          className='w-10 h-10 rounded object-cover shrink-0 cursor-zoom-in'
          onClick={() => onPhotoClick(photo, label)}
        />
      ) : (
        <div className='w-10 h-10 rounded bg-slate-100 shrink-0' />
      )}
      <span className='flex-1 text-sm'>{label}</span>
      <span className='font-semibold text-sm text-slate-700'>${price}</span>
      {cartProps && <Qty label={label} {...cartProps(id)} />}
    </div>
  )
}

// useState mirrored to localStorage as JSON; storage failures just mean it isn't remembered.
function useStored(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? initial
    } catch {
      return initial
    }
  })
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {}
  }, [key, value])
  return [value, setValue]
}

const formatTime = (iso) =>
  new Date(iso).toLocaleString('en-AU', { weekday: 'short', hour: 'numeric', minute: '2-digit' })

export default function Merch() {
  const [lightbox, setLightbox] = useState(null)

  const openPhoto = (src, alt) => setLightbox({ src, alt })
  const closePhoto = () => setLightbox(null)

  // Manual tally for the Party Advisor; keyed by NobsReportMerch MERCH_ITEMS key, kept in localStorage until cleared.
  // Opt-in so the page stays a plain catalogue for everyone else; remembered per browser.
  const [tally, setTally] = useStored('merchTallyEnabled', false)
  const [cart, setCart] = useStored('merchCart', {})
  const [buyer, setBuyer] = useStored('merchCartName', '')
  // Every sale added to the sales record, newest first.
  const [history, setHistory] = useStored('merchHistory', [])
  const [confirmClear, setConfirmClear] = useState(false)
  const [added, setAdded] = useState(null)
  const cartProps = (id) => ({
    qty: cart[id],
    onChange: (n) => {
      setAdded(null)
      setCart((c) => ({ ...c, [id]: n }))
    },
  })
  const cartItems = [...CLOTHING, ...ACCESSORIES, ...SMALL_ITEMS].flatMap(({ id, label, price, variants }) =>
    (variants || [{ id }]).map((v) => ({ id: v.id, label: v.label ? `${label} ${v.label}` : label, price }))
  )
  const prices = Object.fromEntries(cartItems.map(({ id, price }) => [id, price]))
  const labels = Object.fromEntries(cartItems.map(({ id, label }) => [id, label]))
  const count = Object.keys(prices).reduce((sum, id) => sum + (cart[id] || 0), 0)
  const total = Object.keys(prices).reduce((sum, id) => sum + (cart[id] || 0) * prices[id], 0)

  // Clearing the cart stops re-adding the same sale; the ref also covers two clicks landing before the re-render.
  const addedCart = useRef(null)
  const addToForm = (method) => {
    if (addedCart.current === cart) return
    addedCart.current = cart
    const week = getDefaultWeek()
    // Only ids shown on this page, so a stale saved cart can't add items nobody can see.
    const items = Object.fromEntries(Object.keys(prices).flatMap((id) => (cart[id] ? [[id, cart[id]]] : [])))
    addCartToForm(week, items, method)
    setHistory((h) => [{ at: new Date().toISOString(), week, method, name: buyer.trim(), items, total }, ...h])
    setCart({})
    setBuyer('')
    setAdded({ week, total, method })
  }

  // Undo subtracts the sale back off the form it went to; the entry stays in history, marked undone.
  const undoing = useRef(new Set())
  const undo = (entry) => {
    if (entry.undone || undoing.current.has(entry.at)) return
    undoing.current.add(entry.at)
    addCartToForm(entry.week, Object.fromEntries(Object.entries(entry.items).map(([id, n]) => [id, -n])), entry.method)
    setHistory((h) => h.map((e) => (e.at === entry.at ? { ...e, undone: true } : e)))
    setAdded(null)
  }

  return (
    <div className={`max-w-3xl mx-auto p-4 ${tally ? 'pb-40' : 'pb-12'}`}>
      <h1 className='text-3xl my-4 -indent-12 max-sm:pl-10'>
        <Link to='..' relative='path'>
          <ChevronLeftIcon sx={{ fontSize: 40, position: 'relative', top: -3 }} />
          Merchandise
        </Link>
      </h1>
      <FormControlLabel
        control={<Switch checked={tally} onChange={(e) => setTally(e.target.checked)} size='small' />}
        label='Sales tally (Party Advisor)'
      />

      <h2 className='text-xl font-bold mt-6 mb-3'>Clothing</h2>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
        {CLOTHING.map((item) => (
          <MerchCard key={item.label} large {...item} cartProps={tally ? cartProps : null} onPhotoClick={openPhoto} />
        ))}
      </div>

      <h2 className='text-xl font-bold mt-8 mb-3'>Accessories</h2>
      <div className='grid grid-cols-2 sm:grid-cols-3 gap-3'>
        {ACCESSORIES.map((item) => (
          <MerchCard key={item.label} {...item} cartProps={tally ? cartProps : null} onPhotoClick={openPhoto} />
        ))}
      </div>

      <h2 className='text-xl font-bold mt-8 mb-3'>Badges, Stickers & Collectibles</h2>
      <div className='border border-slate-200 rounded-lg overflow-hidden bg-white'>
        {SMALL_ITEMS.map((item) => (
          <SmallItem key={item.label} {...item} cartProps={tally ? cartProps : null} onPhotoClick={openPhoto} />
        ))}
      </div>

      {tally && count > 0 && (
        <div className='fixed bottom-0 inset-x-0 z-40 bg-white border-t border-slate-300 shadow-lg'>
          <div className='max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-4'>
            <span className='text-sm text-slate-600'>
              {count} item{count === 1 ? '' : 's'}
            </span>
            <span className='text-xl font-bold'>Total ${total}</span>
            <button
              type='button'
              onClick={() => setCart({})}
              className='px-3 py-1 rounded border border-slate-300 text-sm'
            >
              Clear
            </button>
          </div>
          <div className='max-w-3xl mx-auto px-4 pb-3 flex items-center justify-end gap-2 text-sm'>
            <label className='sr-only' htmlFor='merch-buyer'>
              Buyer name (optional)
            </label>
            <input
              id='merch-buyer'
              type='text'
              className='min-w-0 flex-1 border-b border-slate-400 bg-transparent outline-none text-base'
              placeholder='Name (optional)'
              value={buyer}
              onChange={(e) => setBuyer(e.target.value)}
            />
            <span className='text-slate-600 shrink-0'>Add:</span>
            <button
              type='button'
              onClick={() => addToForm('cash')}
              className='px-3 py-1 rounded bg-slate-700 text-white'
            >
              Cash
            </button>
            <button
              type='button'
              onClick={() => addToForm('eft')}
              className='px-3 py-1 rounded bg-slate-700 text-white'
            >
              EFT
            </button>
          </div>
        </div>
      )}
      {tally && !count && added && (
        <div role='status' className='fixed bottom-0 inset-x-0 z-40 bg-green-50 border-t border-green-300 shadow-lg'>
          <div className='max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-4 text-sm'>
            <span>
              Added ${added.total} {added.method === 'eft' ? 'EFT' : 'cash'} to the {added.week} sales record.
            </span>
            <Link to='/nobs/report/merch' className='underline shrink-0'>
              Open record
            </Link>
          </div>
        </div>
      )}

      {tally && history.length > 0 && (
        <details className='mt-8'>
          <summary className='text-xl font-bold cursor-pointer'>Sales history ({history.length})</summary>
          <ul className='mt-3 border border-slate-200 rounded-lg bg-white divide-y divide-slate-100'>
            {history.map((entry) => (
              <li key={entry.at} className={`p-3 text-sm flex gap-3 ${entry.undone ? 'text-slate-400' : ''}`}>
                <div className={`flex-1 ${entry.undone ? 'line-through' : ''}`}>
                  <div className='font-semibold'>
                    {formatTime(entry.at)}
                    {entry.name && ` · ${entry.name}`} · ${entry.total} {entry.method === 'eft' ? 'EFT' : 'cash'}
                  </div>
                  <div className='text-slate-500'>
                    {Object.entries(entry.items)
                      .map(([id, n]) => `${n}× ${labels[id] ?? id}`)
                      .join(', ')}
                  </div>
                  <div className='text-xs text-slate-400'>{entry.week}</div>
                </div>
                {entry.undone ? (
                  <span className='shrink-0 self-center'>Undone</span>
                ) : (
                  <button
                    type='button'
                    onClick={() => undo(entry)}
                    aria-label={`Undo ${formatTime(entry.at)} $${entry.total} ${
                      entry.method === 'eft' ? 'EFT' : 'cash'
                    } sale${entry.name ? ` to ${entry.name}` : ''}`}
                    className='shrink-0 self-center px-3 py-1 rounded border border-slate-300'
                  >
                    Undo
                  </button>
                )}
              </li>
            ))}
          </ul>
          <button
            type='button'
            onClick={() => setConfirmClear(true)}
            className='mt-3 px-3 py-1 rounded border border-slate-300 text-sm'
          >
            Clear history
          </button>
        </details>
      )}
      <Dialog open={confirmClear} onClose={() => setConfirmClear(false)}>
        <DialogTitle>Clear sales history?</DialogTitle>
        <DialogContent>
          This only removes the list on this phone. The sales record isn’t changed, and cleared sales can’t be undone
          from here any more.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmClear(false)}>Cancel</Button>
          <Button
            color='error'
            variant='contained'
            onClick={() => {
              setHistory([])
              setConfirmClear(false)
            }}
          >
            Clear history
          </Button>
        </DialogActions>
      </Dialog>

      {lightbox && (
        <div className='fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4' onClick={closePhoto}>
          <img src={lightbox.src} alt={lightbox.alt} className='max-w-full max-h-full object-contain rounded' />
        </div>
      )}
    </div>
  )
}
