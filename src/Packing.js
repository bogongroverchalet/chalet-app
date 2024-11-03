import EventEmitter from 'events'
import { Link } from 'react-router-dom'
import { useEffect, useRef, useMemo } from 'react'
import { useLocalStorage, useUnmount, useBoolean, useClickAnyWhere } from 'usehooks-ts'
import Wrapper from './Wrapper'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import Tooltip from '@mui/material/Tooltip'
import classnames from 'classnames'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import _ from 'lodash'

export default function Packing() {
  const resetStorageEventEmitter = useRef(_.tap(new EventEmitter(), (emitter) => emitter.setMaxListeners(100)))
  useUnmount(() => resetStorageEventEmitter.current.removeAllListeners())
  const resetPackingList = () => {
    if (!window.confirm('Uncheck all the items on the packing list?')) return

    resetStorageEventEmitter.current.emit('resetStorage')
  }

  const props = { resetStorageEventEmitter: resetStorageEventEmitter.current }
  return (
    <Wrapper>
      <div className='max-sm:pl-8'>
        <h1 className='text-3xl my-4 -ml-10'>
          <Link to='..' relative='path'>
            <ChevronLeftIcon sx={{ fontSize: 40, position: 'relative', top: -3 }} />
            <span className='max-sm:hidden'>Bogong Rover Chalet packing </span>
            <span className='sm:hidden'>Packing </span>
            list
          </Link>
        </h1>
        <p className='max-w-md mb-4 italic'>Last updated: 2024.</p>
        <h2 className='text-2xl my-4' id='overview'>
          Overview
        </h2>
        <p className='max-w-md mb-4 italic'>
          Skiing with a lighter pack will make your experience easier and much more enjoyable. Carefully consider the
          benefit of each item you choose to bring from the optional list.
        </p>
        <p className='max-w-md mb-4 italic font-bold'>12-13kg is a good target weight.</p>
        <div>
          <Button variant='outlined' onClick={resetPackingList}>
            Reset list
          </Button>
        </div>
        <h2 className='text-2xl my-4' id='wearing'>
          Wearing
        </h2>
        <p className='max-w-md mb-4 italic'>Wear or have available while skiing.</p>
        <ul className='max-w-md mb-4'>
          <li>
            <Item {...props} label='2 x Thermal top' />
            <Item {...props} label='2 x Thermal pants' />
            <Item {...props} label='4 x Socks' info='Ski/outdoor socks - not cotton.' />
            <Item {...props} label='1 x Long pants (hike/fleece)' />
            <Item {...props} label='1-2 x Midlayer' />
            <Item {...props} label='1 x Lightweight finger gloves/mitts' />
            <Item {...props} label='1 x Sunglasses' />
            <Item {...props} optional label='1 x Quick-dry shorts (hike/board shorts)' />
          </li>
        </ul>
        <h2 className='text-2xl my-4' id='accessible'>
          Accessible
        </h2>
        <p className='max-w-md mb-4 italic'>Have readily accessible at the top of your pack</p>
        <ul className='max-w-md mb-4'>
          <li>
            <Item {...props} label='2 x Health forms (Operoo/PIR)' />
            <Item {...props} label='1 x Raincoat (GoreTEX or equivalent)' />
            <Item {...props} label='1 x Rain pants' />
            <Item {...props} label='1 x Warm gloves/mittens' />
            <Item {...props} label='1 x Beanie' />
            <Item {...props} label='1 x Sunhat' />
            <Item {...props} label='1 x Sit pad' />
            <Item {...props} label='1 x Buff/scarf' optional />
            <Item {...props} label='1 x Glove liners' optional />
            <Item {...props} label='1 x Ski goggles' optional />
            <Item {...props} label='1 x Ski straps' optional />
          </li>
        </ul>
        <h2 className='text-2xl my-4 font-bold'>Hot tip</h2>
        <p className='max-w-md mb-4 font-bold'>
          There is a washing machine available for use at the Chalet! You do not need to bring enough clothes for each
          individual day.
          <br />
          Detergent is supplied.
        </p>
        <h2 className='text-2xl my-4' id='day-tours'>
          Day tours
        </h2>
        <p className='max-w-md mb-4 italic'>Comes with you each day on tours.</p>
        <ul className='max-w-md mb-4'>
          <li>
            <Item {...props} label='1 x Lunch for Saturday' />
            <Item {...props} label='1 x Skis (backcountry, not downhill)' />
            <Item {...props} label='1 x Ski boots' />
            <Item {...props} label='1 x Stocks/poles' />
            <Item {...props} label='1 x Ski leashes' />
            <Item {...props} label='1 x Hike pack' />
            <Item {...props} label='2 x Water bottle (2L)' />
            <Item {...props} label='500g Scroggin (snacks)' />
            <Item {...props} label='1 x Sunscreen' />
            <Item {...props} label='1 x Lip balm' />
            <Item {...props} label='1 x Personal first aid kit' />
            <Item {...props} label='1 x Head torch (+ spare batteries)' />
            <Item {...props} label='1 x Whistle' />
            <Item {...props} label='1 x Emergency blanket (space blanket)' />
            <Item {...props} label='1 x Whiteout cord (25m/50m)' />
            <Item {...props} label='1 x Compass' />
            <Item {...props} label='1 x Mobile Phone' />
            <Item
              {...props}
              label='Medication (personal)'
              info={
                <>
                  Bring an extra 3 days in case of extreme weather.
                  <br />
                  Please bring all medication that is on your health form.
                </>
              }
            />
            <Item {...props} label='1 x Daypack' optional />
            <Item {...props} label='1 x Gaiters' optional />
            <Item {...props} label='1 x Map' optional />
            <Item {...props} label='1 x Toilet paper' optional />
            <Item {...props} label='1 x Chemical warmers' optional />
            <Item {...props} label='1 x Pocket knife/multitool' optional />
            <Item {...props} label='1 x Lighter/matches' optional />
            <Item {...props} label='1 x Glide wax' optional />
            <Item {...props} label='1 x Ski helmet' optional />
            <Item {...props} label='1 x PLB' optional />
            <Item {...props} label='1 x UHF radio (group)' optional />
            <Item {...props} label='1 x Ski repair kit (group)' optional />
          </li>
        </ul>
        <h2 className='text-2xl my-4' id='chalet'>
          Chalet
        </h2>
        <p className='max-w-md mb-4 italic'>For using at the Chalet.</p>
        <ul className='max-w-md mb-4'>
          <li>
            <Item {...props} label='1 x Single mattress fitted sheet' info='This is mandatory for hygene reasons.' />
            <Item {...props} label='1 x Pillowcase' />
            <Item {...props} label='1 x Sleeping bag' />
            <Item {...props} label='1 x Pyjamas' />
            <Item {...props} label='1 x Scout uniform' />
            <Item {...props} label='1 x Closed toed shoes' />
            <Item {...props} label='3 x Underwear/bra' />
            <Item {...props} label='1 x Hike towel' />
            <Item {...props} label='1 x Travel soap' />
            <Item {...props} label='1 x Deodorant' />
            <Item {...props} label='1 x Toothbrush + toothpaste' />
            <Item {...props} label='7 x Period items (if you menstruate)' />
            <Item {...props} label='Space for communal food (2-3kg)' />
            <Item {...props} label='1 x Inner sheet' optional />
            <Item {...props} label='1 x Indoor t-shirt' optional />
            <Item {...props} label='1 x Indoor pants' optional />
            <Item
              {...props}
              label='1 x Eyemask'
              optional
              info='We sleep in a communal area, so others may turn the lights on at random times.'
            />
            <Item {...props} label='1 x Shower thongs' optional />
            <Item {...props} label='1 x Shampoo/conditioner (50ml)' optional />
            <Item {...props} label='1 x Shower cap' optional />
            <Item {...props} label='1 x Moisturiser (30ml)' optional />
            <Item {...props} label='3 x Hair ties' optional />
            <Item {...props} label='1 x Snaplock bag to contain toiletries' optional />
            <Item {...props} label='1 x USB phone charger cord' optional />
            <Item {...props} label='1 x Ear plugs' optional info='People snore - do yourself a favour!' />
            <Item
              {...props}
              label='Cash for merchandise'
              optional
              info="Please bring small denomination notes to purchase any merchandise you'd like."
            />
            <Item {...props} label='Party night accessories (lightweight)' optional />
            <Item {...props} label='1kg MAX Over 18s only (incl. packaging)' optional />
          </li>
        </ul>
        <h2 className='text-2xl my-4' id='chalet'>
          Friday night
        </h2>
        <p className='max-w-md mb-4 italic'>For Friday night at the Scout Hall — to be left in the car at Mt Beauty</p>
        <ul className='max-w-md mb-4'>
          <li>
            <Item {...props} label='1 x Breakfast for Saturday' />
            <Item {...props} label='1 x Sleeping mat' />
            <Item {...props} label='1 x Pillow' optional />
            <Item {...props} label='1 x Extra sleeping bag' optional />
            <Item {...props} label='1 x Spare clothes' optional />
            <Item {...props} label='1 x Spare torch' optional />
            <Item {...props} label='1 x Bag' optional />
          </li>
        </ul>
      </div>
    </Wrapper>
  )
}
const YEAR = 2024

