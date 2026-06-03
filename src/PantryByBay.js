import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import Fuse from 'fuse.js'
import data from './pantry-by-bay.json'
import { fuseSearch } from './pantrySearch'

// Flatten all items for Fuse search, keeping bay/shelf references
const flatItems = data.flatMap((bay) =>
  bay.shelves.flatMap((shelf) =>
    shelf.items.map((item) => ({
      item,
      bay: bay.bay,
      bayLabel: bay.label,
      shelf: shelf.level,
      shelfNote: shelf.note,
    }))
  )
)

const fuse = new Fuse(flatItems, {
  keys: ['item', 'bay', 'bayLabel'],
  threshold: 0.35,
  includeScore: true,
})

export default function PantryByBay() {
  const [query, setQuery] = useState('')

  // When searching, get matching items keyed by bay+shelf for rendering
  const matchSet = useMemo(() => {
    if (!query.trim()) return null
    const items = fuseSearch(fuse, query)
    const set = new Set(items.map((m) => `${m.bay}-${m.shelf}`))
    return { set, items }
  }, [query])

  return (
    <div className='p-4 max-w-2xl mx-auto pb-16'>
      <h1 className='text-3xl my-4 -indent-12 max-sm:pl-10'>
        <Link to='..' relative='path'>
          <ChevronLeftIcon sx={{ fontSize: 40, position: 'relative', top: -3 }} />
          Pantry items by bay
        </Link>
      </h1>

      <input
        type='search'
        placeholder='Search items…'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className='w-full border border-slate-300 rounded-lg px-4 py-2 text-base mb-4 outline-none focus:ring-2 focus:ring-blue-300'
        autoFocus
      />

      {matchSet && matchSet.items.length === 0 && (
        <p className='text-slate-500 italic'>No items match &ldquo;{query}&rdquo;</p>
      )}

      {matchSet
        ? // Search mode: group matching items by bay
          Object.entries(
            matchSet.items.reduce((acc, m) => {
              const key = m.bayLabel
              if (!acc[key]) acc[key] = []
              acc[key].push(m)
              return acc
            }, {})
          ).map(([bayLabel, items]) => (
            <div key={bayLabel} className='mb-5'>
              <h2 className='text-lg font-bold text-slate-700 border-b border-slate-200 pb-1 mb-2'>{bayLabel}</h2>
              <ul>
                {items.map((m, i) => (
                  <li key={i} className='flex items-baseline gap-2 py-1 border-b border-slate-100 last:border-0'>
                    <span className='inline-block bg-blue-100 text-blue-800 text-sm font-mono px-2 py-0.5 rounded shrink-0'>
                      Shelf {m.shelf}
                      {m.shelfNote ? ` (${m.shelfNote})` : ''}
                    </span>
                    <span>{m.item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))
        : // Browse mode: show full bay/shelf structure
          data.map((bay) => (
            <div key={bay.bay} className='mb-6'>
              <h2 className='text-lg font-bold text-slate-700 border-b border-slate-200 pb-1 mb-2'>{bay.label}</h2>
              {bay.shelves.map((shelf) => (
                <div key={shelf.level} className='mb-3'>
                  <div className='flex items-baseline gap-2 mb-1'>
                    <span className='inline-block bg-slate-100 text-slate-700 text-sm font-mono px-2 py-0.5 rounded shrink-0'>
                      Shelf {shelf.level}
                      {shelf.note ? ` (${shelf.note})` : ''}
                    </span>
                  </div>
                  <p className='text-base text-slate-700 ml-2'>{shelf.items.join(' · ')}</p>
                </div>
              ))}
            </div>
          ))}
    </div>
  )
}
