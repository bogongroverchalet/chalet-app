import React from 'react'
import leaflet from 'leaflet'
import { renderToString } from 'react-dom/server'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocation, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { MapContainer, Marker, Popup, useMap } from 'react-leaflet'
import { useParams, Link, Navigate } from 'react-router-dom'
import { PMTiles, leafletRasterLayer } from 'pmtiles'
import _ from 'lodash'
import 'leaflet-kml'
import 'leaflet-gpx'
import './leaflet-setup'
import tripKmlData from './trip-data.kml'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import classnames from 'classnames'
import CircularProgress from '@mui/material/CircularProgress'
import DownloadIcon from '@mui/icons-material/Download'
import fileDownload from 'js-file-download'
import togpx from 'togpx'
import tripData from './trips.yaml'
import waterfalls from './gpx/waterfalls.gpx'
import waterfallsCope from './gpx/waterfalls-cope-aqueduct.gpx'
import fallsRuinedCastle from './gpx/falls-investiture-point.gpx'
import Tooltip from '@mui/material/Tooltip'

const ChaletIcon = leaflet.divIcon({
  html: renderToString(<FontAwesomeIcon icon={faLocationDot} className='text-3xl text-red-600' />),
  iconSize: [20, 20],
  iconAnchor: [10, 33],
})

let mapDataReady = process.env.NODE_ENV === 'production' ? false : true

const chaletPosition = Object.freeze([-36.9040535, 147.3031153])
const maxZoom = 17
export default function Map() {
  const { tripName } = useParams()
  const [showPosition, setShowPosition] = React.useState()
  const [positionStatus, setPositionStatus] = React.useState()
  const [forDownload, setForDownload] = React.useState()
  const [actualMapDataReady, setActualMapDataReady] = React.useState(mapDataReady)
  React.useEffect(() => {
    navigator.serviceWorker.ready.then((registration) => {
      registration.active.postMessage('isMapDataReady')
    })
    const listener = ({ data }) => {
      if (data === 'mapDataReady') {
        setActualMapDataReady((mapDataReady = true))
      }
    }
    navigator.serviceWorker.addEventListener('message', listener)
    return () => navigator.serviceWorker.removeEventListener('message', listener)
  })
  if (tripName && !tripData.trips.find(({ name }) => name === tripName)) {
    return <Navigate replace to='../..' relative='path' />
  }
  const toggleShowPosition = () => {
    setShowPosition(!showPosition)
    setPositionStatus(false)
  }
  return (
    <div className='grid grid-rows-[min-content,1fr] h-screen overflow-hidden'>
      <div className='text-center max-sm:text-left pt-2 border-b-2 border-slate-900'>
        <h1 className='text-3xl'>
          <Link to={tripName ? `../../trip/${tripName}` : '..'} relative='path'>
            <ChevronLeftIcon sx={{ fontSize: 40, position: 'relative', top: -3 }} />
          </Link>
          <span className='max-sm:hidden'>Bogong Rover Chalet map{tripName ? ':' : ''}</span> {tripName}
          <div className='whitespace-nowrap inline-block'>
            <Tooltip
              title={positionStatus?.message}
              arrow
              open={!!positionStatus?.message}
              classes={{ tooltip: 'text-center !text-[1rem]' }}
            >
              <button className='ml-4' onClick={toggleShowPosition}>
                <FontAwesomeIcon
                  icon={faLocation}
                  className={classnames(
                    showPosition && positionStatus == null && 'gps-loading-position',
                    showPosition && positionStatus === true && 'text-blue-500',
                    showPosition && positionStatus?.message && 'text-red-500'
                  )}
                />
              </button>
            </Tooltip>
            <button className='ml-4' onClick={() => fileDownload(forDownload, `${tripName}.gpx`)}>
              <DownloadIcon sx={{ fontSize: 40, position: 'relative', top: -3 }} />
            </button>
          </div>
        </h1>
      </div>
      {actualMapDataReady ? (
        <MapContainer center={chaletPosition} zoom={16} scrollWheelZoom={false} maxNativeZoom={17} maxZoom={19}>
          <PMTilesLayer />
          <Tracks tripName={tripName} forDownload={setForDownload} />
          <Marker position={chaletPosition} icon={ChaletIcon}>
            <Popup>Bogong Rover Chalet ????</Popup>
          </Marker>
          {showPosition && <MyLocation onPositionStatus={(e) => setPositionStatus(e)} />}
        </MapContainer>
      ) : (
        <div className='flex w-full h-full items-center justify-center'>
          <CircularProgress />
        </div>
      )}
    </div>
  )
}

const pmtiles = new PMTiles('/Bogong_High_Plains.pmtiles')
const pmtilesHeaderPromise = pmtiles.getHeader()
function PMTilesLayer() {
  const map = useMap()
  React.useEffect(() => {
    pmtilesHeaderPromise.then((h) => {
      leafletRasterLayer(pmtiles).addTo(map)
    })
  })
  return <></>
}

