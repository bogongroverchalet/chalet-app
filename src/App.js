import React from 'react'
import Wrapper from './Wrapper'
import { Link } from 'react-router-dom'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

function TripLink({ tripName }) {
  return (
    <li className='mb-1'>
      <Link to={`/trip/${tripName}`} className='flex'>
        {tripName} <ChevronRightIcon className='ml-1' />
      </Link>
    </li>
  )
}

export default function App() {
  return (
    <Wrapper>
      <h1 className='text-3xl mb-4'>Bogong Rover Chalet trip ideas</h1>
      <p className='italic max-w-md'>
        Note: The trips provided here are ideas only.
        <br />
        Don't follow them verbatim and ensure you undertake a risk assessment and alter (or abandon) the trip as
        required.
      </p>
      <h2 className='text-xl mb-2'>Level 1</h2>
      <ul>
        {[
          'Cope Hut',
          'Falls Creek',
          'Rocky Nobs',
          'Basalt Hill',
          'Investiture Point',
          'Maddisons Hut',
          'Langfords West',
          'Cope Saddle Hut',
        ]
          .sort()
          .map((t) => (
            <TripLink key={t} tripName={t} />
          ))}
      </ul>
      <h2 className='text-xl mb-2'>Level 2</h2>
      <ul>
        {['Mt Cope (direct)'].map((t) => (
          <TripLink key={t} tripName={t} />
        ))}
      </ul>
      <h2 className='text-xl mb-2'>Level 3</h2>
      <ul>
        <li>Fake place</li>
      </ul>
      <Link to='/map'>All</Link>
    </Wrapper>
  )
}
