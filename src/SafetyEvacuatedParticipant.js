import React from 'react'
import { Link } from 'react-router-dom'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'

export default function SafetyEvacuatedParticipant() {
  return (
    <div className='p-4 max-w-2xl mx-auto pb-16'>
      <h1 className='text-3xl my-4 -indent-12 max-sm:pl-10'>
        <Link to='..' relative='path'>
          <ChevronLeftIcon sx={{ fontSize: 40, position: 'relative', top: -3 }} />
          Evacuated participant guidelines
        </Link>
      </h1>

      <p className='mb-3'>If a participant is evacuated from the Chalet for any reason, they are:</p>
      <ol className='list-decimal ml-6 mb-3 space-y-1'>
        <li>Not allowed to return back to the Chalet for that same week.</li>
        <li>Not entitled to a refund or partial refund.</li>
      </ol>

      <p className='mb-3'>Should a participant be evacuated from the Chalet for any reason, BCMG is not:</p>
      <ol className='list-decimal ml-6 mb-3 space-y-1'>
        <li>Responsible for any costs incurred or associated due to the evacuation.</li>
        <li>Responsible for any costs subsequent to the evacuation.</li>
        <li>Responsible for any accommodation costs at Falls Creek, Mt Beauty or anywhere else.</li>
        <li>Responsible for any accommodation logistics at Falls Creek, Mt Beauty or anywhere else.</li>
        <li>Responsible for any subsequent transport logistics.</li>
      </ol>

      <p className='mb-3'>Travel insurance can provide coverage for some of these expenses.</p>
    </div>
  )
}
