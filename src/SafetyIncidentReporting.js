import React from 'react'
import { Link } from 'react-router-dom'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'

export default function SafetyIncidentReporting() {
  return (
    <div className='p-4 max-w-2xl mx-auto pb-16'>
      <h1 className='text-3xl my-4 -indent-12 max-sm:pl-10'>
        <Link to='..' relative='path'>
          <ChevronLeftIcon sx={{ fontSize: 40, position: 'relative', top: -3 }} />
          Incident reporting guidelines
        </Link>
      </h1>

      <p className='mb-3'>
        It is a requirement of attending the Bogong Rover Chalet that any incident that occurs must be reported
        appropriately.
      </p>

      <h2 className='text-xl font-bold mt-6 mb-2'>Incident report categories</h2>
      <p className='mb-3'>Incident report forms are available for:</p>
      <ul className='list-disc ml-6 mb-3 space-y-1'>
        <li>Injury — Major injury (&amp; Missing Persons)</li>
        <li>Injury — Minor injury</li>
        <li>Damage to Chalet Property</li>
      </ul>

      <p className='mb-3'>
        Regardless of who the victim of the injury or the perpetrator of the damage is, a report must be made. This
        includes both members of any Scouts Australia branch and anyone who is not a member or associated with any
        Scouting organisation. Membership status does not determine whether a report needs to be made.
      </p>

      <p className='mb-3'>
        A minor injury is defined as "an injury that is not expected to require additional medical attention. Should a
        minor injury continue to require medical attention, please fill in a major injury form. A minor injury may be a
        papercut, minor burn, carpet burn or a graze. A blister is to be considered a major injury."
      </p>

      <h2 className='text-xl font-bold mt-6 mb-2'>Submitting reports</h2>
      <p className='mb-3'>
        All incident reports are to be sent to the Warden. This role may be discharged to the Assistant Warden or the
        Deputy Warden in the case of the Warden being unavailable. The Warden must report incidents to Scouts Victoria,
        as per Scouts Victoria's policies.
      </p>

      <h2 className='text-xl font-bold mt-6 mb-2'>Scouts Victoria Emergency Line</h2>
      <p className='mb-3'>
        In addition to completing an incident report, you must contact Scouts Victoria via the Emergency Line on{' '}
        <strong>03 8543 9877</strong> for incidents meeting the following criteria:
      </p>
      <ul className='list-disc ml-6 mb-3 space-y-1'>
        <li>A person requiring immediate medical treatment by a doctor, dentist or in a hospital</li>
        <li>Major building or asset damage</li>
        <li>Lost or overdue activity participants</li>
        <li>An incident reported to Emergency Services, such as Police, Fire, State Emergency Service or Ambulance</li>
        <li>
          An incident that is continuing to escalate beyond local resource capacity or where urgent assistance is
          required
        </li>
      </ul>

      <p className='mb-3'>Please see the child safe policy for child safe related matters.</p>
    </div>
  )
}
