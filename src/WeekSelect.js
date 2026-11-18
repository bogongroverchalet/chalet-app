import React from 'react'
import winterWeeks from './winter-weeks.yaml'
import { SUMMER_EVENTS, saveSelectedWeek } from './nobs-week'

// Week picker shared by the NOBs report forms.
export default function WeekSelect({ value, onChange }) {
  return (
    <select
      id='week-select'
      className='no-print border-b border-slate-500 bg-transparent py-0.5 max-w-full'
      value={value}
      onChange={(e) => {
        saveSelectedWeek(e.target.value)
        onChange(e.target.value)
      }}
    >
      <optgroup label={`Winter ${winterWeeks.year}`}>
        {winterWeeks.weeks.map((w) => (
          <option key={w.name} value={w.name}>
            {w.name} ({w.dates})
          </option>
        ))}
      </optgroup>
      <optgroup label='Summer'>
        {SUMMER_EVENTS.map((name) => (
          <option key={name}>{name}</option>
        ))}
      </optgroup>
    </select>
  )
}
