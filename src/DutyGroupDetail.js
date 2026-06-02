import React, { useEffect, useRef } from 'react'
import Wrapper from './Wrapper'
import { Link, useParams, Navigate } from 'react-router-dom'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import EventEmitter from 'events'
import { useLocalStorage, useUnmount } from 'usehooks-ts'
import _ from 'lodash'
import data from './duty-groups.yaml'

const YEAR = 2026

function DutySubItem({ label, namespace, parentLabel, resetStorageEventEmitter }) {
  const storageKey = `${YEAR}-duty-${namespace}-${parentLabel}-${label}`
  const [checked, setChecked, removeValue] = useLocalStorage(storageKey, false)

  useEffect(() => {
    resetStorageEventEmitter.on('resetStorage', removeValue)
    return () => resetStorageEventEmitter.removeListener('resetStorage', removeValue)
  }, [removeValue, resetStorageEventEmitter])

  return (
    <li>
      <FormControlLabel
        control={<Checkbox size='small' onChange={() => setChecked(!checked)} checked={checked} />}
        label={<span className='text-sm'>{label}</span>}
      />
    </li>
  )
}

function DutyItem({ label, notes, subitems, namespace, resetStorageEventEmitter }) {
  const storageKey = `${YEAR}-duty-${namespace}-${label}`
  const [checked, setChecked, removeValue] = useLocalStorage(storageKey, false)

  useEffect(() => {
    resetStorageEventEmitter.on('resetStorage', removeValue)
    return () => resetStorageEventEmitter.removeListener('resetStorage', removeValue)
  }, [removeValue, resetStorageEventEmitter])

  return (
    <li className='mb-1'>
      <FormControlLabel control={<Checkbox onChange={() => setChecked(!checked)} checked={checked} />} label={label} />
      {notes && notes.length > 0 && (
        <ul className='list-disc ml-14 mb-1 text-sm text-gray-600'>
          {notes.map((note, i) => (
            <li key={i}>{note}</li>
          ))}
        </ul>
      )}
      {subitems && subitems.length > 0 && (
        <ul className='ml-8 mb-1'>
          {subitems.map((sub, i) => (
            <DutySubItem
              key={i}
              label={sub}
              parentLabel={label}
              namespace={namespace}
              resetStorageEventEmitter={resetStorageEventEmitter}
            />
          ))}
        </ul>
      )}
    </li>
  )
}

function DutyDontItem({ label }) {
  return (
    <li className='mb-1'>
      <FormControlLabel className='!cursor-not-allowed' control={<span className='p-[9px]'>❌</span>} label={label} />
    </li>
  )
}

function DutyRuleItem({ label, notes }) {
  return (
    <li className='mb-1'>
      <FormControlLabel
        className='!cursor-default'
        control={<span className='p-[9px] text-gray-400 select-none'>▸</span>}
        label={label}
      />
      {notes && notes.length > 0 && (
        <ul className='list-disc ml-14 mb-1 text-sm text-gray-600'>
          {notes.map((note, i) => (
            <li key={i}>{note}</li>
          ))}
        </ul>
      )}
    </li>
  )
}

function DutyNoteItem({ label }) {
  return <li className='mb-1 ml-2 list-disc'>{label}</li>
}

export default function DutyGroupDetail() {
  const { slug } = useParams()
  const group = data.groups.find((g) => g.slug === slug)

  const resetEmitter = useRef(_.tap(new EventEmitter(), (e) => e.setMaxListeners(200)))
  useUnmount(() => resetEmitter.current.removeAllListeners())

  if (!group) return <Navigate to='/chores' replace />

  const groupIndex = data.groups.findIndex((g) => g.slug === slug)
  const prevGroup = data.groups[groupIndex - 1]
  const nextGroup = data.groups[groupIndex + 1]

  const resetList = () => {
    if (!window.confirm(`Reset all checkboxes for ${group.name}?`)) return
    resetEmitter.current.emit('resetStorage')
  }

  const itemProps = { namespace: slug, resetStorageEventEmitter: resetEmitter.current }

  return (
    <Wrapper>
      <h1 className='text-3xl my-4 -indent-12 max-sm:pl-10'>
        <Link to='..' relative='path'>
          <ChevronLeftIcon sx={{ fontSize: 40, position: 'relative', top: -3 }} />
          {group.name}
        </Link>
      </h1>

      {group.note && <p className='max-w-lg mb-4 italic text-gray-600'>{group.note}</p>}

      <div className='mb-4'>
        <Button variant='outlined' onClick={resetList}>
          Reset list
        </Button>
      </div>

      {group.sections.map((section, si) => (
        <div key={si} className='mb-6 max-w-lg'>
          {section.title && <h2 className='text-xl font-semibold mb-2 mt-4'>{section.title}</h2>}
          <ul>
            {section.items.map((item, ii) => {
              if (item.check !== undefined)
                return (
                  <DutyItem key={ii} label={item.check} notes={item.notes} subitems={item.subitems} {...itemProps} />
                )
              if (item.rule !== undefined) return <DutyRuleItem key={ii} label={item.rule} notes={item.notes} />
              if (item.dont !== undefined) return <DutyDontItem key={ii} label={item.dont} />
              if (item.note !== undefined) return <DutyNoteItem key={ii} label={item.note} />
              return null
            })}
          </ul>
        </div>
      ))}

      <p className='text-gray-500 italic mt-2'>If in doubt, ask any NOB or experienced party member</p>

      <div className='flex justify-between mt-8 text-xl border-t border-gray-300 pt-4 max-w-lg'>
        {prevGroup ? (
          <Link to={`../${prevGroup.slug}`} relative='path' className='flex items-center'>
            <ChevronLeftIcon fontSize='large' />
            {prevGroup.name}
          </Link>
        ) : (
          <span />
        )}
        {nextGroup ? (
          <Link to={`../${nextGroup.slug}`} relative='path' className='flex items-center'>
            {nextGroup.name}
            <ChevronRightIcon fontSize='large' />
          </Link>
        ) : (
          <span />
        )}
      </div>
    </Wrapper>
  )
}
