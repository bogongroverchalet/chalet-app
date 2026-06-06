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
import { createBrowserRouter, RouterProvider, Navigate, ScrollRestoration, Outlet } from 'react-router-dom'
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
import NobsVideos from './NobsVideos'
import Safety from './Safety'
import SafetyChildSafe from './SafetyChildSafe'
import SafetySunProtection from './SafetySunProtection'
import SafetyVentolinEpipen from './SafetyVentolinEpipen'
import SafetyEvacuatedParticipant from './SafetyEvacuatedParticipant'
import SafetyFirstAiders from './SafetyFirstAiders'
import SafetyFootwear from './SafetyFootwear'
import SafetyHearing from './SafetyHearing'
import SafetyHelmet from './SafetyHelmet'
import SafetyIgloo from './SafetyIgloo'
import SafetyLateMissing from './SafetyLateMissing'
import SafetyOffMountain from './SafetyOffMountain'
import SafetyMedicalRefusal from './SafetyMedicalRefusal'
import SafetyIncidentReporting from './SafetyIncidentReporting'
import SafetySled from './SafetySled'
import SafetyWoodChopping from './SafetyWoodChopping'
import SafetyRopeTowNotice from './SafetyRopeTowNotice'
import SafetyRopeTowTraining from './SafetyRopeTowTraining'
import SafetyRopeTowLeader from './SafetyRopeTowLeader'
import PantryByBay from './PantryByBay'
import PantryByItem from './PantryByItem'
import PantryInventory from './PantryInventory'
import { primeWeatherCache, registerPeriodicSync } from './weatherUtils'

const TripInfoPDF = React.lazy(() => import('./TripInfoPDF'))

function Root() {
  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  )
}

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      { path: '/', element: <App /> },
      { path: '/packing', element: <Packing /> },
      { path: '/videos', element: <Videos /> },
      { path: '/videos/:video', element: <Videos /> },
      { path: '/nobs', element: <Nobs /> },
      { path: '/nobs/report', element: <NobsReport /> },
      { path: '/nobs/report/pl', element: <NobsReportPL /> },
      { path: '/nobs/report/pa', element: <NobsReportPA /> },
      { path: '/nobs/report/ce', element: <NobsReportCE /> },
      { path: '/nobs/report/qm', element: <NobsReportQM /> },
      { path: '/nobs/report/tl', element: <NobsReportTL /> },
      { path: '/nobs/report/merch', element: <NobsReportMerch /> },
      { path: '/nobs/videos', element: <NobsVideos /> },
      { path: '/nobs/videos/:video', element: <NobsVideos /> },
      { path: '/nobs/room-by-room', element: <RoomByRoom /> },
      { path: '/nobs/room-by-room/:slug', element: <RoomByRoomDetail /> },
      { path: '/nobs/pantry-by-bay', element: <PantryByBay /> },
      { path: '/nobs/pantry-by-item', element: <PantryByItem /> },
      { path: '/chores', element: <DutyGroups /> },
      { path: '/chores/:slug', element: <DutyGroupDetail /> },
      { path: '/safety', element: <Safety /> },
      { path: '/safety/child-safe', element: <SafetyChildSafe /> },
      { path: '/safety/sun-protection', element: <SafetySunProtection /> },
      { path: '/safety/ventolin-epipen', element: <SafetyVentolinEpipen /> },
      { path: '/safety/evacuated-participant', element: <SafetyEvacuatedParticipant /> },
      { path: '/safety/first-aiders', element: <SafetyFirstAiders /> },
      { path: '/safety/footwear', element: <SafetyFootwear /> },
      { path: '/safety/hearing', element: <SafetyHearing /> },
      { path: '/safety/helmet', element: <SafetyHelmet /> },
      { path: '/safety/igloo', element: <SafetyIgloo /> },
      { path: '/safety/late-missing', element: <SafetyLateMissing /> },
      { path: '/safety/off-mountain', element: <SafetyOffMountain /> },
      { path: '/safety/medical-refusal', element: <SafetyMedicalRefusal /> },
      { path: '/safety/incident-reporting', element: <SafetyIncidentReporting /> },
      { path: '/safety/sled', element: <SafetySled /> },
      { path: '/safety/wood-chopping', element: <SafetyWoodChopping /> },
      { path: '/safety/rope-tow-notice', element: <SafetyRopeTowNotice /> },
      { path: '/safety/rope-tow-training', element: <SafetyRopeTowTraining /> },
      { path: '/safety/rope-tow-leader', element: <SafetyRopeTowLeader /> },
      { path: '/trips', element: <Trips /> },
      { path: '/trips/map/edit/:tripName?', element: <Map edit={true} /> },
      { path: '/trips/map/:tripName?', element: <Map /> },
      { path: '/trips/trip/:tripName', element: <TripInfo /> },
      { path: '/trips/trip/:tripName.pdf', element: <TripInfoPDF /> },
      { path: '/pdf/pantry-inventory', element: <PantryInventory /> },
      { path: '/pdf/:slug', element: <PdfViewer /> },
      { path: '/weather', element: <Weather /> },
      { path: '*', element: <Navigate to='/' replace /> },
    ],
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <InitialDialog />
    <RouterProvider router={router} />
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
