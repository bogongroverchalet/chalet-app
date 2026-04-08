import React from 'react'
import classnames from 'classnames'
import Wrapper from './Wrapper'
import { Link } from 'react-router-dom'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import tripData from './trips.yaml'
import _ from 'lodash'

function TripLink({ tripName }) {
  return (
    <li className='mb-1'>
      <Link to={`trip/${tripName}`} className='flex'>
        {tripName} <ChevronRightIcon className='ml-1' />
      </Link>
    </li>
  )
}

const descriptions = {
  1: 'Simple',
  2: 'Challenging',
  3: 'Complex',
}

export default function Trips() {
  const groupedTripNames = _(tripData.trips)
    .groupBy('difficulty-level')
    .mapValues((v) => _.map(v, 'name'))
    .value()
  return (
    <Wrapper>
      <h1 className='text-3xl my-4 -indent-12 max-sm:pl-10'>
        <Link to='..'>
          <ChevronLeftIcon sx={{ fontSize: 40, position: 'relative', top: -3 }} />
          <span className='max-sm:hidden'>Bogong Rover Chalet trip </span>
          <span className='sm:hidden'>Trip </span>
          ideas
        </Link>
      </h1>
      <p className='italic max-w-md mb-4'>
        Note: The trips provided here are ideas only.
        <br />
        Don't follow them verbatim and ensure you undertake a risk assessment and alter (or abandon) the trip as
        required.
      </p>
      {['1', '2', '3'].map((level) => (
        <React.Fragment key={level}>
          <h2 className={classnames('text-2xl mb-2', level === '1' ? '' : 'mt-4')}>
            Level {level} ({descriptions[level]})
          </h2>
          <ul>
            {!groupedTripNames[level] ? (
              <div className='italic mb-2'>None</div>
            ) : (
              groupedTripNames[level].sort().map((t) => <TripLink key={t} tripName={t} />)
            )}
          </ul>
        </React.Fragment>
      ))}
      <div className='mt-2 mb-4'>
        <Link to='map' className='text-2xl'>
          Show all <ChevronRightIcon className='ml-1' />
        </Link>
      </div>
    </Wrapper>
  )
}
