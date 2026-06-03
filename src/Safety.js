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

      <Section title='Policies'>
        <PdfLink slug='safety-cover' />
        <PdfLink slug='safety-alcohol-drugs' />
        <PdfLink slug='safety-child-safe' />
        <PdfLink slug='safety-child-safeguarding' />
        <PdfLink slug='safety-vehicles' />
        <PdfLink slug='safety-sun-protection' />
        <PdfLink slug='safety-ventolin-epipen' />
      </Section>

      <Section title='Guidelines'>
        <PdfLink slug='safety-evacuated-participant' />
        <PdfLink slug='safety-first-aiders' />
        <PdfLink slug='safety-footwear' />
        <PdfLink slug='safety-hearing' />
        <PdfLink slug='safety-helmet' />
        <PdfLink slug='safety-igloo' />
        <PdfLink slug='safety-late-missing' />
        <PdfLink slug='safety-off-mountain' />
        <PdfLink slug='safety-medical-refusal' />
        <PdfLink slug='safety-incident-reporting' />
        <PdfLink slug='safety-sled' />
        <PdfLink slug='safety-wood-chopping' />
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
          <PdfLink slug='safety-rope-tow-notice' />
          <PdfLink slug='safety-rope-tow-training' />
          <PdfLink slug='safety-rope-tow-leader' />
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
