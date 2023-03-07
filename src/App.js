import React from 'react'
import Wrapper from './Wrapper'
import { Link } from 'react-router-dom'
import Tooltip from '@mui/material/Tooltip'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

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
        <li className='mb-2'>
          <Link to='trips' className='flex items-center'>
            Trips ideas <ChevronRightIcon className='ml-1' fontSize='large' />
          </Link>
        </li>
        <li>
          <Link
            to='https://www.youtube.com/playlist?list=PLPY3isagL_7H0x_XfVkldG_iSRP8Qo2oB'
            className='flex items-center'
          >
            Participant info videos{' '}
            <Tooltip
              title={
                <div>
                  A YouTube playlist which we're creating with participant info.
                  <br />
                  Consider saving it for offline access if you can :-)
                </div>
              }
              arrow
              classes={{ tooltip: 'text-center !text-[1rem]' }}
            >
              <InfoOutlinedIcon className='ml-3' />
            </Tooltip>{' '}
            <ChevronRightIcon className='ml-1' fontSize='large' />
          </Link>
        </li>
      </ul>
    </Wrapper>
  )
}
