import React from 'react'
import Wrapper from './Wrapper'
import { useParams, Link } from 'react-router-dom'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'

export default function TripInfo() {
  const { tripName } = useParams()
  return (
    <Wrapper>
      <h1 className='text-3xl mb-4 -ml-10'>
        <Link to='/'>
          <ChevronLeftIcon sx={{ fontSize: 40, position: 'relative', top: -3 }} />
        </Link>
        <span className='max-sm:hidden'>Bogong Rover Chalet trip:</span> {tripName}
      </h1>
      <div className='mb-4 text-xl'>
        <Link className='font-bold' to={`/map/${tripName}`}>
          Show map
        </Link>
      </div>
      <p>{tripName} is a great trip and stuff</p>
      <p>Level: XYZ</p>
      <p>Notes: ABC</p>
    </Wrapper>
  )
}
