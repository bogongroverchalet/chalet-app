import React from 'react'
import { Link } from 'react-router-dom'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'

export default function SafetyFirstAiders() {
  return (
    <div className='p-4 max-w-2xl mx-auto pb-16'>
      <h1 className='text-3xl my-4 -indent-12 max-sm:pl-10'>
        <Link to='..' relative='path'>
          <ChevronLeftIcon sx={{ fontSize: 40, position: 'relative', top: -3 }} />
          First aiders guidelines
        </Link>
      </h1>

      <p className='mb-3'>
        It is a recommendation that on all tours or chalet events at least 1 participant holds current first aid
        qualifications. These people are to be identified in the activity plan/briefing (this can include the trip
        intention form) and identified to all participants.
      </p>

      <p className='mb-3'>
        There is no verification process to confirm the status of a participant's first aid qualifications.
      </p>

      <p className='mb-3'>
        The first aiders are not replacing the requirement for all participants to carry a personal first aid kit.
        Please refer to the packing list for the minimum first aid kit requirements.
      </p>

      <h2 className='text-xl font-bold mt-6 mb-2'>Suggested minimum qualification</h2>
      <p className='mb-3'>HLTAID003 Provide first aid (Level 2)</p>
    </div>
  )
}
