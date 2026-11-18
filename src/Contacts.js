import React from 'react'
import Wrapper from './Wrapper'
import { Link } from 'react-router-dom'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import data from './contacts.yaml'

export default function Contacts() {
  return (
    <Wrapper>
      <h1 className='text-3xl my-4 -indent-12 max-sm:pl-10'>
        <Link to='..' relative='path'>
          <ChevronLeftIcon sx={{ fontSize: 40, position: 'relative', top: -3 }} />
          Contacts
        </Link>
      </h1>
      <ul className='max-w-lg mb-6 italic'>
        {data.intro.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
      {data.groups.map((group) => (
        <section key={group.title} className='mb-6 max-w-lg'>
          <h2 className='text-xl font-bold mb-2'>{group.title}</h2>
          <ul>
            {group.contacts.map((c) => (
              <li key={c.role} className='flex justify-between gap-4 py-1 border-b'>
                <span>
                  {c.role}
                  {c.name && <span className='block text-sm opacity-75'>{c.name}</span>}
                </span>
                <a href={`tel:${c.phone.replace(/[^\d+]/g, '')}`} className='whitespace-nowrap underline'>
                  {c.phone}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
      <p className='max-w-lg'>
        What3words for the Chalet:{' '}
        <a href='https://what3words.com/clanking.advisable.bamboo'>{'///clanking.advisable.bamboo'}</a>
      </p>
    </Wrapper>
  )
}
