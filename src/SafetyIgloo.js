import React from 'react'
import { Link } from 'react-router-dom'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'

export default function SafetyIgloo() {
  return (
    <div className='p-4 max-w-2xl mx-auto pb-16'>
      <h1 className='text-3xl my-4 -indent-12 max-sm:pl-10'>
        <Link to='..' relative='path'>
          <ChevronLeftIcon sx={{ fontSize: 40, position: 'relative', top: -3 }} />
          Igloo sleepover guidelines
        </Link>
      </h1>

      <p className='mb-3'>
        These guidelines distinguish an igloo sleepover from an overnight tour. They apply if an igloo is built within
        20m of the Chalet. No prior approval from the Wardens is required should an igloo meet the following
        requirements.
      </p>

      <h2 className='text-xl font-bold mt-6 mb-2'>Prior to sleeping in the igloo</h2>
      <ul className='list-disc ml-6 mb-3 space-y-1'>
        <li>The igloo must be assessed by the Party Leader or suitably qualified person for ventilation.</li>
        <li>
          The sleepover plan must be written out on a "trip intention form", detailing what will be used to keep people
          warm throughout the night and checking for snow collapse.
        </li>
        <li>The weather must be checked — there is to be no sleeping in an igloo during a severe weather warning.</li>
        <li>The igloo must be marked so that it isn't hit by skidoos.</li>
      </ul>

      <h2 className='text-xl font-bold mt-6 mb-2'>Minimum gear per person</h2>
      <ul className='list-disc ml-6 mb-3 space-y-1'>
        <li>Sleeping mat</li>
        <li>Sleeping bag</li>
        <li>Whistle</li>
        <li>Head torch</li>
      </ul>

      <h2 className='text-xl font-bold mt-6 mb-2'>Minimum gear per igloo (at all times)</h2>
      <ul className='list-disc ml-6 mb-3 space-y-1'>
        <li>Radio</li>
        <li>Snow shovels</li>
      </ul>

      <p className='mb-3'>The minimum number of people in an igloo sleepover is 2.</p>

      <h2 className='text-xl font-bold mt-6 mb-2'>Other notes</h2>
      <ul className='list-disc ml-6 mb-3 space-y-1'>
        <li>2 deep child safe policy still applies.</li>
        <li>
          Over 18 weeks — no alcohol is allowed to be consumed by the entire party whilst an igloo sleepover is
          occurring.
        </li>
        <li>
          The 20m distance from the Chalet is specified to distinguish an igloo sleepover from a general overnight snow
          camping activity, and to allow leaders to check on the party without the necessity of having a party of 4.
        </li>
      </ul>
    </div>
  )
}