function Item({ label, resetStorageEventEmitter, info, optional }) {
  const [checked, setChecked, removeValue] = useLocalStorage(`${YEAR}-${label}`, false)
  useEffect(() => {
    resetStorageEventEmitter.on('resetStorage', removeValue)
    return () => resetStorageEventEmitter.removeListener('resetStorage', removeValue)
  }, [removeValue, resetStorageEventEmitter])

  label = useMemo(
    () =>
      optional ? (
        <Tooltip title={<span className='text-lg'>Optional item.</span>} arrow>
          <span className='italic'>{label}</span>
        </Tooltip>
      ) : (
        label
      ),
    [optional, label]
  )

  const { value, setTrue, setFalse, toggle } = useBoolean(false)
  const toggleRef = useRef()
  useClickAnyWhere((e) => toggleRef.current.contains(e.target) || setFalse())

  return (
    <div>
      <span
        ref={toggleRef}
        onTouchStart={() => toggle()}
        onMouseEnter={() => setTrue()}
        onMouseLeave={() => setFalse()}
        className={classnames(info ? '' : 'invisible', 'mr-1', 'cursor-pointer', '-ml-7')}
      >
        <Tooltip title={<div className='text-lg'>{info}</div>} arrow open={value}>
          <InfoOutlinedIcon />
        </Tooltip>
      </span>
      <FormControlLabel control={<Checkbox onChange={() => setChecked(!checked)} {...{ checked }} />} {...{ label }} />
    </div>
  )
}
