import React from 'react'
import { Link } from 'react-router-dom'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'

export default function SafetyFootwear() {
  return (
    <div className='p-4 max-w-2xl mx-auto pb-16'>
      <h1 className='text-3xl my-4 -indent-12 max-sm:pl-10'>
        <Link to='..' relative='path'>
          <ChevronLeftIcon sx={{ fontSize: 40, position: 'relative', top: -3 }} />
          Footwear guidelines
        </Link>
      </h1>

      <p className='mb-3'>There are a number of natural safety hazards that occur in and around the Chalet.</p>

      <p className='mb-3'>
        Closed toe shoes (no thongs or sandals) must be worn in the kitchen, wood room, generator room and workshop at
        all times.
      </p>

      <p className='mb-3'>
        When chopping wood in the wood shed, it is compulsory to wear safety capped boots. Safety capped gumboots are
        supplied for this reason.
      </p>

      <p className='mb-3'>Safety capped boots are encouraged for all working bee participants.</p>
    </div>
  )
}
