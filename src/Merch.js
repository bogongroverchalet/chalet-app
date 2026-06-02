import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'

const CLOTHING = [
  { label: 'Polar Fleece Jacket', price: 55, photo: '/merch/fleece-jacket.jpg', sizes: true },
  { label: 'Polar Fleece Vest', price: 40, photo: '/merch/fleece-vest.jpg', sizes: true },
  { label: 'Long Sleeve Sub-Polo', price: 45, photo: '/merch/sublimated-polo.jpg', sizes: true },
]

const ACCESSORIES = [
  { label: 'Bucket Hat', price: 15, photo: '/merch/bucket-hat.jpg' },
  { label: 'Beanie', price: 15, photo: null },
  { label: 'Buff – Rover Skiing', price: 15, photo: '/merch/rover-skiing-buff.jpg' },
  { label: 'Buff – Chalet Milky Way', price: 15, photo: '/merch/chalet-buff.jpg' },
  { label: 'Buff – Bogong Map', price: 15, photo: '/merch/map-buff.jpg' },
  { label: 'Nalgene Bottle', price: 25, photo: '/merch/nalgene.jpg', note: 'Red, Blue, or Glow' },
  { label: 'Nalgene Easy Sipper lid', price: 5, photo: null },
  { label: 'Stubby Holder', price: 10, photo: '/merch/stubby-holder.jpg' },
  { label: "Bill's Book", price: 10, photo: '/merch/bills-book.jpg' },
  { label: 'Ski Leash', price: 5, photo: null, note: 'available at Mt Beauty Scout Hall' },
]

const SMALL_ITEMS = [
  { label: 'Badge – Logo', price: 2, photo: '/merch/triangle-badge.jpg' },
  { label: 'Badge – 80 Years', price: 2, photo: '/merch/80Years-Sample.jpg' },
  { label: 'Badge – Vintage Logo', price: 2, photo: null },
  { label: 'Badge – Snow Venture', price: 2, photo: null },
  { label: 'Badge – 75 Years', price: 2, photo: null },
  { label: 'Woggle', price: 2, photo: '/merch/woggle.jpg' },
  { label: 'Rover Skiing – Magnet', price: 2, photo: null },
  { label: 'Rover Skiing – Pin', price: 2, photo: null },
  { label: 'Rover Skiing – Coaster', price: 2, photo: null },
  { label: 'Sticker – Logo', price: 1, photo: '/merch/triangle-sticker.jpg' },
  { label: 'Sticker – Vintage Logo', price: 1, photo: null },
  { label: 'Sticker – Rover Skiing', price: 1, photo: null },
]

function MerchCard({ label, price, photo, note, sizes, large, onPhotoClick }) {
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
        {sizes && <div className='text-xs text-slate-400 mt-1'>XS – 2XL</div>}
        {note && <div className='text-xs text-slate-400 mt-1'>{note}</div>}
      </div>
    </div>
  )
}

function SmallItem({ label, price, photo, onPhotoClick }) {
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
    </div>
  )
}

export default function Merch() {
  const [lightbox, setLightbox] = useState(null)

  const openPhoto = (src, alt) => setLightbox({ src, alt })
  const closePhoto = () => setLightbox(null)

  return (
    <div className='max-w-3xl mx-auto p-4 pb-12'>
      <h1 className='text-3xl my-4 -indent-12 max-sm:pl-10'>
        <Link to='..' relative='path'>
          <ChevronLeftIcon sx={{ fontSize: 40, position: 'relative', top: -3 }} />
          Merchandise
        </Link>
      </h1>

      <h2 className='text-xl font-bold mt-6 mb-3'>Clothing</h2>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
        {CLOTHING.map((item) => (
          <MerchCard key={item.label} large {...item} onPhotoClick={openPhoto} />
        ))}
      </div>

      <h2 className='text-xl font-bold mt-8 mb-3'>Accessories</h2>
      <div className='grid grid-cols-2 sm:grid-cols-3 gap-3'>
        {ACCESSORIES.map((item) => (
          <MerchCard key={item.label} {...item} onPhotoClick={openPhoto} />
        ))}
      </div>

      <h2 className='text-xl font-bold mt-8 mb-3'>Badges, Stickers & Collectibles</h2>
      <div className='border border-slate-200 rounded-lg overflow-hidden bg-white'>
        {SMALL_ITEMS.map((item) => (
          <SmallItem key={item.label} {...item} onPhotoClick={openPhoto} />
        ))}
      </div>

      {lightbox && (
        <div className='fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4' onClick={closePhoto}>
          <img src={lightbox.src} alt={lightbox.alt} className='max-w-full max-h-full object-contain rounded' />
        </div>
      )}
    </div>
  )
}
