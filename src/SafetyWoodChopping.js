import React from 'react'
import { Link } from 'react-router-dom'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'

export default function SafetyWoodChopping() {
  return (
    <div className='p-4 max-w-2xl mx-auto pb-16'>
      <h1 className='text-3xl my-4 -indent-12 max-sm:pl-10'>
        <Link to='..' relative='path'>
          <ChevronLeftIcon sx={{ fontSize: 40, position: 'relative', top: -3 }} />
          Wood chopping guidelines
        </Link>
      </h1>

      <p className='mb-3'>
        The Bogong Rover Chalet uses wood to provide heating for a variety of purposes. Wood chopping is a regular chore
        that occurs to maintain the Chalet's requirements.
      </p>

      <h2 className='text-xl font-bold mt-6 mb-2'>Personal Protective Equipment (PPE)</h2>
      <p className='mb-3'>The Bogong Rover Chalet supplies the following PPE that is required when chopping wood:</p>
      <ul className='list-disc ml-6 mb-3 space-y-1'>
        <li>Steel capped gumboots</li>
        <li>Safety glasses</li>
        <li>Cut resistant gloves</li>
      </ul>
      <p className='mb-3'>
        Ear muffs provided as PPE for the generator may also be worn, subject to personal preference.
      </p>
      <p className='mb-3'>
        All PPE is inspected annually. Should damage or wear and tear be found, it will be replaced.
      </p>

      <h2 className='text-xl font-bold mt-6 mb-2'>Splitter hardware</h2>
      <p className='mb-3'>
        The only acceptable way to split wood at the Bogong Rover Chalet is using an axe and wood splitter. Hydraulic
        wood splitters are explicitly banned in accordance with Scouts Victoria's policies.
      </p>

      <h2 className='text-xl font-bold mt-6 mb-2'>Other rules</h2>
      <ul className='list-disc ml-6 mb-3 space-y-1'>
        <li>No more than two persons in the wood shed when chopping wood.</li>
        <li>Chop the wood then stop and load the trolley and remove.</li>
        <li>If wood chopper feels unskilled, do not make them chop wood.</li>
      </ul>
    </div>
  )
}
