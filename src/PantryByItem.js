import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import Fuse from 'fuse.js'
import data from './pantry-by-item.json'
import { fuseSearch } from './pantrySearch'

const fuse = new Fuse(data, {
  keys: ['item', 'category', 'subcategory'],
  threshold: 0.35,
  includeScore: true,
})

function LocationBadge({ location }) {
  if (!location) return <span className='text-sm text-slate-400 ml-2'>small pantry</span>
  return (
    <span className='inline-block bg-blue-100 text-blue-800 text-sm font-mono px-2 py-0.5 rounded ml-2'>
      {location}
    </span>
  )
}

function groupByCategory(items) {
  const groups = {}
  for (const entry of items) {
    const cat = entry.category || 'Other'
    if (!groups[cat]) groups[cat] = []
    groups[cat].push(entry)
  }
  return groups
}

export default function PantryByItem() {
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    if (!query.trim()) return data
    return fuseSearch(fuse, query)
  }, [query])

  const groups = useMemo(() => groupByCategory(results), [results])

  return (
    <div className='p-4 max-w-2xl mx-auto pb-16'>
      <h1 className='text-3xl my-4 -indent-12 max-sm:pl-10'>
        <Link to='..' relative='path'>
          <ChevronLeftIcon sx={{ fontSize: 40, position: 'relative', top: -3 }} />
          Pantry finder (by item)
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

      {Object.keys(groups).length === 0 && (
        <p className='text-slate-500 italic'>No items match &ldquo;{query}&rdquo;</p>
      )}

      {Object.entries(groups).map(([category, items]) => (
        <div key={category} className='mb-5'>
          <h2 className='text-lg font-bold text-slate-700 border-b border-slate-200 pb-1 mb-2'>{category}</h2>
          <ul>
            {items.map((entry, i) => (
              <li key={i} className='flex items-baseline justify-between py-1 border-b border-slate-100 last:border-0'>
                <span className='text-base'>
                  {entry.subcategory && <span className='text-slate-400 text-sm mr-1'>{entry.subcategory} › </span>}
                  {entry.item}
                </span>
                <LocationBadge location={entry.location} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
