import React from 'react'
import { Link } from 'react-router-dom'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'

export default function SafetyRopeTowLeader() {
  return (
    <div className='p-4 max-w-2xl mx-auto pb-16'>
      <h1 className='text-3xl my-4 -indent-12 max-sm:pl-10'>
        <Link to='..' relative='path'>
          <ChevronLeftIcon sx={{ fontSize: 40, position: 'relative', top: -3 }} />
          Rope tow tow leader info pack
        </Link>
      </h1>

      <p className='mb-3'>
        This list is a guide only and is not exhaustive. Delegation is critical for a Tow Leader — ask questions if
        unsure.
      </p>

      <h2 className='text-xl font-bold mt-6 mb-2'>Tow Leader overview</h2>
      <p className='mb-3'>
        In cases where there are sufficient trained people, every non-Venturer Winter Party has a single Tow Leader to
        ensure compliance with the Rope Tow standards. This is not an additional NOBS position, rather a separate role.
        In some circumstances a Tow Leader may also be a NOB.
      </p>
      <p className='mb-3'>
        If your Winter Party does not have a nominated Tow Leader, the Rover Chalet Rope Tow <strong>must not</strong>{' '}
        be used.
      </p>
      <p className='mb-3'>
        The Tow Leader utilises the experience of their party, designating Tow Operators and Tow Supervisors from those
        in their party each day/pre-determined period.
      </p>
      <p className='mb-3'>
        All Tow Operators may provisionally upskill competent party members, as long as they meet requirements as
        outlined in the BRC Rope Tow Training Program document.
      </p>
      <p className='mb-3'>Running of the tow is subject to snow conditions and trained personnel.</p>

      <h2 className='text-xl font-bold mt-6 mb-2'>Prior to your week</h2>
      <ol className='list-decimal ml-6 mb-3 space-y-1'>
        <li>Attend the Tow Leaders &amp; Tow Operators Briefing (or watch the recording).</li>
        <li>
          You will be sent a list of party members and their current training level, as well as each participant's
          self-identified level as noted during their booking process.
        </li>
        <li>Rewatch the "how to use the nutcracker video".</li>
        <li>
          Read:
          <ul className='list-[circle] ml-6 mt-1 space-y-1'>
            <li>BRC Rope Tow Activity Plan</li>
            <li>BRC Tow Leader Info Pack</li>
            <li>BRC Rope Tow Training Program</li>
            <li>BRC Rope Tow SOPs</li>
          </ul>
        </li>
      </ol>

      <h2 className='text-xl font-bold mt-6 mb-2'>Location of documentation</h2>
      <p className='mb-3'>
        Available online at{' '}
        <a href='https://tinyurl.com/BRCRiskAssessmentsETC' className='underline'>
          https://tinyurl.com/BRCRiskAssessmentsETC
        </a>{' '}
        (under Safety Guidelines, Risk Assessments &amp; Activity Plans).
      </p>
      <p className='mb-3'>
        Available at the Chalet in two labelled folders — one at the tow hut, the other underneath the phone in the
        dining room.
      </p>

      <h2 className='text-xl font-bold mt-6 mb-2'>Requirements prior to first use of the tow for the week</h2>

      <h3 className='text-lg font-semibold mt-4 mb-1'>A. Tow Briefing for all participants</h3>
      <p className='mb-3'>
        Prior to the first operation of the BRC Rope Tow, the Tow Briefing must be done with the whole party present. It
        is recommended that this be done after morning duties. This briefing can be done by the Tow Leader with the
        support of Trained Tow Operators. The Tow Leader must ensure that this gets completed in its entirety.
      </p>
      <p className='mb-3'>
        The briefing is accessible from either the Rope Tow folder in the Chalet or in the Tow Hut, in the document
        titled "BRC Rope Tow Training Program". It covers points including but not limited to: safety, critical
        technical nuances, training, and roles of participants in Rope Tow operations.
      </p>
      <p className='mb-3'>
        The Tow Training Hierarchy changed in 2026 — please take time to review the BRC Rope Tow Training Program
        document.
      </p>

      <h3 className='text-lg font-semibold mt-4 mb-1'>B. Safety &amp; maintenance</h3>
      <p className='mb-3'>
        Tow Leaders designate responsibility to Designated Tow Operators each day/operating period, who hold
        responsibility for safety and integrity checks as well as operational requirements. The BRC Wardens team must be
        consulted when uncertainty exists. The BCMG must be informed of any issues in BRC Rope Tow systems, procedures
        and incidents.
      </p>
      <p className='mb-3'>
        The Tow Leader is accountable for ensuring that Designated Tow Operators and Designated Tow Supervisors are
        rotated frequently so everyone gets a fair go skiing the rope tow.
      </p>
      <p className='mb-3'>
        Use the "BRC Rope Tow Logbook" to record daily, weekly and end-of-week safety checks. One sheet per week. Found
        in the folder in the Tow Hut.
      </p>

      <h3 className='text-lg font-semibold mt-4 mb-1'>Prior to first use for the week</h3>
      <ul className='list-disc ml-6 mb-3 space-y-1'>
        <li>Film a full rotation of the rope (if it's the first or last use of the season).</li>
        <li>
          Ensure orange conduit is out at the road to safely mark the location of the rope, and other slope hazards also
          marked with conduit as appropriate.
        </li>
        <li>
          Ensure that the legislative signage is displayed in their allocated locations as described in the BRC Rope Tow
          SOPs.
        </li>
        <li>
          Check the rope for any obvious signs of breakage, damage or significant wear. If any compromising signs are
          found, take photos and send them to the Chief Warden asap — do not use the tow until advised otherwise.
        </li>
        <li>Find all required signage in the pink ski bag located in the workshop.</li>
        <li>
          At the bottom "Creek Loading Point":
          <ul className='list-[circle] ml-6 mt-1 space-y-1'>
            <li>
              Loading signage ("remove your poles from your wrists", "secure loose items", "if unfamiliar ask for
              assistance with loading")
            </li>
          </ul>
        </li>
        <li>
          At the road "Road Loading Point":
          <ul className='list-[circle] ml-6 mt-1 space-y-1'>
            <li>Place the star picket wrapped in the pink pool noodle just below the road</li>
            <li>Attach the e-stop to the pink pool noodle</li>
            <li>
              Place the loading signage ("remove your poles from your wrists") facing uphill so people loading the tow
              can read it prior to loading
            </li>
            <li>
              Place the unloading signage ("unload to your left") facing downhill so people using the tow can read it
              prior to unloading
            </li>
          </ul>
        </li>
        <li>
          At the top "Safety Gate":
          <ul className='list-[circle] ml-6 mt-1 space-y-1'>
            <li>
              Set up e-stop by connecting the cord across the two points so that it will trigger the stop should someone
              ski through it
            </li>
            <li>
              Place the unloading signage ("unload to your left") facing downhill so people using the tow can read it
              prior to unloading. Unloading is only available to the left.
            </li>
          </ul>
        </li>
      </ul>

      <h3 className='text-lg font-semibold mt-4 mb-1'>Daily safety checks</h3>
      <p className='mb-3'>
        For every day the tow operates, safety checks must be done prior to first use of the day. Procedures are found
        in the BRC Rope Tow SOPs document at the Tow Hut. Remember to fill out the weekly log sheet for each day the tow
        is used.
      </p>

      <h2 className='text-xl font-bold mt-6 mb-2'>Logging competencies</h2>
      <p className='mb-3'>
        Whenever the tow is in use, Tow Leaders and Operators watch participants and record each party member's ability
        to use the tow. Competency categories are:
      </p>
      <ul className='list-disc ml-6 mb-3 space-y-1'>
        <li>
          <strong>Trained Tow User</strong> — Can competently load and unload. Does not fall off the tow regularly.
        </li>
        <li>
          <strong>Tow Supervisor</strong> — Can competently mentor and supervise participants loading onto the tow and
          capably operate e-stops. Can assist the Tow Leader with assessing participant competence.
        </li>
        <li>
          <strong>Tow Operator</strong> — Can competently set up the tow including top safety gate, loading stations and
          safety checks. Can conduct the rope tow safety briefing.
        </li>
      </ul>
      <p className='mb-3'>
        If in doubt when assessing competencies, consult the other Tow Operators on your Winter Party. If still not
        sure, you're welcome to film a video of participants mounting, riding and dismounting the tow to send to Bogong
        Bookings at the conclusion of your party.
      </p>

      <h2 className='text-xl font-bold mt-6 mb-2'>End of week</h2>
      <ol className='list-disc ml-6 mb-3 space-y-1'>
        <li>
          Complete the list of participants on the Tow Leader report with the competency level the Tow Leader and Tow
          Supervisor team believes is appropriate for each person. Give your Tow Leader Report to your Party Leader to
          send through to the Wardens Team.
        </li>
        <li>
          Take a photo of your report and email it to bookings within 48 hours of your winter party concluding (set a
          calendar reminder).
        </li>
        <li>Ensure the Tow Hut is locked and all signage and external items have been put away.</li>
        <li>Ensure the Tow Hut logbook has been filled out.</li>
      </ol>

      <h2 className='text-xl font-bold mt-6 mb-2'>End of season (rope comes in)</h2>
      <ol className='list-decimal ml-6 mb-3 space-y-1'>
        <li>Take recording of the rope full rotation before packup.</li>
        <li>Bring the rope in (the Wardens team will advise you if this is needed).</li>
        <li>Check the motor to flag any maintenance issues.</li>
      </ol>

      <h2 className='text-xl font-bold mt-6 mb-2'>Pro tips for Tow Operators</h2>
      <ul className='list-disc ml-6 mb-3 space-y-1'>
        <li>Testing of emergency stops can and should occur prior to engine start.</li>
        <li>Pink tools are tow tools.</li>
        <li>Log any problems, issues or other things to note in the logbooks provided.</li>
        <li>
          Only carry out repairs to the motor and drivetrain if given explicit permission by the BCMG maintenance
          team/Wardens. If the tow system malfunctions, contact the BCMG maintenance team for the next steps.
        </li>
      </ul>

      <h2 className='text-xl font-bold mt-6 mb-2'>After your week</h2>
      <p className='mb-3'>
        Submit your competency reports to the Party Leader who will submit them alongside the NOBS reports. Please
        ensure you have both submitted your paper report to your Party Leader and emailed a photo of your report to
        bookings within 48 hours of the conclusion of your winter week.
      </p>
      <p className='mb-3'>
        If you are required to send through the full rotation video (first operating week of season), BCMG will contact
        you. You are only required to store the video for 30 days.
      </p>

      <h2 className='text-xl font-bold mt-6 mb-2'>Frequently asked questions</h2>
      <p className='mb-3'>
        <strong>Can snowboarders use the tow?</strong> Yes, they're welcome to try.
      </p>
      <p className='mb-3'>
        <strong>Why do we film the rope?</strong> To monitor rope health.
      </p>
      <p className='mb-3'>
        <strong>Can anyone use the tow?</strong> No, only participants of that winter week.
      </p>
      <p className='mb-3'>
        <strong>Can I use the tow on my own?</strong> Yes, provided all skiing is within the green and blue zones marked
        on the map, and a Tow Supervisor is in place on each loading and unloading point. When skiing on the Fringe
        Terrain (marked in red) or the unbounded area (marked clear), a minimum of 4 tow skiers must be adhered to, and
        Fringe Terrain skiers must observe the buddy system.
      </p>
      <p className='mb-3'>
        <strong>
          If an individual participant doesn't want to ride the tow, do they still have to attend the briefing?
        </strong>{' '}
        Yes.
      </p>
    </div>
  )
}
