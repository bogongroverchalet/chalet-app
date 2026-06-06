import React from 'react'
import { Link } from 'react-router-dom'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'

export default function SafetyHelmet() {
  return (
    <div className='p-4 max-w-2xl mx-auto pb-16'>
      <h1 className='text-3xl my-4 -indent-12 max-sm:pl-10'>
        <Link to='..' relative='path'>
          <ChevronLeftIcon sx={{ fontSize: 40, position: 'relative', top: -3 }} />
          Helmet guidelines
        </Link>
      </h1>

      <h2 className='text-xl font-bold mt-6 mb-2'>Biking</h2>
      <p className='mb-3'>
        The Bogong Rover Chalet hosts a number of biking events over the green season. In accordance with Victorian law,
        bicycle helmets are required when using a bike at the Chalet.
      </p>

      <h2 className='text-xl font-bold mt-6 mb-2'>Skiing</h2>
      <p className='mb-3'>
        The Bogong Rover Chalet acknowledges that there are inherent risks associated with skiing. At an Alpine Resort
        such as Mt Buller, Falls Creek, Hotham or Mt Baw Baw, ski helmets are highly recommended for all and are
        required for lessons and the terrain park.
      </p>

      <p className='mb-3'>
        The BCMG does not supply helmets. If a participant wishes to use one at the Chalet, they need to bring their own
        (or hire one prior to skiing in).
      </p>

      <p className='mb-3'>
        The Bogong Chalet Management Group has determined that helmets will not be deemed compulsory at the Bogong Rover
        Chalet or in the surrounding areas (including the tow). However they are recommended. This is due to the Bogong
        Rover Chalet and surrounds:
      </p>
      <ul className='list-disc ml-6 mb-3 space-y-1'>
        <li>Having significantly fewer people skiing the runs</li>
        <li>Not skiing under a chair lift where loose articles could fall</li>
        <li>Most participants using pattern-based skis which reduce the speed achieved</li>
        <li>Less complex terrain</li>
      </ul>

      <p className='mb-3'>If a participant would like to wear a helmet they will be supported in doing so.</p>
    </div>
  )
}
