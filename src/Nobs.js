import React from 'react'
import Wrapper from './Wrapper'
import { Link } from 'react-router-dom'
import Tooltip from '@mui/material/Tooltip'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import pantryByBay from './Pantry_by_bay.pdf'
import pantryByItem from './Pantry_by_item.pdf'

export default function Nobs() {
  return (
    <Wrapper>
      <h1 className='text-3xl my-4 -indent-12 max-sm:pl-10'>
        <Link to='..'>
          <ChevronLeftIcon sx={{ fontSize: 40, position: 'relative', top: -3 }} />
          <span className='max-sm:hidden'>Bogong Rover Chalet nobs </span>
          <span className='sm:hidden'>Nobs </span>
          stuff
        </Link>
      </h1>
      <p className='max-w-md mb-4'>
        Need more details? Check the operating manuals - they're stored below the phone in the dining room.
      </p>
      <ul className='text-2xl'>
        <li className='mb-4'>
          <Link to='report' className='flex items-center'>
            Fill in your Nobs report <ChevronRightIcon className='ml-1' fontSize='large' />
          </Link>
        </li>
        <li className='mb-4'>
          <Link
            to='/pdf'
            state={{ file: pantryByBay, title: 'Bulk pantry items by bay' }}
            className='flex items-center'
          >
            Bulk pantry items by bay
            <Tooltip
              title={<div>A document listing where all the items are in the bulk pantry (by bay).</div>}
              arrow
              classes={{ tooltip: 'text-center !text-[1rem]' }}
            >
              <ChevronRightIcon className='ml-1' fontSize='large' />
            </Tooltip>
          </Link>
        </li>
        <li className='mb-4'>
          <Link
            to='/pdf'
            state={{ file: pantryByItem, title: 'Bulk pantry bay finder (by item)' }}
            className='flex items-center'
          >
            Bulk pantry bay finder (by item)
            <Tooltip
              title={<div>A document listing which bay all the items in the bulk pantry are in.</div>}
              arrow
              classes={{ tooltip: 'text-center !text-[1rem]' }}
            >
              <ChevronRightIcon className='ml-1' fontSize='large' />
            </Tooltip>
          </Link>
        </li>
      </ul>
    </Wrapper>
  )
}
