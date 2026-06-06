import React from 'react'
import { Link } from 'react-router-dom'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'

export default function SafetyChildSafe() {
  return (
    <div className='p-4 max-w-2xl mx-auto pb-16'>
      <h1 className='text-3xl my-4 -indent-12 max-sm:pl-10'>
        <Link to='..' relative='path'>
          <ChevronLeftIcon sx={{ fontSize: 40, position: 'relative', top: -3 }} />
          Child safe policy
        </Link>
      </h1>

      <p className='mb-3'>
        The BCMG adheres to all Child Safe policies as set out by Scouts Victoria. This set of guidelines does not
        override any Scouts Victoria policy, rather this aims to highlight key matters that arise from the Child Safe
        policies in a Chalet context.
      </p>

      <h2 className='text-xl font-bold mt-6 mb-2'>Child Safety Line</h2>
      <p className='mb-3'>
        The Child Safe number (<strong>1800 870 772</strong>) must be called if immediate assistance or support is
        required on any of the following:
      </p>
      <ul className='list-disc ml-6 mb-3 space-y-1'>
        <li>
          If you form a reasonable belief that a young person could be at risk of harm or you have concerns for their
          safety or well-being. This could be for many reasons, including mental health or family violence.
        </li>
        <li>
          If someone discloses sexual, physical, psychological or emotional harm or neglect towards a young person. This
          includes any disclosures from young people in regard to harm towards themselves.
        </li>
        <li>If you have observed harmful behaviour towards a young person or seen suspected signs of abuse.</li>
        <li>You have observed a young person participate in harmful behaviour towards themselves or someone else.</li>
        <li>
          You have an incident that is continuing to escalate beyond local resource capacity or urgent assistance by
          Scouts Victoria is required.
        </li>
      </ul>

      <h2 className='text-xl font-bold mt-6 mb-2'>Child Safety Reporting Form</h2>
      <p className='mb-3'>The Child Safety reporting form must be filled out within 24 hours for:</p>
      <ul className='list-disc ml-6 mb-3 space-y-1'>
        <li>An incident that meets the criteria for calling the Child Safety Line (in addition to the call).</li>
        <li>An incident involving the inappropriate or negative behaviour of an adult towards a child.</li>
        <li>An incident that is a category 4 behaviour from their Code of Conduct.</li>
        <li>An incident that you are not sure if you should report or not.</li>
      </ul>
      <p className='mb-3'>
        Due to limited reception at the Chalet, it is suggested that a Warden be contacted to fill out the report whilst
        on the phone to the Chalet.
      </p>

      <h2 className='text-xl font-bold mt-6 mb-2'>Category 4 behaviours</h2>
      <p className='mb-3'>
        Category 4 behaviours are never acceptable (behaviour from youth members that is unacceptable at any time, and
        will be managed by the Scouts Victoria Child Safety Team). Examples include anything that makes someone feel
        unsafe such as racism, homophobia, persistent unwanted behaviour, stalking, bullying, cyberbullying, harassment,
        sexting, sexual harassment, sexual assault, harmful sexual behaviour, violence, lack of consent, sexual
        innuendo, intimidation, threats, having or sharing inappropriate material on devices, persisting with
        disputes/grudges after an incident has been addressed.
      </p>

      <h2 className='text-xl font-bold mt-6 mb-2'>Working With Children checks</h2>
      <p className='mb-3'>
        For all overnight BCMG events where a child is present, the BCMG will verify that all over 18s hold current
        Working With Children checks (or equivalent), no more than 48 hours from the start of the event.
      </p>

      <h2 className='text-xl font-bold mt-6 mb-2'>Briefing requirement</h2>
      <p className='mb-3'>
        At any event where a child is present, a briefing will be had to remind everyone of adhering to Scouts
        Victoria's policies (i.e. 2 deep).
      </p>
    </div>
  )
}
