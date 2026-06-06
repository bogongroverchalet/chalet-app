import React from 'react'
import Wrapper from './Wrapper'
import { Link } from 'react-router-dom'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import registry from './pdfRegistry'

function PdfLink({ slug }) {
  const { title } = registry[slug]
  return (
    <li className='mb-4'>
      <Link to={`/pdf/${slug}`} className='flex items-center'>
        {title} <ChevronRightIcon className='ml-1' fontSize='large' />
      </Link>
    </li>
  )
}

function PageLink({ to, title }) {
  return (
    <li className='mb-4'>
      <Link to={to} className='flex items-center'>
        {title} <ChevronRightIcon className='ml-1' fontSize='large' />
      </Link>
    </li>
  )
}

function Section({ title, children }) {
  return (
    <section className='mt-8'>
      <h2 className='text-2xl font-bold border-b-2 border-gray-200 pb-2 mb-3'>{title}</h2>
      <ul className='text-2xl'>{children}</ul>
    </section>
  )
}

function SubSection({ title, children }) {
  return (
    <div className='mt-5'>
      <h3 className='text-lg font-semibold text-gray-500 uppercase tracking-wide mb-2'>{title}</h3>
      <ul className='text-2xl'>{children}</ul>
    </div>
  )
}

export default function Safety() {
  return (
    <Wrapper>
      <h1 className='text-3xl my-4 -indent-12 max-sm:pl-10'>
        <Link to='..' relative='path'>
          <ChevronLeftIcon sx={{ fontSize: 40, position: 'relative', top: -3 }} />
          Safety docs &amp; activity plans
        </Link>
      </h1>
      <p className='italic'>These are current as of 2026.</p>

      <Section title='Policies'>
        <PdfLink slug='safety-cover' />
        <PdfLink slug='safety-alcohol-drugs' />
        <PageLink to='child-safe' title='Child safe policy' />
        <PdfLink slug='safety-child-safeguarding' />
        <PdfLink slug='safety-vehicles' />
        <PageLink to='sun-protection' title='Sun protection policy' />
        <PageLink to='ventolin-epipen' title='Ventolin &amp; EpiPen policy' />
      </Section>

      <Section title='Guidelines'>
        <PageLink to='evacuated-participant' title='Evacuated participant guidelines' />
        <PageLink to='first-aiders' title='First aiders guidelines' />
        <PageLink to='footwear' title='Footwear guidelines' />
        <PageLink to='hearing' title='Hearing safety guidelines' />
        <PageLink to='helmet' title='Helmet guidelines' />
        <PageLink to='igloo' title='Igloo sleepover guidelines' />
        <PageLink to='late-missing' title='Late &amp; missing persons guidelines' />
        <PageLink to='off-mountain' title='Off-mountain contact guidelines' />
        <PageLink to='medical-refusal' title='Medical refusal guidelines' />
        <PageLink to='incident-reporting' title='Incident reporting guidelines' />
        <PageLink to='sled' title='Sled guidelines' />
        <PageLink to='wood-chopping' title='Wood chopping guidelines' />
      </Section>

      <section className='mt-8'>
        <h2 className='text-2xl font-bold border-b-2 border-gray-200 pb-2 mb-3'>
          Activity plans &amp; risk assessments
        </h2>
        <SubSection title='Inbound & outbound'>
          <PdfLink slug='safety-inbound-outbound-plan' />
          <PdfLink slug='safety-inbound-outbound-ra' />
        </SubSection>
        <SubSection title='Rope tow'>
          <PdfLink slug='safety-rope-tow-plan' />
          <PageLink to='rope-tow-notice' title='Rope tow notice to users' />
          <PageLink to='rope-tow-training' title='Rope tow training program' />
          <PageLink to='rope-tow-leader' title='Rope tow leader info pack' />
          <PdfLink slug='safety-rope-tow-operators' />
          <PdfLink slug='safety-rope-tow-ra' />
        </SubSection>
        <SubSection title='Ski school'>
          <PdfLink slug='safety-ski-school' />
        </SubSection>
        <SubSection title='Snow camping'>
          <PdfLink slug='safety-snow-camping-plan' />
          <PdfLink slug='safety-snow-camping-ra' />
        </SubSection>
      </section>
    </Wrapper>
  )
}
