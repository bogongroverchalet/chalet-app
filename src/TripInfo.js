import React from 'react'
import Wrapper from './Wrapper'
import { getTripDistance } from './Map'
import { useSearchParams, useParams, Link, Navigate } from 'react-router-dom'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import capitalize from 'capitalize'
import tripData from './trips.yaml'
import ReactMarkdown from 'react-markdown'
import _ from 'lodash'
const PDFDownloadLink = React.lazy(() => import('./TripInfoPDFRendererLazy'))
const TripInfoPDF = React.lazy(() => import('./TripInfoPDFDocumentLazy'))

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
        ul: (props) => <ul {...props} className='list-disc' />,
      }}
    >
      {children}
    </ReactMarkdown>
  )
}

export default function TripInfo() {
  React.useEffect(() => window.scrollTo(0, 0))
  const { tripName } = useParams()
  const [search] = useSearchParams()
  const tripInfoData = tripData.trips.find(({ name }) => name === tripName)
  if (!tripInfoData) {
    return <Navigate replace to='../..' relative='path' />
  }
  if (!tripInfoData.distance) {
    console.log(`Approx distance: ${Math.ceil(getTripDistance(tripName) / 1000)}km`)
  }
  return (
    <div className='grid grid-rows-[min-content,1fr] min-h-screen max-sm:p-3'>
      <div className='text-center max-sm:text-left'>
        <h1 className='text-3xl my-4 -indent-12 max-sm:pl-10'>
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
                {tripInfoData.distance && (
                  <tr>
                    <td>
                      <h3>Distance:</h3>
                    </td>
                    <td>{tripInfoData.distance}</td>
                  </tr>
                )}
                {tripInfoData['long-description'] && (
                  <tr>
                    <td>
                      <h3>Notes:</h3>
                    </td>
                    <td>
                      <Markdown>{tripInfoData['long-description']}</Markdown>
                    </td>
                  </tr>
                )}
                {tripInfoData['hazards'] && (
                  <tr>
                    <td>
                      <h3>Hazards:</h3>
                    </td>
                    <td>
                      <div className='pl-4'>
                        <ul className='list-disc'>
                          {tripInfoData['hazards'].map((desc) => (
                            <li key={desc}>
                              <Markdown>{desc}</Markdown>
                            </li>
                          ))}
                        </ul>
                      </div>
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
        {search.has('pdfLink') && (
          <div className='mb-4 text-xl text-center'>
            <PDFDownloadLink document={<TripInfoPDF tripInfo={tripInfoData} />} fileName={`${tripName}.pdf`}>
              Download trip info
            </PDFDownloadLink>
          </div>
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
