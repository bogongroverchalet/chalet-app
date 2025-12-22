import EventEmitter from 'events'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { useUnmount } from 'usehooks-ts'
import Wrapper from './Wrapper'
import Button from '@mui/material/Button'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import LaunchIcon from '@mui/icons-material/Launch'
import { Item, DontItem, YEAR } from './Checklists'
import _ from 'lodash'

export default function FullShutdown() {
  const resetStorageEventEmitter = useRef(_.tap(new EventEmitter(), (emitter) => emitter.setMaxListeners(100)))
  useUnmount(() => resetStorageEventEmitter.current.removeAllListeners())
  const resetList = () => {
    if (!window.confirm('Uncheck all the items on the full shutdown list?')) return

    resetStorageEventEmitter.current.emit('resetStorage')
  }

  const props = { resetStorageEventEmitter: resetStorageEventEmitter.current }
  return (
    <Wrapper>
      <div className='max-sm:pl-8'>
        <h1 className='text-3xl my-4 -ml-10'>
          <Link to='..' relative='path'>
            <ChevronLeftIcon sx={{ fontSize: 40, position: 'relative', top: -3 }} />
            Full shutdown checklist
          </Link>
        </h1>
        <p className='max-w-md mb-4 italic'>Last updated: {YEAR}.</p>
        <p className='max-w-md mb-4 italic font-bold'></p>
        <div>
          <Button variant='outlined' onClick={resetList}>
            Reset list
          </Button>
        </div>
        <h2 className='text-2xl my-4' id='wearing'>
          What to do
        </h2>
        <p className='max-w-md mb-4 italic'></p>
        <ul className='max-w-md mb-4'>
          <Item
            {...props}
            label={
              <>
                1. Inter-week Chalet shutdown
                <Link relative='path' to='../semi-shutdown'>
                  <LaunchIcon className='ml-2' />
                </Link>
              </>
            }
            info="Don't do anything like making bread."
          />
          <Item {...props} label='2. Turn off the drying room heater' />
          <Item {...props} label='3. Electrical shutdown' />
          <Item {...props} label='4. Drain the water' />
          <Item {...props} label='5. Shutdown the LPG' />
          <Item {...props} label='6. Stop the generator' />
          <Item {...props} label='7. Close all doors and deadlock' info="So they don't open from the inside." />
          <Item {...props} label='8. Take the keys and return to Mt Beauty' />
        </ul>
      </div>
      <div>
        <h2 className='text-2xl my-4' id='dont-do'>
          What not to do!
        </h2>
        <ul className='max-w-md mb-4'>
          <DontItem label='Turn off inverter for 24v lights' />
        </ul>
      </div>
    </Wrapper>
  )
}
