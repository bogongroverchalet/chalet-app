import React from 'react'
import { Link } from 'react-router-dom'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'

export default function SafetyMedicalRefusal() {
  return (
    <div className='p-4 max-w-2xl mx-auto pb-16'>
      <h1 className='text-3xl my-4 -indent-12 max-sm:pl-10'>
        <Link to='..' relative='path'>
          <ChevronLeftIcon sx={{ fontSize: 40, position: 'relative', top: -3 }} />
          Medical refusal guidelines
        </Link>
      </h1>

      <p className='mb-3'>
        In winter the Chalet is only accessible via skis/snowshoes from Falls Creek, which is around 12km. In summer
        (when the Bogong High Plains Road is open between Windy Corner &amp; Trapyard Gap), there is a 1.6km walk from
        Cope Hut Car Park.
      </p>

      <p className='mb-3'>
        Due to the location of the Chalet and the internal nature of the building, it may not necessarily be accessible
        to some individuals who have physical disabilities. This is mainly due to the travel to get there, however it is
        also due to the building itself not being required to meet disability requirements. Additionally:
      </p>
      <ul className='list-disc ml-6 mb-3 space-y-1'>
        <li>
          The track itself into the Chalet is not able to be maintained by the BCMG as it is a Parks Victoria and AGL
          responsibility. It is not possible for the BCMG to transport individuals other than by their own human power.
        </li>
        <li>
          The current lease prohibits the use of vehicles to transport individuals down to the Chalet, as well as
          prohibiting the use of over-snow vehicles.
        </li>
      </ul>

      <h2 className='text-xl font-bold mt-6 mb-2'>Winter Parties</h2>
      <p className='mb-3'>
        The BCMG and/or Wardens Team reserve the right to refuse entry to a Winter Party due to physical or mental
        impairments, to reduce the risk associated for the individual and for the group.
      </p>

      <h2 className='text-xl font-bold mt-6 mb-2'>Assessment of medical data</h2>
      <p className='mb-3'>
        For every event (including Winter Parties), medical data is assessed prior by the Wardens Team. If a participant
        is deemed not suitable, the Wardens Team is responsible for communicating with that participant.
      </p>
      <p className='mb-3'>
        Should a participant not disclose relevant details in their medical information, they will be individually
        assessed by the Wardens Team as to whether they are allowed to attend future Chalet events.
      </p>

      <h2 className='text-xl font-bold mt-6 mb-2'>Refunds</h2>
      <p className='mb-3'>
        Should a participant be unable to attend due to being deemed not suitable by a medical practitioner prior to the
        start of the winter party, a full refund will be provided. Any other refunds are at the discretion of the
        Wardens or the BCMG Chairperson.
      </p>
    </div>
  )
}
