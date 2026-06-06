import React from 'react'
import { Link } from 'react-router-dom'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'

export default function SafetyOffMountain() {
  return (
    <div className='p-4 max-w-2xl mx-auto pb-16'>
      <h1 className='text-3xl my-4 -indent-12 max-sm:pl-10'>
        <Link to='..' relative='path'>
          <ChevronLeftIcon sx={{ fontSize: 40, position: 'relative', top: -3 }} />
          Off-mountain contact guidelines
        </Link>
      </h1>

      <p className='mb-3'>
        The role of the Off Mountain Contact is to monitor publicly available sources and provide that information to
        those at the Bogong Rover Chalet. This may include (but is not limited to) checking warnings on VicEmergency and
        monitoring warnings on BOM.
      </p>

      <p className='mb-3'>
        Unless otherwise communicated, the Off Mountain Contact is the Bookings Officer. This role can be discharged to
        other individuals at any time, provided it is communicated and recorded on the roster. Should there be
        significant individuals involved in a roster, it is suggested that scheduled emails are used to ensure
        communication of who is responsible is clear.
      </p>

      <p className='mb-3'>
        Should the Off Mountain Contact believe there is a reason to contact the Chalet, they are to contact the Chalet
        via the landline number as soon as possible. If no answer, they are to try calling the Party Leader or the
        Person In Charge on their personal mobile number, in case they are out of the Chalet. Should there be no answer,
        a text is to be sent to the PL/PIC with a timestamp included and additional calls made to the Chalet landline.
        At this time the Off Mountain Contact group chat (which contains the Wardens) will be contacted.
      </p>

      <p className='mb-3'>
        Should the Bogong High Plains Road open prematurely while a Winter Party is currently underway, the Off Mountain
        Contact is to communicate this to the Chalet as soon as possible.
      </p>

      <p className='mb-3'>
        The Off Mountain Contact's information is to be considered by the people at the Chalet when making plans.
      </p>

      <h2 className='text-xl font-bold mt-6 mb-2'>Chalet keys</h2>
      <p className='mb-3'>
        On Winter Parties, the Chalet keys that are skied in/out are to be checked in using the attached QR codes. The
        purpose of this is solely to assist in relocating the keys in the event that they are misplaced. The key holders
        of other key sets remain responsible for the movement of their key sets.
      </p>

      <p className='mb-3'>This does not replace advice given to the Chalet by Scouts Victoria or Emergency Services.</p>
    </div>
  )
}
