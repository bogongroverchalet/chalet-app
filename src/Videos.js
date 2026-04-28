import React from 'react'
import Wrapper from './Wrapper'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { useParams, Link } from 'react-router-dom'
import { upperFirst } from 'lodash'

export default function Videos() {
  const { video } = useParams()
  return (
    <Wrapper>
      <h1 className='text-3xl my-4 -indent-12 max-sm:pl-10'>
        <Link to='..' relative='path'>
          <ChevronLeftIcon sx={{ fontSize: 40, position: 'relative', top: -3 }} />
          <span className='max-sm:hidden'>Bogong Rover Chalet {video ? `${video} video` : 'videos'} </span>
          <span className='sm:hidden'>{video ? `${upperFirst(video)} video` : 'Videos'} </span>
        </Link>
      </h1>
      {video ? <Video name={video} /> : <VideoList />}
    </Wrapper>
  )
}

function VideoList() {
  return (
    <ul className='text-2xl'>
      <li className='mb-4'>
        <Link to='bathroom' className='flex items-center'>
          Bathroom <ChevronRightIcon className='ml-1' fontSize='large' />
        </Link>
      </li>
    </ul>
  )
}

function Video({ name }) {
  return (
    <div>
      <video controls width='600' preload='auto'>
        <source src={`/${name}.mp4`} type='video/mp4' />
      </video>
    </div>
  )
}
