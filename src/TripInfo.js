import React from 'react'
import Wrapper from './Wrapper'
import { useParams, Link, Navigate } from 'react-router-dom'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import capitalize from 'capitalize'
import tripData from './trips.yaml'
import ReactMarkdown from 'react-markdown'
import _ from 'lodash'

function Markdown({ children }) {
  return (
    <ReactMarkdown
      components={{
        a: ({ href, children }) => {
          return (
            <Link to={`../${href}`} relative='path'>
              {children}
            </Link>
          )
        },
      }}
    >
      {children}
    </ReactMarkdown>
  )
}

export default function TripInfo() {
  const { tripName } = useParams()
  const tripInfoData = tripData.trips.find(({ name }) => name === tripName)
  if (!tripInfoData) {
    return <Navigate replace to='../..' relative='path' />
  }
  return (
    <div className='grid grid-rows-[min-content,1fr] min-h-screen'>
      <div className='text-center max-sm:text-left pt-2'>
        <h1 className='text-3xl'>
          <Link to='../..' relative='path'>
            <ChevronLeftIcon sx={{ fontSize: 40, position: 'relative', top: -3 }} />
          </Link>
          <span className='max-sm:hidden'>Bogong Rover Chalet trip:</span> {tripName}
        </h1>
      </div>
      <Wrapper>
        {tripInfoData && (
          <>
            <table className='trip-info-table mb-6'>
              <tbody>
                <tr>
                  <td>
                    <h3>Overview:</h3>
                  </td>
                  <td>
                    <Markdown>{tripInfoData.description}</Markdown>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h3>Level:</h3>
                  </td>
                  <td>
                    <p>{tripInfoData['difficulty-level']}</p>
                  </td>
                </tr>
                {tripInfoData['long-description'] && (
                  <tr>
                    <td>
                      <h3>Notes:</h3>
                    </td>
                    <td>
                      <Markdown components={{ a: (props) => <Link {...props} /> }}>
                        {tripInfoData['long-description']}
                      </Markdown>
                    </td>
                  </tr>
                )}
                <tr>
                  <td colSpan='2' className='pt-4'>
                    <h2 className='text-lg'>Turnback points</h2>
                  </td>
                </tr>
                {['weather', 'time'].map((type) => (
                  <tr key={type}>
                    <td>
                      <h3>{capitalize(type)}:</h3>
                    </td>
                    <td>
                      <div className='pl-4'>
                        <ul className='list-disc'>
                          {tripInfoData['turnback-points'][type].map((desc) => (
                            <li key={desc}>
                              <Markdown>{desc}</Markdown>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
        {_.isEmpty(tripInfoData['route']) ? null : (
          <div className='mb-4 text-xl text-center'>
            <Link className='font-bold' to={`../../map/${tripName}`} relative='path'>
              Show map
            </Link>
          </div>
        )}
      </Wrapper>
    </div>
  )
}
