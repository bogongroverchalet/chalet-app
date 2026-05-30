import React from 'react'
import Wrapper from './Wrapper'
import { Link, useParams, Navigate } from 'react-router-dom'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import data from './room-by-room.yaml'

function Items({ items, depth = 0 }) {
  const listStyles = ['list-disc', 'list-[circle]', 'list-[square]']
  const style = listStyles[Math.min(depth, listStyles.length - 1)]
  return (
    <ul className={`${style} ml-6 mb-1 max-w-lg`}>
      {items.map((item, i) => {
        const text = typeof item === 'string' ? item : item.text
        const children = typeof item === 'object' ? item.items : null
        return (
          <li key={i} className='mt-1'>
            {text}
            {children && <Items items={children} depth={depth + 1} />}
          </li>
        )
      })}
    </ul>
  )
}

export default function RoomByRoomDetail() {
  const { slug } = useParams()
  const room = data.rooms.find((r) => r.slug === slug)

  if (!room) return <Navigate to='/nobs/room-by-room' replace />

  const roomIndex = data.rooms.findIndex((r) => r.slug === slug)
  const prevRoom = data.rooms[roomIndex - 1]
  const nextRoom = data.rooms[roomIndex + 1]

  return (
    <Wrapper>
      <h1 className='text-3xl my-4 -indent-12 max-sm:pl-10'>
        <Link to='..' relative='path'>
          <ChevronLeftIcon sx={{ fontSize: 40, position: 'relative', top: -3 }} />
          {room.name}
        </Link>
      </h1>

      {room.sections.map((section, i) => (
        <div key={i} className='mb-4'>
          <h2 className='text-lg font-semibold mb-1'>{section.title}</h2>
          <Items items={section.items} />
        </div>
      ))}

      <div className='flex justify-between mt-8 text-xl border-t border-gray-300 pt-4 max-w-lg'>
        {prevRoom ? (
          <Link to={`../${prevRoom.slug}`} relative='path' className='flex items-center'>
            <ChevronLeftIcon fontSize='large' />
            {prevRoom.name}
          </Link>
        ) : (
          <span />
        )}
        {nextRoom ? (
          <Link to={`../${nextRoom.slug}`} relative='path' className='flex items-center'>
            {nextRoom.name}
            <ChevronRightIcon fontSize='large' />
          </Link>
        ) : (
          <span />
        )}
      </div>
    </Wrapper>
  )
}
