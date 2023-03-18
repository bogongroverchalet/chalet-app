import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import '@fortawesome/fontawesome-free/js/all.js'
import App from './App'
import Trips from './Trips'
import TripInfo from './TripInfo'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Map from './Map'

const TripInfoPDF = React.lazy(() => import('./TripInfoPDF'))

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/trips' element={<Trips />} />
        <Route path='/trips/map/edit/:tripName?' element={<Map edit={true} />} />
        <Route path='/trips/map/:tripName?' element={<Map />} />
        <Route path='/trips/trip/:tripName' element={<TripInfo />} />
        <Route path='/trips/trip/:tripName.pdf' element={<TripInfoPDF />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
