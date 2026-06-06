import React from 'react'
import { Link } from 'react-router-dom'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'

export default function SafetyRopeTowNotice() {
  return (
    <div className='p-4 max-w-2xl mx-auto pb-16'>
      <h1 className='text-3xl my-4 -indent-12 max-sm:pl-10'>
        <Link to='..' relative='path'>
          <ChevronLeftIcon sx={{ fontSize: 40, position: 'relative', top: -3 }} />
          Rope tow notice to users
        </Link>
      </h1>

      <p className='mb-3'>When operating the BRC Rope Tow, the following must be complied with:</p>

      <ol className='list-decimal ml-6 mb-3 space-y-1'>
        <li>
          A Tow Supervisor must be designated, in place and monitoring the tow &amp; users at all times. Tow Supervisors
          must be in place at each loading and unloading zone during all operations.
        </li>
        <li>
          The Tow Operator must report the tow slope conditions upon startup by radio (icy, soft, hard, hazards) prior
          to the tow being used by others.
          <ul className='list-[circle] ml-6 mt-1 space-y-1'>
            <li>Snow report is to be placed on the whiteboard.</li>
            <li>All hazards must be marked on the slope with orange conduit.</li>
          </ul>
        </li>
        <li>All tow users are to have received the Tow Brief prior to using the tow.</li>
        <li>All tow users must check out of the chalet using the standard whiteboard procedures.</li>
        <li>All tow users must carry a whistle at all times.</li>
        <li>A minimum of 4 skiers and buddy system required when skiing the red/clear areas.</li>
        <li>A maximum of 6 tow riders must be enforced at all times.</li>
        <li>
          All tow users are responsible for reporting hazards encountered on the slope to the Tow Supervisor as soon as
          possible/practical.
        </li>
        <li>
          All skiing must be within the zones marked on the map. Outside of these zones requires a Trip Intention Form.
        </li>
      </ol>

      <h2 className='text-xl font-bold mt-6 mb-2'>Skiing zones</h2>
      <p className='mb-3'>
        Green areas are beginner friendly. Blue areas are considered "challenging". Outside of marked zones requires a
        Trip Intention Form.
      </p>

      <p className='mb-3'>Ensure all supplied signage is set out prior to operation.</p>
    </div>
  )
}
