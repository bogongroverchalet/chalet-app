import EventEmitter from 'events'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { useUnmount } from 'usehooks-ts'
import Wrapper from './Wrapper'
import Button from '@mui/material/Button'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { Item, DontItem, YEAR } from './Checklists'
import _ from 'lodash'

export default function SemiShutdown() {
  const resetStorageEventEmitter = useRef(_.tap(new EventEmitter(), (emitter) => emitter.setMaxListeners(100)))
  useUnmount(() => resetStorageEventEmitter.current.removeAllListeners())
  const resetList = () => {
    if (!window.confirm('Uncheck all the items on the inter-week shutdown list?')) return

    resetStorageEventEmitter.current.emit('resetStorage')
  }

  const props = { resetStorageEventEmitter: resetStorageEventEmitter.current }
  return (
    <Wrapper>
      <div className='max-sm:pl-8'>
        <h1 className='text-3xl my-4 -ml-10'>
          <Link to='..' relative='path'>
            <ChevronLeftIcon sx={{ fontSize: 40, position: 'relative', top: -3 }} />
            Inter-week shutdown checklist
          </Link>
        </h1>
        <p className='max-w-md mb-4 italic font-bold'>
          This list is for when another week is coming in directly after you.
        </p>
        <p className='max-w-md mb-4 italic'>Last updated: {YEAR}.</p>
        <div>
          <Button variant='outlined' onClick={resetList}>
            Reset list
          </Button>
        </div>
        <h2 className='text-2xl my-4'>Evening cleanup</h2>
        <p className='max-w-md mb-4 italic'></p>
        <ul className='max-w-md mb-4'>
          <Item
            {...props}
            label='Dispose of food'
            info='Including any waste leftovers in the fridge, but not pantry safe things'
          />
          <Item {...props} label='Cook bread for next week' />
          <Item
            {...props}
            label='Ensure all the ash bins are empty enough'
            info='For the stove, fireplace, Theodore. No need to do it again if you did it recently'
          />
          <Item
            {...props}
            label='Pack up and leave things better than you found them'
            info='E.g. Packing up the bookshelf and games, putting manuals away, etc'
          />
          <Item {...props} label='Pack up the radios' info="Ensure they're all charging and all accounted for" />
          <Item {...props} label='Clean showers' />
        </ul>
        <h2 className='text-2xl my-4'>Final morning</h2>
        <p className='max-w-md mb-4 italic'></p>
        <ul className='max-w-md mb-4'>
          <Item {...props} label='Dispose of any final food' />
          <Item
            {...props}
            label='Dispose of dishwashing cleaning supplies'
            info='Including Chux, gloves, dish brush, etc'
          />
          <Item {...props} label='Empty food scraps' />
          <Item {...props} label='Empty all bins' />
          <Item {...props} label='Clean rest of bathroom' />
          <Item {...props} label='Vacuum upstairs' info='Then empty the vacuums and put the batteries on charge' />
        </ul>
        <h2 className='text-2xl my-4'>Exit steps</h2>
        <p className='max-w-md mb-4 italic'></p>
        <ul className='max-w-md mb-4'>
          <Item {...props} label='1. Final mopping' />
          <Item {...props} label='2. Stop the generator' />
          <Item {...props} label='3. Lock all doors (including the ski room)' />
          <Item {...props} label='4. Take the keys and return to Mt Beauty' />
        </ul>
        <h2 className='text-2xl my-4'>Don't forget to take:</h2>
        <p className='max-w-md mb-4 italic'></p>
        <ul className='max-w-md mb-4'>
          <Item {...props} label='The keys' />
          <Item {...props} label='The bothy bag' />
        </ul>
      </div>
      <div>
        <h2 className='text-2xl my-4' id='dont-do'>
          What not to do!
        </h2>
        <ul className='max-w-md mb-4'>
          <DontItem label='Shut off the water' />
          <DontItem label='Shut off the LPG' />
          <DontItem label='Turn off inverter for 24v lights' />
          <DontItem label='Turn off the generator fuel tap' />
          <DontItem label='Turn off the drying room' />
        </ul>
      </div>
    </Wrapper>
  )
}
