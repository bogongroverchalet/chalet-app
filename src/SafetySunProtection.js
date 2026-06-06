import React from 'react'
import { Link } from 'react-router-dom'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'

export default function SafetySunProtection() {
  return (
    <div className='p-4 max-w-2xl mx-auto pb-16'>
      <h1 className='text-3xl my-4 -indent-12 max-sm:pl-10'>
        <Link to='..' relative='path'>
          <ChevronLeftIcon sx={{ fontSize: 40, position: 'relative', top: -3 }} />
          Sun protection policy
        </Link>
      </h1>

      <p className='mb-3'>
        Sun protection measures should be used for all outdoor activities whenever UV levels are three or higher —
        typically from mid-August to end of April. Sun protection measures should also be considered for snow and water
        activities where reflection increases UV exposure.
      </p>

      <h2 className='text-xl font-bold mt-6 mb-2'>Responsibilities</h2>

      <h3 className='text-lg font-semibold mt-4 mb-1'>Person in charge of activity</h3>
      <ul className='list-disc ml-6 mb-3 space-y-1'>
        <li>
          Access the daily local sun protection times via the free SunSmart app or at{' '}
          <a href='https://www.sunsmart.com.au' className='underline'>
            www.sunsmart.com.au
          </a>
          .
        </li>
        <li>
          As part of the planning process, assess the availability of shade and, where necessary, provide temporary
          shelter.
        </li>
        <li>
          Advise all participants of the need to bring appropriate sun protection items such as headwear, sunglasses,
          protective clothing and sunscreen.
        </li>
        <li>Make sure sunscreen is available during the activity.</li>
        <li>
          Monitor the use of protective measures by participants during the activity, especially by Youth Members, and
          regularly reinforce and promote SunSmart messages.
        </li>
      </ul>

      <h3 className='text-lg font-semibold mt-4 mb-1'>All participants</h3>
      <ul className='list-disc ml-6 mb-3 space-y-1'>
        <li>
          Bring and use appropriate sun protection items including wide-brimmed headwear, sunglasses, protective
          clothing and sunscreen.
        </li>
      </ul>

      <h3 className='text-lg font-semibold mt-4 mb-1'>Leaders and Adult Members</h3>
      <ul className='list-disc ml-6 mb-3 space-y-1'>
        <li>Set an example to Youth Members of appropriate SunSmart behaviours.</li>
      </ul>

      <h3 className='text-lg font-semibold mt-4 mb-1'>Event organiser</h3>
      <ul className='list-disc ml-6 mb-3 space-y-1'>
        <li>Ensure that any clothing merchandise for an event is SunSmart and has appropriate UV protection.</li>
      </ul>

      <h2 className='text-xl font-bold mt-6 mb-2'>Shade</h2>
      <ul className='list-disc ml-6 mb-3 space-y-1'>
        <li>
          The availability of shade is to be considered when planning outdoor activities. Where insufficient shade is
          available, and it is practical to do so, temporary shelters are to be provided.
        </li>
        <li>Shade or temporary shelters are to be provided where there is expected to be queuing or waiting.</li>
        <li>Where possible, outdoor activities should be conducted in the shade.</li>
      </ul>

      <h2 className='text-xl font-bold mt-6 mb-2'>Protective clothing</h2>
      <ul className='list-disc ml-6 mb-3 space-y-1'>
        <li>
          All Youth Members and adults are to wear a hat that protects their face, neck and ears (for example, a
          broad-brimmed or legionnaire hat) whenever they are outside in the sun.
        </li>
        <li>
          All Youth Members and adults are to wear suitable protective clothing when outside in the sun (for example,
          collared shirts, not singlets).
        </li>
        <li>
          When swimming, Youth Members and adults are to wear suitable protective clothing (for example, rash vests or
          t-shirts and shorts).
        </li>
        <li>
          Any official Scout merchandise should be SunSmart and have appropriate UV protection. T-shirts should have
          collars and sleeves and hats should be provided.
        </li>
        <li>Where practical, close-fitting, wrap-around sunglasses should be used.</li>
      </ul>

      <h2 className='text-xl font-bold mt-6 mb-2'>Sunscreen</h2>
      <ul className='list-disc ml-6 mb-3 space-y-1'>
        <li>Youth Members are to provide their own SPF30 or higher broad-spectrum sunscreen for outdoor activities.</li>
        <li>
          The person in charge of the activity must also supply SPF30 or higher broad-spectrum sunscreen for the use of
          Youth Members and adults.
        </li>
        <li>Sunscreen should be applied 20 mins before going outdoors and re-applied every two hours if outdoors.</li>
        <li>
          Leaders are to actively remind Youth Members to apply sunscreen at regular intervals and monitor the use of
          sunscreen.
        </li>
      </ul>
    </div>
  )
}
