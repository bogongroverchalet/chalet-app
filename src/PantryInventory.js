import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import Fuse from 'fuse.js'
import data from './pantry-inventory.json'
import { fuseSearch } from './pantrySearch'

const fuse = new Fuse(data, {
  keys: [
    { name: 'product', weight: 2 },
    { name: 'ingredients', weight: 1 },
    { name: 'category', weight: 0.5 },
    { name: 'brand', weight: 0.5 },
  ],
  threshold: 0.35,
  includeScore: true,
})

export default function PantryInventory() {
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    if (!query.trim()) return data
    return fuseSearch(fuse, query)
  }, [query])

  const grouped = useMemo(() => {
    const groups = {}
    for (const row of results) {
      const cat = row.category || 'Other'
      if (!groups[cat]) groups[cat] = []
      groups[cat].push(row)
    }
    return groups
  }, [results])

  return (
    <div className='p-4 max-w-3xl mx-auto pb-16'>
      <h1 className='text-3xl my-4 -indent-12 max-sm:pl-10'>
        <Link to='..' relative='path'>
          <ChevronLeftIcon sx={{ fontSize: 40, position: 'relative', top: -3 }} />
          Pantry ingredient list
        </Link>
      </h1>

      <p className='text-sm text-slate-500 mb-3'>Search by product name or ingredient to check allergens.</p>

      <input
        type='search'
        placeholder='e.g. gluten, nuts, soy…'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className='w-full border border-slate-300 rounded-lg px-4 py-2 text-base mb-4 outline-none focus:ring-2 focus:ring-blue-300'
        autoFocus
      />

      {results.length === 0 && <p className='text-slate-500 italic'>No products match &ldquo;{query}&rdquo;</p>}

      {Object.entries(grouped).map(([category, rows]) => (
        <div key={category} className='mb-6'>
          <h2 className='text-base font-bold text-slate-600 uppercase tracking-wide border-b border-slate-200 pb-1 mb-2'>
            {category}
          </h2>
          <div className='space-y-3'>
            {rows.map((row, i) => (
              <div key={i} className='border border-slate-200 rounded-lg p-3'>
                <div className='flex items-start justify-between gap-2'>
                  <span className='font-semibold text-base'>{row.product}</span>
                  {row.weight && <span className='text-xs text-slate-400 font-mono shrink-0 mt-1'>{row.weight}</span>}
                </div>
                {row.brand && <p className='text-sm text-slate-500 mt-0.5'>{row.brand}</p>}
                {row.ingredients && <p className='text-xs text-slate-600 mt-1 leading-relaxed'>{row.ingredients}</p>}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
