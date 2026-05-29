import React from 'react'
import Wrapper from './Wrapper'
import { Link } from 'react-router-dom'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import data from './room-by-room.yaml'

export default function RoomByRoom() {
  return (
    <Wrapper>
      <h1 className='text-3xl my-4 -indent-12 max-sm:pl-10'>
        <Link to='..' relative='path'>
          <ChevronLeftIcon sx={{ fontSize: 40, position: 'relative', top: -3 }} />
          Room by Room Tour
        </Link>
      </h1>
      <p className='max-w-lg mb-6 italic'>{data.intro}</p>
      <ul className='text-2xl'>
        {data.rooms.map((room) => (
          <li key={room.slug} className='mb-4'>
            <Link to={room.slug} className='flex items-center'>
              {room.name}
              <ChevronRightIcon className='ml-1' fontSize='large' />
            </Link>
          </li>
        ))}
      </ul>
    </Wrapper>
  )
}
