import React from 'react'
import Wrapper from './Wrapper'
import { Link } from 'react-router-dom'
import Tooltip from '@mui/material/Tooltip'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import LaunchIcon from '@mui/icons-material/Launch'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import pantryInventory from './Pantry_Inventory.pdf'

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
        <li className='mb-4'>
          <Link to='trips' className='flex items-center'>
            Trips ideas <ChevronRightIcon className='ml-1' fontSize='large' />
          </Link>
        </li>
        <li className='mb-4'>
          <Link
            to='https://www.youtube.com/playlist?list=PLPY3isagL_7H0x_XfVkldG_iSRP8Qo2oB'
            className='flex items-center'
          >
            Participant info videos
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
              <InfoOutlinedIcon className='ml-2' />
            </Tooltip>
            <LaunchIcon className='ml-2' />
          </Link>
        </li>
        <li className='mb-4'>
          <Link to='packing' className='flex items-center'>
            Packing list <ChevronRightIcon className='ml-1' fontSize='large' />
          </Link>
        </li>
        <li className='mb-4'>
          <a href={pantryInventory} download='Pantry_Inventory.pdf' className='flex items-center'>
            Winter pantry ingredient list
            <Tooltip
              title={
                <div>
                  A document listing all the ingredients in our pantry items to assist those with special dietary
                  requirements. Updated for 2024.
                </div>
              }
              arrow
              classes={{ tooltip: 'text-center !text-[1rem]' }}
            >
              <FileDownloadIcon className='ml-2' />
            </Tooltip>
          </a>
        </li>
        <li className='mb-4'>
          <Link to='http://www.bom.gov.au/vic/forecasts/fallscreek.shtml' className='flex items-center'>
            Falls Creek weather
            <LaunchIcon className='ml-2' />
          </Link>
        </li>
        <li className='mb-4'>
          <Link to='http://www.bom.gov.au/vic/warnings/' className='flex items-center'>
            Weather alerts
            <LaunchIcon className='ml-2' />
          </Link>
        </li>
      </ul>
      <p class='w-[20em]'>
        The trips in this app should work offline, so it's great for planning your trips for the next day :-)
      </p>
    </Wrapper>
  )
}
