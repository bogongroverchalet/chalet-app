import React from 'react'
import { Link } from 'react-router-dom'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'

export default function SafetySled() {
  return (
    <div className='p-4 max-w-2xl mx-auto pb-16'>
      <h1 className='text-3xl my-4 -indent-12 max-sm:pl-10'>
        <Link to='..' relative='path'>
          <ChevronLeftIcon sx={{ fontSize: 40, position: 'relative', top: -3 }} />
          Sled guidelines
        </Link>
      </h1>

      <p className='mb-3'>
        The Bogong Rover Chalet has strict guidelines in relation to sleds being brought into the Chalet for a number of
        safety reasons. This applies to all Chalet Winter Parties and all hires. The only exception is with prior
        approval from the Warden.
      </p>

      <h2 className='text-xl font-bold mt-6 mb-2'>Why sleds are restricted</h2>
      <ol className='list-decimal ml-6 mb-3 space-y-1'>
        <li>
          There are a number of slopes on the ski in/out that make towing a sled very dangerous, in particular Bassalt
          Hill. Using alternative routes would result in either:
          <ul className='list-[circle] ml-6 mt-1 space-y-1'>
            <li>
              The whole party being diverted to an alternative route which is more challenging and has other inherent
              risks
            </li>
            <li>Splitting the party up</li>
          </ul>
        </li>
        <li>Sleds being operated by unskilled operators</li>
        <li>Homemade sleds being unsuitable for the route (e.g. a loaded toboggan)</li>
        <li>
          Excessive belongings being brought in with the use of a sled — in particular, concerns about a sled being used
          to bring in excessive alcohol which adds additional alcohol-related risks onto a Winter Party
        </li>
        <li>Sled users are very likely to slow down the party</li>
        <li>
          There is no guarantee of sufficient snow to tow the sled — if so, it would be dangerous and challenging to tow
          the sled without snow
        </li>
      </ol>

      <p className='mb-3'>
        Arguments have previously been made about sleds providing an alternative to packs as an accessibility
        requirement. As it is a non-negotiable requirement that all participants be able to carry a pack overnight, this
        is not a justification for requiring a sled. The BCMG believes that should a participant be unable to carry a
        pack overnight, they are unsafe to both themselves and others on their Winter Party.
      </p>

      <h2 className='text-xl font-bold mt-6 mb-2'>Sled training</h2>
      <p className='mb-3'>
        The BCMG acknowledges that to complete OAS 9 Cross Country Skiing and Guide Qualifications, participants must
        demonstrate "I have towed equipment to support an overnight ski touring trip". The BCMG recognises that
        achieving these qualifications is niche and requires skiing on other events beyond BCMG facilitated Winter
        Parties — therefore not all skills need to be acquired at the Bogong Rover Chalet.
      </p>
    </div>
  )
}
