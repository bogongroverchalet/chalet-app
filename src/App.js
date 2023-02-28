import React from 'react'
import Wrapper from './Wrapper'
import { Link } from 'react-router-dom'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import tripData from './trips.yaml'
import _ from 'lodash'

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
  const groupedTripNames = _(tripData.trips)
    .groupBy('difficulty-level')
    .mapValues((v) => _.map(v, 'name'))
    .value()
  return (
    <Wrapper>
      <h1 className='text-3xl mb-4'>Bogong Rover Chalet trip ideas</h1>
      <p className='italic max-w-md'>
        Note: The trips provided here are ideas only.
        <br />
        Don't follow them verbatim and ensure you undertake a risk assessment and alter (or abandon) the trip as
        required.
      </p>
      {['1', '2', '3'].map((level) => (
        <React.Fragment key={level}>
          <h2 className='text-xl mb-2'>Level {level}</h2>
          <ul>
            {!groupedTripNames[level] ? (
              <div className='italic mb-2'>None</div>
            ) : (
              groupedTripNames[level].sort().map((t) => <TripLink key={t} tripName={t} />)
            )}
          </ul>
        </React.Fragment>
      ))}
      <Link to='/map' className='text-xl mb-2'>
        Show all <ChevronRightIcon className='ml-1' />
      </Link>
    </Wrapper>
  )
}
