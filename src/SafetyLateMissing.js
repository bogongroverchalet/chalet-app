import React from 'react'
import { Link } from 'react-router-dom'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'

export default function SafetyLateMissing() {
  return (
    <div className='p-4 max-w-2xl mx-auto pb-16'>
      <h1 className='text-3xl my-4 -indent-12 max-sm:pl-10'>
        <Link to='..' relative='path'>
          <ChevronLeftIcon sx={{ fontSize: 40, position: 'relative', top: -3 }} />
          Late &amp; missing persons guidelines
        </Link>
      </h1>

      <h2 className='text-xl font-bold mt-6 mb-2'>Chalet resources</h2>
      <ul className='list-disc ml-6 mb-3 space-y-1'>
        <li>Land line phone</li>
        <li>Mobile coverage within 200m (limited coverage in Chalet)</li>
        <li>UHF Radio</li>
        <li>Longer range radio coverage from Tow Hut (due to repeater access)</li>
        <li>A no alcohol policy while Tour Parties are out</li>
        <li>PLBs for touring party use</li>
      </ul>

      <h2 className='text-xl font-bold mt-6 mb-2'>Before setting out on tour</h2>
      <p className='mb-3'>All Tour Parties must have:</p>
      <ul className='list-disc ml-6 mb-3 space-y-1'>
        <li>Completed a Trip Intentions form</li>
        <li>Sought approval from Party Leader or Approved Person</li>
        <li>Groups of no less than 4</li>
        <li>Carried the necessary equipment for the tour (detailed on Trip Intentions form)</li>
        <li>Tour Leaders have NOBS, Chalet, Wardens and Tour Members phone numbers</li>
        <li>Tour Members have the Chalet and Tour Leader's phone number</li>
        <li>
          Tour Party members have means for communication and stating their location (Radio (optional), Mobile Phone,
          GPS, Emergency Plus app, Mapping app)
        </li>
        <li>Tour Members should have their phone notifications set to loud</li>
      </ul>

      <p className='mb-3'>
        Deviations from Trip Intention can occur; where possible these need to be notified to the Chalet (or NOBS).
        Changes need to be recorded on the original Trip Intentions Form. If they cannot be notified, the party should
        consider whether they should proceed with the altered route (unless it is a change for the safety of the Tour
        Party).
      </p>

      <p className='mb-3'>
        Encourage tour parties to depart the chalet at different times to avoid unintentional mixing of tour groups.
      </p>

      <p className='mb-3'>
        In the event of a late or missing person incident the Chalet should not be left unattended. If the Chalet is
        unattended, tour groups should return to the Chalet as soon as is safe to do so.
      </p>

      <h2 className='text-xl font-bold mt-6 mb-2'>Situation 1: Tour Parties are late but in contact</h2>
      <ul className='list-disc ml-6 mb-3 space-y-1'>
        <li>Update return information and route on the Tours Trip Intention Form.</li>
        <li>No consumption of alcohol until Tour Parties return.</li>
        <li>
          If it has been snowing, consider sending a group (of at least 4) out to set ski trails in the direction they
          are returning from if it is safe to do so. Ski for ½ hour then return.
        </li>
        <li>Continue with 'Chalet Life' as normal.</li>
        <li>At dusk or in poor weather, turn on outside lights to guide Tour Party in.</li>
        <li>Ensure there is hot water for showers and hot drinks for the Tour Party on their return.</li>
        <li>Once the group is back safe, fed and rested, NOBS and tour group should conduct a review of the tour.</li>
        <li>Consider completing an incident report.</li>
      </ul>

      <h2 className='text-xl font-bold mt-6 mb-2'>Situation 2: Tour Groups are late and no contact</h2>
      <ul className='list-disc ml-6 mb-3 space-y-1'>
        <li>
          Allow ½ hour from intended return time before attempting to contact:
          <ul className='list-[circle] ml-6 mt-1 space-y-1'>
            <li>Attempt telephone contact via phone with all Tour Party members</li>
            <li>Attempt Radio contact from Chalet, then Tow Hut (greater range)</li>
            <li>Attempt SMS messaging — text may get through where voice cannot</li>
            <li>Attempt contact by these means every 15 minutes until contact is established</li>
            <li>Once contact is established and assistance is not required, revert to Situation 1 guidelines</li>
          </ul>
        </li>
        <li>
          Consider reasons for delay and no contact:
          <ul className='list-[circle] ml-6 mt-1 space-y-1'>
            <li>Poor weather may slow the Tour Party and affect reception</li>
            <li>Tour location may have poor reception</li>
          </ul>
        </li>
        <li>
          No contact after 1 hour:
          <ul className='list-[circle] ml-6 mt-1 space-y-1'>
            <li>Contact the Wardens</li>
            <li>Have trip intentions form on hand</li>
            <li>Follow the advice of the Wardens</li>
          </ul>
        </li>
        <li>No consumption of alcohol until Tour Party returns.</li>
        <li>
          If it has been snowing, consider sending a group (of at least 4) out to set ski trails in the direction they
          are returning from if safe to do so. Ski for ½ hour then return.
        </li>
        <li>Continue with 'Chalet Life' as normal (no alcohol — Chalet may need to provide assistance).</li>
        <li>At dusk turn on outside lights to guide group in.</li>
        <li>Ensure there is hot water for showers and hot drinks for the Tour Party on their return.</li>
        <li>Once the group is back safe, fed and rested, NOBS and tour group should conduct a review of the tour.</li>
        <li>Complete an incident report.</li>
      </ul>

      <h2 className='text-xl font-bold mt-6 mb-2'>Situation 3: Tour Party requires assistance</h2>
      <ul className='list-disc ml-6 mb-3 space-y-1'>
        <li>If urgent medical assistance is required, the Tour Party must contact 000!</li>
        <li>Communicate location using Latitude and Longitude (Emergency Plus app).</li>
        <li>Notify Wardens and follow their advice.</li>
        <li>Record time, location, situation and action on the Trip Intentions form.</li>
        <li>Consider if the Winter Party members are the best option to assist.</li>
        <li>
          Once the Tour Party is evacuated or back safe, fed and rested, NOBS and tour group should conduct a review of
          the tour.
        </li>
        <li>Complete an incident report.</li>
      </ul>

      <h2 className='text-xl font-bold mt-6 mb-2'>Situation 4: Individual members of the touring party missing</h2>
      <ul className='list-disc ml-6 mb-3 space-y-1'>
        <li>Consider the safety of the entire Touring Party before taking action.</li>
        <li>Attempt contact by phone or radio.</li>
        <li>Determine the likely food, water, clothing and equipment carried by the missing person(s).</li>
        <li>
          Communicate situation to Chalet/NOBS/Warden as soon as practical. (Check the person is not at the Chalet or on
          another tour.)
        </li>
        <li>Consider if the Winter Party members are the best option to assist.</li>
        <li>
          Retrace route to missing person's last known location if safe to do so:
          <ul className='list-[circle] ml-6 mt-1 space-y-1'>
            <li>
              Conduct a Hasty Search — send groups out and back on tracks from their last known location, no more than 1
              hour out and back. Search for the amount of time they have been missing.
            </li>
          </ul>
        </li>
        <li>
          Communicate situation to Chalet/NOBS/Warden:
          <ul className='list-[circle] ml-6 mt-1 space-y-1'>
            <li>The missing person is located — contact the Chalet/NOBS/Warden</li>
            <li>The missing person cannot be located — contact 000, Warden, NOBS, Chalet</li>
          </ul>
        </li>
        <li>
          Make noise (blow whistles, call out) at regular intervals and listen for missing person's calls/whistle.
        </li>
        <li>
          Once the Tour Party is back safe, fed and rested, NOBS and tour group should conduct a review of the tour.
        </li>
        <li>Complete an incident report.</li>
      </ul>

      <h2 className='text-xl font-bold mt-6 mb-2'>Situation 5: Missing person from the Chalet (not on tour)</h2>
      <ul className='list-disc ml-6 mb-3 space-y-1'>
        <li>
          Ask all participants if they know the person's current or most recent whereabouts/intentions. Consider ringing
          the bell to get attention and gather everyone.
        </li>
        <li>Check with any Tour Parties out if the person is with them.</li>
        <li>
          Check whiteboard — send out a party of 4 capable participants to check last known location if close to the
          chalet.
        </li>
        <li>Execute a thorough room-by-room search of the Chalet, including emergency shelter.</li>
        <li>
          Execute a search of the immediate area outside the Chalet; check Tow Hut, igloos, piles of snow fallen from
          roofs (groups of 4).
        </li>
        <li>Confirm their ski gear and personal equipment are at the chalet.</li>
        <li>If you cannot locate them, contact the Wardens and follow their advice.</li>
        <li>Once the member is located and safe, NOBS and party member should conduct a review of the situation.</li>
        <li>Consider completing an incident report.</li>
      </ul>

      <h2 className='text-xl font-bold mt-6 mb-2'>Guidelines for Wardens and NOBS</h2>
      <ul className='list-disc ml-6 mb-3 space-y-1'>
        <li>
          Have Party/Chalet call 000 if immediate specialist outside assistance is required (urgent medical, search and
          rescue, urgent evacuation) — request a callback after this has been done.
        </li>
        <li>
          Get as much information about the situation to make an informed decision:
          <ul className='list-[circle] ml-6 mt-1 space-y-1'>
            <li>Location/Route</li>
            <li>Participants — number, names and experience</li>
            <li>Current observed weather conditions</li>
            <li>Current snow conditions — patchy, fresh, icy, deep</li>
            <li>What food and equipment the Tour Party has</li>
            <li>Injuries or possible health conditions</li>
            <li>What action has been taken so far</li>
          </ul>
        </li>
        <li>
          Consider the following when deciding a course of action:
          <ul className='list-[circle] ml-6 mt-1 space-y-1'>
            <li>Weather and snow surface conditions</li>
            <li>Location/Terrain</li>
            <li>Skill and Experience</li>
            <li>Equipment</li>
          </ul>
        </li>
        <li>The Wardens will decide if the Party is to attempt a greeting party or Search and Rescue attempt.</li>
        <li>
          Once Chalet knows their course of action, call the Scout Help Line if:
          <ul className='list-[circle] ml-6 mt-1 space-y-1'>
            <li>000 has been called</li>
            <li>Parent/Emergency Contacts need to be notified</li>
            <li>Outside assistance is required</li>
            <li>Off-mountain accommodation needs to be arranged</li>
            <li>Counselling or Chaplaincy is required</li>
          </ul>
        </li>
        <li>Follow up with required Scouts Victoria incident reporting.</li>
      </ul>
    </div>
  )
}
