import React from 'react'
import Wrapper from './Wrapper'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { useParams, Link } from 'react-router-dom'

const VIDEOS = [
  { slug: 'dip-stick', label: 'Dip stick' },
  { slug: 'water-pt1', label: 'Water maintenance part 1' },
  { slug: 'water-pt2', label: 'Water maintenance part 2' },
  { slug: 'water-pt3', label: 'Water maintenance part 3' },
  { slug: 'water-pt4', label: 'Water maintenance part 4' },
  { slug: 'water-pt5', label: 'Water maintenance part 5' },
]

export default function NobsVideos() {
  const { video } = useParams()
  const videoMeta = VIDEOS.find((v) => v.slug === video)
  return (
    <Wrapper>
      <h1 className='text-3xl my-4 -indent-12 max-sm:pl-10'>
        <Link to='..' relative='path'>
          <ChevronLeftIcon sx={{ fontSize: 40, position: 'relative', top: -3 }} />
          <span>{videoMeta ? videoMeta.label : 'Nobs videos'}</span>
        </Link>
      </h1>
      {video ? <Video name={video} /> : <VideoList />}
    </Wrapper>
  )
}

function VideoList() {
  return (
    <ul className='text-2xl'>
      {VIDEOS.map(({ slug, label }) => (
        <li key={slug} className='mb-4'>
          <Link to={slug} className='flex items-center'>
            {label} <ChevronRightIcon className='ml-1' fontSize='large' />
          </Link>
        </li>
      ))}
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
