import React from 'react'
import Wrapper from './Wrapper'
import { useParams, Link } from 'react-router-dom'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import tripData from './trips.yaml'

export default function TripInfo() {
  const { tripName } = useParams()
  const tripInfoData = tripData.trips.find(({ name }) => name === tripName)
  return (
    <>
      <div className='text-center pt-2 border-b-2 border-slate-900 h-[3.5rem]'>
        <h1 className='text-3xl'>
          <Link to='/'>
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
                    <p>{tripInfoData.description}</p>
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
                      <p className='whitespace-pre-line'>{tripInfoData['long-description']}</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        )}
        <div className='mb-4 text-xl text-center'>
          <Link className='font-bold' to={`/map/${tripName}`}>
            Show map
          </Link>
        </div>
      </Wrapper>
    </>
  )
}
