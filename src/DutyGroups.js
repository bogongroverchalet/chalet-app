import React from 'react'
import Wrapper from './Wrapper'
import { Link } from 'react-router-dom'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import data from './duty-groups.yaml'

export default function DutyGroups() {
  return (
    <Wrapper>
      <h1 className='text-3xl my-4 -indent-12 max-sm:pl-10'>
        <Link to='..' relative='path'>
          <ChevronLeftIcon sx={{ fontSize: 40, position: 'relative', top: -3 }} />
          Duty group checklists
        </Link>
      </h1>
      <ul className='text-2xl'>
        {data.groups.map((group) => (
          <li key={group.slug} className='mb-4'>
            <Link to={group.slug} className='flex items-center'>
              <span>
                {group.name}
                {group.description && <span className='block text-base text-gray-500'>{group.description}</span>}
              </span>
              <ChevronRightIcon className='ml-auto' fontSize='large' />
            </Link>
          </li>
        ))}
      </ul>
    </Wrapper>
  )
}