const LocationIcon = leaflet.divIcon({
  html: renderToString(<FontAwesomeIcon icon={faLocationDot} className='text-3xl text-blue-500' />),
  iconSize: [20, 20],
  iconAnchor: [10, 33],
})

function MyLocation({ onPositionStatus }) {
  const map = useMap()
  const [position, setPosition] = React.useState()
  const [accuracy, setAccuracy] = React.useState()
  const positionError = React.useRef()
  React.useEffect(() => {
    let animate = false
    let oldPosition = position
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        onPositionStatus(true)
        const newPosition = [position.coords.latitude, position.coords.longitude]
        if (!_.isEqual(accuracy, position.coords.accuracy)) {
          setAccuracy(position.coords.accuracy)
        }
        if (_.isEqual(newPosition, oldPosition)) return
        setPosition(newPosition)
        if (false) {
          // TODO
          map.panTo(new window.L.LatLng(position.coords.latitude, position.coords.longitude), null, { animate })
          animate = true
        }
      },
      (e) => {
        if (positionError.current?.message !== e.message) {
          positionError.current = e
          onPositionStatus(e)
        }
      },
      { enableHighAccuracy: true, maximumAge: 5 * 60e3, timeout: 30e3 }
    )
    return () => navigator.geolocation.clearWatch(watchId)
  })
  return (
    position && (
      <Marker position={position} icon={LocationIcon} zIndexOffset={10}>
        <Popup>Me{accuracy && ` - accuracy: ${accuracy}m`}</Popup>
      </Marker>
    )
  )
}

const gpxFiles = [waterfalls, waterfallsCope, fallsRuinedCastle]

const gpxOptions = {
  marker_options: { startIconUrl: false, endIconUrl: false },
  polyline_options: { color: 'red' },
}

function Tracks({ tripName, forDownload }) {
  const map = useMap()
  React.useEffect(() => {
    const parser = new DOMParser()
    const kml = parser.parseFromString(tripKmlData, 'text/xml')
    Array.from(kml.getElementsByTagName('styleUrl')).forEach((x) => x.parentNode.removeChild(x))

    const track = new leaflet.KML(kml)
    if (!tripName) {
      _(gpxFiles)
        .values()
        .flatten()
        .uniq()
        .forEach((t) => new leaflet.GPX(t, gpxOptions).addTo(map))
      map.addLayer(track)
      map.eachLayer(function handleLayer(l) {
        l.options.icon = leaflet.Icon.Default
        if (l.eachLayer) l.eachLayer(handleLayer)
        if (l.get_name) {
          l.bindPopup(`<h2>${l.get_name()}</h2>`, { className: 'kml-popup' })
          l.setStyle({ color: '#3388ff' })
        }
      })
      map.fitBounds(track.getBounds(), { maxZoom })
      return
    }
    const tripInfoData = tripData.trips.find(({ name }) => name === tripName)
    const route = ((tripInfoData?.routes ? _.first(tripInfoData?.routes).route : tripInfoData?.route) || []).concat(
      tripInfoData?.geofence || []
    )
    const pathsForTrip = new Set(route.map(({ name }) => name))
    let layersForTrip = []
    function handleLayer(l) {
      l.options.icon = leaflet.Icon.Default
      track.setStyle({ color: 'red' })
      if (l.eachLayer) l.eachLayer(handleLayer)
      if (!l.name) {
        return
      }
      if (pathsForTrip.has(l.name)) {
        layersForTrip = layersForTrip.concat(l)
      }
    }
    track.eachLayer(handleLayer)
    _(gpxFiles)
      .uniq()
      .forEach((t) => {
        const gpxTrack = new leaflet.GPX(t, gpxOptions).eachLayer(function handleLayer(l) {
          l.options.icon = leaflet.Icon.Default
          track.setStyle({ color: 'red' })
          if (l.eachLayer) l.eachLayer(handleLayer)
        })
        if (pathsForTrip.has(gpxTrack.get_name())) {
          gpxTrack.bindPopup(`<h2>${gpxTrack.get_name()}</h2>`, { className: 'kml-popup' })
          layersForTrip = layersForTrip.concat(gpxTrack)
        }
      })
    if (layersForTrip.length) {
      window.layersForTrip = layersForTrip
      const featureGroup = leaflet.featureGroup(layersForTrip).addTo(map)
      const trackGeojson = featureGroup.toGeoJSON()
      if (false) {
        const target = trackGeojson.features[0]
        _(trackGeojson.features)
          .tail()
          .forEach(
            ({ geometry: { coordinates } }) =>
              (target.geometry.coordinates = target.geometry.coordinates.concat(coordinates))
          )
        trackGeojson.features = [target]
      }
      forDownload(togpx(trackGeojson))
      map.fitBounds(featureGroup.getBounds(), { padding: [50, 50], maxZoom: 16 })
    }
  }, [map, tripName, forDownload])
}
