import React from 'react'
import { Link } from 'react-router-dom'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'

export default function SafetyVentolinEpipen() {
  return (
    <div className='p-4 max-w-2xl mx-auto pb-16'>
      <h1 className='text-3xl my-4 -indent-12 max-sm:pl-10'>
        <Link to='..' relative='path'>
          <ChevronLeftIcon sx={{ fontSize: 40, position: 'relative', top: -3 }} />
          Ventolin &amp; EpiPen policy
        </Link>
      </h1>

      <p className='mb-3'>
        The BCMG does not supply Asthma Relievers (such as Ventolin) or Adrenaline Autoinjectors (such as EpiPens) for
        participants' usage.
      </p>

      <p className='mb-3'>
        Participants that have either a Ventolin or EpiPen prescribed to them are required to bring at least 2 in-date
        Ventolin/EpiPens (or as per the participant's management plan) with them to all Chalet events. Should
        insufficient medication be brought, the participant will not be allowed to attend.
      </p>

      <h2 className='text-xl font-bold mt-6 mb-2'>Winter Parties</h2>
      <ol className='list-decimal ml-6 mb-3 space-y-1'>
        <li>
          The medication must be kept in the top of the participant's pack at all times and must go with the participant
          on all tours out of the Chalet.
        </li>
        <li>
          EpiPens &amp; Ventolin are to be visually confirmed by the Party Leader or delegate prior to attendance. If
          they are not able to be presented, the participant will be refused to board the bus.
        </li>
      </ol>

      <h2 className='text-xl font-bold mt-6 mb-2'>Summer events</h2>
      <ol className='list-decimal ml-6 mb-3 space-y-1'>
        <li>
          The medication must be kept in the top of the participant's bag at all times and must go with the participant
          on all tours out of the Chalet.
        </li>
        <li>The medication must be confirmed by the PIC or delegate of the event.</li>
      </ol>

      <p className='mb-3'>
        It is suggested that Snow Venture participants are reminded of this policy prior to the conclusion of the school
        term, as one of their EpiPens will likely be at school.
      </p>
    </div>
  )
}
