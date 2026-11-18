import React from 'react'
import Wrapper from './Wrapper'
import { Link } from 'react-router-dom'
import Tooltip from '@mui/material/Tooltip'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import LaunchIcon from '@mui/icons-material/Launch'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { toggleTestingMode } from './nobs-week'

export default function App() {
  const taps = React.useRef([])
  const [testingMsg, setTestingMsg] = React.useState('')
  // Hidden switch: 5 taps within 3s on the build date toggles the Nobs report "Testing" week
  const tapBuildDate = () => {
    const now = Date.now()
    taps.current = [...taps.current.filter((t) => now - t < 3000), now]
    if (taps.current.length < 5) return
    taps.current = []
    setTestingMsg(
      toggleTestingMode() ? 'Testing mode on: Nobs reports can use the "Testing" week.' : 'Testing mode off.'
    )
  }

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
          <Link to='chores' className='flex items-center'>
            Duty group checklists <ChevronRightIcon className='ml-1' fontSize='large' />
          </Link>
        </li>
        <li className='mb-4'>
          <Link to='merch' className='flex items-center'>
            Merchandise <ChevronRightIcon className='ml-1' fontSize='large' />
          </Link>
        </li>
        <li className='mb-4'>
          <Link to='contacts' className='flex items-center'>
            Contacts <ChevronRightIcon className='ml-1' fontSize='large' />
          </Link>
        </li>
        <li className='mb-4'>
          <Link to='safety' className='flex items-center'>
            Safety docs &amp; activity plans <ChevronRightIcon className='ml-1' fontSize='large' />
          </Link>
        </li>
        <li className='mb-4'>
          <Link to='nobs' className='flex items-center'>
            Stuff for Nobs <ChevronRightIcon className='ml-1' fontSize='large' />
          </Link>
        </li>
        <li className='mb-4'>
          <Link to='videos' className='flex items-center'>
            Videos <ChevronRightIcon className='ml-1' fontSize='large' />
          </Link>
        </li>
        <li className='mb-4'>
          <Link to='/pdf/code-of-conduct' className='flex items-center'>
            Code of conduct <ChevronRightIcon className='ml-1' fontSize='large' />
          </Link>
        </li>
        <li className='mb-4'>
          <Link to='/pdf/pantry-inventory' className='flex items-center'>
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
              <ChevronRightIcon className='ml-1' fontSize='large' />
            </Tooltip>
          </Link>
        </li>
        <li className='mb-4'>
          <Link to='/pdf/snowboard-boots' className='flex items-center'>
            Snowboard boot and binding details
            <ChevronRightIcon className='ml-1' fontSize='large' />
          </Link>
        </li>
        <li className='mb-4'>
          <Link to='weather' className='flex items-center'>
            Chalet weather forecast <ChevronRightIcon className='ml-1' fontSize='large' />
          </Link>
        </li>
        <li className='mb-4'>
          <Link
            to='https://www.bom.gov.au/location/australia/victoria/north-east/bvic_pt022-falls-creek'
            className='flex items-center'
          >
            Weather alerts
            <LaunchIcon className='ml-2' />
          </Link>
        </li>
      </ul>
      <p className='w-[20em]'>
        The trips in this app should work offline, so it's great for planning your trips for the next day :-)
      </p>
      <p className='mt-4'>
        {/* select-none: rapid taps would otherwise select the text and trigger Chrome's tap-to-search sheet */}
        <i onClick={tapBuildDate} className='select-none touch-manipulation'>
          Build date: {process.env.REACT_APP_BUILD_DATE}
        </i>
      </p>
      {testingMsg && (
        <p className='mt-2 text-sm' role='status'>
          {testingMsg}
        </p>
      )}
    </Wrapper>
  )
}
