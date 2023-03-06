import React from 'react'
import Wrapper from './Wrapper'
import { Link } from 'react-router-dom'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

export default function App() {
  return (
    <Wrapper>
      <h1 className='text-3xl my-4'>Bogong Rover Chalet App</h1>
      <p className='max-w-md mb-4'>
        Need to describe where the Chalet is?
        <br />
        We suggest referencing our <a href='https://what3words.com/clanking.advisable.bamboo'>
          what3words
        </a> location, <a href='https://what3words.com/clanking.advisable.bamboo'>{'///clanking.advisable.bamboo'}</a>.
        <br />
      </p>
      <ul className='text-2xl'>
        <li className='mb-1'>
          <Link to='trips' className='flex items-center'>
            Trips ideas <ChevronRightIcon className='ml-1' fontSize='large' />
          </Link>
        </li>
      </ul>
    </Wrapper>
  )
}
