import React from 'react'
import { Link } from 'react-router-dom'
import Wrapper from './Wrapper'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

const ROLES = [
  { code: 'pl', label: 'Party Leader', abbr: 'PL' },
  { code: 'pa', label: 'Party Advisor', abbr: 'PA' },
  { code: 'ce', label: 'Chief Engineer', abbr: 'CE' },
  { code: 'qm', label: 'Quartermaster', abbr: 'QM' },
  { code: 'tl', label: 'Tow Leader', abbr: 'TL' },
]

export default function NobsReport() {
  return (
    <Wrapper>
      <h1 className='text-3xl my-4 -indent-12 max-sm:pl-10'>
        <Link to='..' relative='path'>
          <ChevronLeftIcon sx={{ fontSize: 40, position: 'relative', top: -3 }} />
          Nobs reports
        </Link>
      </h1>
      <p className='mb-4'>Select the Nobs report below :-)</p>
      <p className='mb-4 italic'>
        Don't forget to{' '}
        <a
          href='https://www.dropbox.com/request/pLxk8watNOTyhy1PuTvo'
          target='_blank'
          rel='noreferrer'
          className='underline'
        >
          submit them
        </a>{' '}
        when done :-)
      </p>
      <ul className='text-2xl'>
        {ROLES.map(({ code, label, abbr }) => (
          <li key={code} className='mb-4'>
            <Link to={code} className='flex items-center'>
              {label} ({abbr}) <ChevronRightIcon className='ml-1' fontSize='large' />
            </Link>
          </li>
        ))}
      </ul>
    </Wrapper>
  )
}
