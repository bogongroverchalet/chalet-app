import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import Packing from './Packing'
import Trips from './Trips'
import TripInfo from './TripInfo'
import InitialDialog from './InitialDialog'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Map from './Map'
import Nobs from './Nobs'
import Videos from './Videos'
import PdfViewer from './PdfViewer'
import Weather from './Weather'
import NobsReport from './NobsReport'
import NobsReportPL from './NobsReportPL'
import NobsReportPA from './NobsReportPA'
import NobsReportCE from './NobsReportCE'
import NobsReportQM from './NobsReportQM'
import NobsReportTL from './NobsReportTL'
import RoomByRoom from './RoomByRoom'
import RoomByRoomDetail from './RoomByRoomDetail'
import DutyGroups from './DutyGroups'
import DutyGroupDetail from './DutyGroupDetail'
import NobsReportMerch from './NobsReportMerch'
import { primeWeatherCache, registerPeriodicSync } from './weatherUtils'

const TripInfoPDF = React.lazy(() => import('./TripInfoPDF'))

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <InitialDialog />
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/packing' element={<Packing />} />
        <Route path='/videos' element={<Videos />} />
        <Route path='/videos/:video' element={<Videos />} />
        <Route path='/nobs' element={<Nobs />} />
        <Route path='/nobs/report' element={<NobsReport />} />
        <Route path='/nobs/report/pl' element={<NobsReportPL />} />
        <Route path='/nobs/report/pa' element={<NobsReportPA />} />
        <Route path='/nobs/report/ce' element={<NobsReportCE />} />
        <Route path='/nobs/report/qm' element={<NobsReportQM />} />
        <Route path='/nobs/report/tl' element={<NobsReportTL />} />
        <Route path='/nobs/report/merch' element={<NobsReportMerch />} />
        <Route path='/nobs/room-by-room' element={<RoomByRoom />} />
        <Route path='/nobs/room-by-room/:slug' element={<RoomByRoomDetail />} />
        <Route path='/chores' element={<DutyGroups />} />
        <Route path='/chores/:slug' element={<DutyGroupDetail />} />
        <Route path='/trips' element={<Trips />} />
        <Route path='/pdf' element={<PdfViewer />} />
        <Route path='/trips/map/edit/:tripName?' element={<Map edit={true} />} />
        <Route path='/trips/map/:tripName?' element={<Map />} />
        <Route path='/trips/trip/:tripName' element={<TripInfo />} />
        <Route path='/trips/trip/:tripName.pdf' element={<TripInfoPDF />} />
        <Route path='/weather' element={<Weather />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register()
reportWebVitals()

primeWeatherCache()
if (localStorage.getItem('weatherPeriodicSync') !== 'false') registerPeriodicSync()
navigator.serviceWorker?.ready.then((reg) => {
  if ('sync' in reg) reg.sync.register('weather-sync-once').catch(() => {})
})
window.addEventListener('online', primeWeatherCache)
