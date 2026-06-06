import React from 'react'
import { Link } from 'react-router-dom'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'

export default function SafetyHearing() {
  return (
    <div className='p-4 max-w-2xl mx-auto pb-16'>
      <h1 className='text-3xl my-4 -indent-12 max-sm:pl-10'>
        <Link to='..' relative='path'>
          <ChevronLeftIcon sx={{ fontSize: 40, position: 'relative', top: -3 }} />
          Hearing safety guidelines
        </Link>
      </h1>

      <p className='mb-3'>
        Due to the loud noise associated with the machinery and power tools at the Bogong Rover Chalet, ear muffs are
        provided for wearing when using power tools or in the generator shed or tow hut. They may also be worn in other
        areas and activities, subject to personal preference.
      </p>

      <p className='mb-3'>The BCMG inspect the ear muffs annually.</p>
    </div>
  )
}
