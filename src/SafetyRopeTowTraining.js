import React from 'react'
import { Link } from 'react-router-dom'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'

export default function SafetyRopeTowTraining() {
  return (
    <div className='p-4 max-w-2xl mx-auto pb-16'>
      <h1 className='text-3xl my-4 -indent-12 max-sm:pl-10'>
        <Link to='..' relative='path'>
          <ChevronLeftIcon sx={{ fontSize: 40, position: 'relative', top: -3 }} />
          Rope tow training program
        </Link>
      </h1>

      <h2 className='text-xl font-bold mt-6 mb-2'>Training levels &amp; responsibilities</h2>

      <h3 className='text-lg font-semibold mt-4 mb-1'>Tow Operator</h3>
      <ul className='list-disc ml-6 mb-3 space-y-1'>
        <li>
          Responsible for completing start of week, start of day, end of day and end of week safety and operating
          checks.
        </li>
        <li>
          Responsible for ensuring compliance with BRC documentation, and national compliance with Rope Tow regulations
          and laws.
        </li>
        <li>Authorised to start the tow engine.</li>
        <li>Can carry out the responsibilities of the Tow Supervisor and Tow Trained User.</li>
        <li>Delivers the Tow and Tow Supervisor Training Briefs.</li>
        <li>
          Can hold the position of Tow Leader on a winter week, and is then subsequently authorised to provisionally
          train and promote Tow Operators.
        </li>
      </ul>

      <h3 className='text-lg font-semibold mt-4 mb-1'>Tow Supervisor</h3>
      <ul className='list-disc ml-6 mb-3 space-y-1'>
        <li>Delivers the Tow Supervisor Training Briefing to upskill Tow Trained Users.</li>
        <li>
          Monitors the Tow Line for any hazards and incidents, reports and activates the emergency stop if necessary.
        </li>
        <li>Coordinates first aid responses as required.</li>
        <li>Can carry out the duties of the Tow Trained User.</li>
        <li>Mentors novice users in loading, safely riding and disembarking from tow rope.</li>
        <li>Supervises loading and unloading points.</li>
      </ul>

      <h3 className='text-lg font-semibold mt-4 mb-1'>Tow Trained User</h3>
      <ul className='list-disc ml-6 mb-3 space-y-1'>
        <li>Uses the rope tow in a safe manner.</li>
        <li>Reports safety hazards and damage if sighted.</li>
        <li>Activates emergency stop systems if required.</li>
        <li>Can safely use a Nutcracker Lift Belt.</li>
      </ul>

      <h2 className='text-xl font-bold mt-6 mb-2'>Practical positions on Winter Weeks</h2>

      <h3 className='text-lg font-semibold mt-4 mb-1'>Tow Leader</h3>
      <ul className='list-disc ml-6 mb-3 space-y-1'>
        <li>Designated by the BCMG prior to the winter party's commencement.</li>
        <li>
          Nominates the remaining practical positions from appropriately trained personnel, or delivers the training
          required to ensure all practical positions are filled.
        </li>
        <li>Completes the BRC Tow Leader Winter Week report.</li>
        <li>Ensures the BRC Rope Tow Logbook is completed by the Designated Tow Operator each operating day.</li>
        <li>Must hold Tow Operator accreditation.</li>
        <li>
          Typically delivers the Tow Brief (responsible for its completion in its entirety), alongside other Tow
          Operators.
        </li>
        <li>
          Can upskill Tow Supervisors to Tow Operators provisionally by providing the Tow Operator Briefing and
          subsequent physical training.
        </li>
      </ul>

      <h3 className='text-lg font-semibold mt-4 mb-1'>Designated Tow Operator</h3>
      <ul className='list-disc ml-6 mb-3 space-y-1'>
        <li>
          Performs the duties of the Tow Operator for the period specified verbally by the Tow Leader and other
          operators.
        </li>
        <li>Completes the BRC Rope Tow Logbook for the period they are the Tow Operator if required.</li>
        <li>Carries a radio.</li>
      </ul>

      <h3 className='text-lg font-semibold mt-4 mb-1'>Designated Tow Supervisors</h3>
      <ul className='list-disc ml-6 mb-3 space-y-1'>
        <li>One remains at each operational loading or unloading point, monitoring the slope for safety incidents.</li>
        <li>Mentors novice users in loading, safely riding and disembarking from tow rope.</li>
        <li>
          Assesses Tow Users and nominates them as Trained Tow Users when they have mastered trained tow user
          competence.
        </li>
        <li>Activates the emergency stop system if required.</li>
        <li>Carries a radio.</li>
      </ul>

      <h3 className='text-lg font-semibold mt-4 mb-1'>Trained Users</h3>
      <ul className='list-disc ml-6 mb-3 space-y-1'>
        <li>Ski the rope tow in a safe manner.</li>
        <li>Can competently load and unload.</li>
        <li>Does not fall off the tow regularly.</li>
      </ul>

      <h2 className='text-xl font-bold mt-6 mb-2'>Training requirements for transition</h2>

      <h3 className='text-lg font-semibold mt-4 mb-1'>Tow Operator</h3>
      <ul className='list-disc ml-6 mb-3 space-y-1'>
        <li>Be a winter party member at the BRC.</li>
        <li>Has physically demonstrated competence and understanding of systems and procedures.</li>
        <li>Has read the Tow Operator Training Brief.</li>
        <li>Currently holds the Tow Supervisor training level.</li>
        <li>
          Be endorsed by the Tow Leader and approved by the BRC Warden (may be provisionally appointed by the Tow
          Leader).
        </li>
        <li>Must be 18 years old.</li>
      </ul>

      <h3 className='text-lg font-semibold mt-4 mb-1'>Tow Supervisor</h3>
      <ul className='list-disc ml-6 mb-3 space-y-1'>
        <li>Be a winter party member at the BRC.</li>
        <li>Has physically demonstrated competence and understanding of safety procedures.</li>
        <li>Has read the Tow Supervisor Training Brief.</li>
        <li>Currently holds the Tow Trained User training level.</li>
        <li>Be endorsed by a Tow Supervisor.</li>
        <li>Must be 18 years old.</li>
        <li>Must be a competent skier/snowboarder.</li>
        <li>Must hold at least 1 hour of tow usage experience.</li>
      </ul>

      <h3 className='text-lg font-semibold mt-4 mb-1'>Tow Trained User</h3>
      <ul className='list-disc ml-6 mb-3 space-y-1'>
        <li>Receive the Tow Brief.</li>
        <li>Demonstrate physical competency with Rope Tow safety systems and procedures.</li>
        <li>Be a winter party member at the BRC.</li>
        <li>Must have basic skiing/snowboarding ability.</li>
      </ul>

      <h2 className='text-xl font-bold mt-6 mb-2'>Training materials</h2>

      <h3 className='text-lg font-semibold mt-4 mb-1'>Tow Operator Training Brief</h3>
      <ul className='list-disc ml-6 mb-3 space-y-1'>
        <li>
          Tow Operators must not under any circumstances make modifications or adjustments outside those described for
          normal operations to the tow system without explicit authorisation from the BRC Off-Mountain Maintenance
          Contact.
        </li>
        <li>
          The rope tow must never be used until the start of week and start of day checks have been conducted and signed
          off in the BRC Rope Tow Logbook.
        </li>
        <li>The roller door to the hut must be open during all tow hut engine usage.</li>
        <li>
          Practical training components:
          <ul className='list-[circle] ml-6 mt-1 space-y-1'>
            <li>Setting the rope on the bull wheel and drive wheel</li>
            <li>Setting the rope on the hook above the road</li>
            <li>Setting up all required legislative signage</li>
            <li>Checking the tow motor fluids prior to operation</li>
            <li>Completing the BRC Rope Tow Logbook</li>
            <li>Checking the E-Stop system</li>
            <li>Clearing/preparing a dismounting zone</li>
            <li>Setting the safety gate for effective use</li>
            <li>Operating the Rope Tow controls</li>
            <li>Safety checks prior to engine restart during regular operations</li>
          </ul>
        </li>
      </ul>

      <h3 className='text-lg font-semibold mt-4 mb-1'>Tow Supervisor Training Brief</h3>
      <p className='mb-3'>
        The Tow Supervisor position specifically involves monitoring for incidents and reacting in a timely manner.
      </p>
      <ul className='list-disc ml-6 mb-3 space-y-1'>
        <li>
          Tow Supervisors sit at the top of the tow slope. They maintain an active watch on users and assist with
          unloading where required.
        </li>
        <li>
          Supervising new tow users and placing a priority watch on them is important. The rope tow is a great way for
          inexperienced skiers to practise with reduced physical exertion, but they are more prone to self injury which
          may require system shutdown.
        </li>
        <li>
          Only registered winter party members are to use the BRC Rope Tow. The Rope Tow must be shut down immediately
          if unauthorised users attempt to use the rope tow, and the Wardens team notified immediately.
        </li>
        <li>
          If a whistle blow is heard, the tow should not be shut down immediately, as this may inhibit assistance from
          reaching the person blowing the whistle. Assess before shutdown.
        </li>
        <li>Any safety incidents must be followed up post-operations to ensure a report is completed.</li>
      </ul>

      <h3 className='text-lg font-semibold mt-4 mb-1'>Tow Brief</h3>
      <p className='mb-3'>
        A rope tow safety briefing is to be conducted in the presence of the entire party prior to the first use of the
        Rope Tow for the week. It is recommended that this briefing be given at the post-morning duties parade on the
        morning of the likely first day of use. The following points shall be covered:
      </p>
      <ol className='list-decimal ml-6 mb-3 space-y-1'>
        <li>
          What is a rope tow?
          <ul className='list-[circle] ml-6 mt-1 space-y-1'>
            <li>Participants should log experience in their personal logbooks.</li>
          </ul>
        </li>
        <li>
          Nutcracker attachment belt technical information and practices:
          <ul className='list-[circle] ml-6 mt-1 space-y-1'>
            <li>
              Safe storage of the nutcracker device on the attachment belt while skiing in order to prevent injury when
              falling — tucked into the side of the hip.
            </li>
            <li>
              The failsafe aspect and nuance/method of using the nutcracker attachment belt, emphasising "it is okay to
              just let go".
            </li>
            <li>
              How to navigate the rope sheaves and other obstacles while riding the tow (just guide the nutcracker
              through it).
            </li>
            <li>
              "Unapproved harnesses or use of damaged nutcracker harnesses is strictly prohibited on the BRC Rope Tow."
            </li>
          </ul>
        </li>
        <li>
          "There is a requirement under BRC policy for all BRC Rope Tow Users to ski in control at all times and not
          conduct themselves in such a manner that poses any hazard to others."
          <ul className='list-[circle] ml-6 mt-1 space-y-1'>
            <li>The importance and strict requirement of buddy system skiing in fringe terrain.</li>
            <li>Rope Tow skiing areas that are suitable for beginners.</li>
            <li>Keep an eye out and assist less experienced skiers and tow users where possible.</li>
          </ul>
        </li>
        <li>
          The correct and safe methods of mounting and dismounting the rope tow:
          <ul className='list-[circle] ml-6 mt-1 space-y-1'>
            <li>Mounting and dismounting zones on the tow.</li>
            <li>
              Tow Supervisors must ensure that until the previous person loaded gets at least one pole ahead, another
              person cannot be loaded.
            </li>
          </ul>
        </li>
        <li>
          The daily Rope Tow Safety brief and what it means (discuss the report of the day!):
          <ul className='list-[circle] ml-6 mt-1 space-y-1'>
            <li>Also including who the Tow Operators and Supervisors are that day.</li>
          </ul>
        </li>
        <li>
          "Helmets are not mandatory for usage of the BRC Rope Tow. Despite this, helmet usage is recommended while
          using the tow. This is in line with current practices at other ski fields operating a nutcracker ski tow."
        </li>
        <li>
          Names of all BRC rope tow users are to be recorded on the main whiteboard in the BRC dining room prior to
          usage.
        </li>
        <li>
          Carrying of whistles by all tow users is mandatory, and this must be checked before users are allowed to ride
          the tow:
          <ul className='list-[circle] ml-6 mt-1 space-y-1'>
            <li>3 blasts for an emergency.</li>
            <li>Whistles are not to be used as a communication tool in non-emergency situations.</li>
          </ul>
        </li>
        <li>Only registered winter party participants are to use the rope tow.</li>
        <li>
          "All safety incidents involving the rope tow must be recorded in alignment with the BRC standard practices."
        </li>
        <li>Use of the Emergency Stop systems on the BRC rope tow.</li>
        <li>
          Tow Supervisor and Tow Operator roles and how these designated people work:
          <ul className='list-[circle] ml-6 mt-1 space-y-1'>
            <li>
              The rope tow controls are not to be operated by any persons who do not hold the Tow Operator training
              level.
            </li>
            <li>
              The rope tow will never be operated until all weekly and daily checks have been completed, logged and
              signed off by the designated Tow Operator.
            </li>
            <li>
              "The rope tow is specifically designed to comply with the standards set under Australian Law through the
              Canadian CSA Z98-2019 Rope Tow Standards."
            </li>
            <li>
              Carriage of radios by users is recommended, and the Designated Tow Operator will organise this. At least
              one other radio must be used apart from the permanently installed Tow Hut one. It is further recommended
              that all Designated Tow Supervisors have a radio at all times.
            </li>
          </ul>
        </li>
        <li>
          When skiing the fringe terrain or beyond (marked red then clear on the map), a minimum of 4 tow skiers
          applies, and the buddy system must be observed. When skiing in the unbounded area, a Trip Intention Form must
          be completed. Tow Supervisors must also be put in place at each loading and unloading station.
        </li>
        <li>Maximum 6 Rope Tow riders (using the tow itself) at any given time.</li>
      </ol>
    </div>
  )
}
