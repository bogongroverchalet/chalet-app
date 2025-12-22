import React from 'react'
import Wrapper from './Wrapper'
import { Link } from 'react-router-dom'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'

export default function Nobs() {
  return (
    <Wrapper>
      <h1 className='text-3xl my-4 -indent-12 max-sm:pl-10'>
        <Link to='..'>
          <ChevronLeftIcon sx={{ fontSize: 40, position: 'relative', top: -3 }} />
          <span className='max-sm:hidden'>Bogong Rover Chalet nobs </span>
          <span className='sm:hidden'>Nobs </span>
          info
        </Link>
      </h1>
      <p className='max-w-md mb-4'>
        Need more details? Check the operating manuals - they're stored below the phone in the dining room.
      </p>
      <ul className='text-2xl'>
        <li className='mb-4'>
          <Link to='semi-shutdown' className='flex items-center'>
            Inter-week shutdown checklist <ChevronRightIcon className='ml-1' fontSize='large' />
          </Link>
        </li>
        <li className='mb-4'>
          <Link to='full-shutdown' className='flex items-center'>
            Full shutdown checklist <ChevronRightIcon className='ml-1' fontSize='large' />
          </Link>
        </li>
      </ul>
    </Wrapper>
  )
}
