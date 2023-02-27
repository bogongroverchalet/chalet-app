import React from 'react'
import leaflet from 'leaflet'
import { renderToString } from 'react-dom/server'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocation, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { MapContainer, Marker, Popup, useMap } from 'react-leaflet'
import { useParams, Link } from 'react-router-dom'
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

const ChaletIcon = leaflet.divIcon({
  html: renderToString(<FontAwesomeIcon icon={faLocationDot} className='text-3xl text-red-600' />),
  iconSize: [20, 20],
  iconAnchor: [10, 33],
})

let mapDataReady = process.env.NODE_ENV === 'production' ? false : true

const chaletPosition = Object.freeze([-36.9040535, 147.3031153])
export default function Map() {
  const { tripName } = useParams()
  const [showPosition, setShowPosition] = React.useState()
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
  return (
    <>
      <div className='text-center pt-2 border-b-2 border-slate-900 h-[3.5rem]'>
        <h1 className='text-3xl'>
          <Link to={tripName ? `/trip/${tripName}` : '/'}>
            <ChevronLeftIcon sx={{ fontSize: 40, position: 'relative', top: -3 }} />
          </Link>
          <span className='max-sm:hidden'>Bogong Rover Chalet map:</span> {tripName}
          <button className='ml-4' onClick={() => setShowPosition(!showPosition)}>
            <FontAwesomeIcon icon={faLocation} className={classnames(showPosition && 'text-blue-500')} />
          </button>
          <button className='ml-4' onClick={() => fileDownload(forDownload, `${tripName}.gpx`)}>
            <DownloadIcon sx={{ fontSize: 40, position: 'relative', top: -3 }} />
          </button>
        </h1>
      </div>
      {actualMapDataReady ? (
        <MapContainer center={chaletPosition} zoom={16} scrollWheelZoom={false} maxNativeZoom={17} maxZoom={19}>
          <PMTilesLayer />
          <Tracks tripName={tripName} forDownload={setForDownload} />
          {showPosition && <MyLocation />}
          <Marker position={chaletPosition} icon={ChaletIcon}>
            <Popup>Bogong Rover Chalet 🎉</Popup>
          </Marker>
        </MapContainer>
      ) : (
        <div className='flex w-full h-full items-center justify-center'>
          <CircularProgress />
        </div>
      )}
    </>
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

function MyLocation() {
  const map = useMap()
  const [position, setPosition] = React.useState()
  const [accuracy, setAccuracy] = React.useState()
  React.useEffect(() => {
    let animate = false
    let oldPosition = position
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
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
      (e) => console.log(e),
      { enableHighAccuracy: true, maximumAge: 5 * 60e3, timeout: 30e3 }
    )
    return () => navigator.geolocation.clearWatch(watchId)
  })
  return (
    position && (
      <Marker position={position} icon={LocationIcon}>
        <Popup>Me{accuracy && ` - accuracy: ${accuracy}m`}</Popup>
      </Marker>
    )
  )
}

export const layersForTrips = {
  All: new Set([
    'Falls Creek (windy corner) to Wallace turnoff',
    'Chalet to LW turnoff',
    'Chalet to Wallace turnoff',
    'Chalet to Tow Hut',
    'LW turnoff to Cope Hut',
    'LW turnoff to Langford West',
    'Wallace turnoff to Wallaces Hut',
    'Wallace turnoff to Wallaces via Wilkinsons',
    'Wallace turnoff to Maddisons Hut',
    'Wallaces to Basalt Hill',
    'Cope Hut to Cope Carpark',
    'Cope Carpark to Wallaces Hut',
    'Cope Carpark to Rocky Nobs',
    'Cope Carpark to Mt Cope',
    'Cope Carpark to Cope Saddle Hut',
    'Cope Carpark to Investiture Point',
    'Langford West to Strawbery Saddle',
    'Strawberry Saddle to Raspberry Hill',
    'Raspberry Hill to Buckety Plain',
    'Buckety Plain to Faithfuls Hut',
    'Buckety Plain to McNamara hut via shortcut',
    'Home Slope',
    'Valley Slope',
    'Playground',
    'Investiture Point',
  ]),
  'Cope Hut': new Set(['LW turnoff to Cope Hut', 'Chalet to LW turnoff']),
  'Investiture Point': new Set([
    'LW turnoff to Cope Hut',
    'Chalet to LW turnoff',
    'Cope Hut to Cope Carpark',
    'Cope Carpark to Investiture Point',
    'Investiture Point',
  ]),
  'Falls Creek': new Set(['Falls Creek (windy corner) to Wallace turnoff', 'Chalet to Wallace turnoff']),
  'Basalt Hill': new Set(['Chalet to Wallace turnoff', 'Wallace turnoff to Wallaces Hut', 'Wallaces to Basalt Hill']),
  'Maddisons Hut': new Set(['Chalet to Wallace turnoff', 'Wallace turnoff to Maddisons Hut']),
  'Rocky Nobs': new Set([
    'Chalet to LW turnoff',
    'LW turnoff to Cope Hut',
    'Cope Hut to Cope Carpark',
    'Cope Carpark to Rocky Nobs',
  ]),
  'Mt Cope (direct)': new Set([
    'Chalet to LW turnoff',
    'LW turnoff to Cope Hut',
    'Cope Hut to Cope Carpark',
    'Cope Carpark to Mt Cope',
  ]),
  'Cope Saddle Hut': new Set([
    'Chalet to LW turnoff',
    'LW turnoff to Cope Hut',
    'Cope Hut to Cope Carpark',
    'Cope Carpark to Cope Saddle Hut',
  ]), // TODO not via Cope Hut
  'Langfords West': new Set(['Chalet to LW turnoff', 'LW turnoff to Langford West']),
  Waterfalls: new Set([
    'Chalet to LW turnoff',
    'LW turnoff to Cope Hut',
    'Cope Hut to Cope Carpark',
    'Cope Carpark to Cope Saddle Hut',
  ]),
}

const gpxTrips = {
  Waterfalls: [waterfalls],
}

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
    let pathsForTrip
    const tripInfoData = tripData.trips.find(({ name }) => name === tripName)
    if (process.env.NEW_TRIP_DATA) {
      pathsForTrip = new Set(tripInfoData.route.map(({ name }) => name))
    } else {
      pathsForTrip = _.get(layersForTrips, tripName, new Set())
    }
    new leaflet.GPX(waterfalls, gpxOptions).addTo(map)
    if (!tripName) {
      _(gpxTrips)
        .values()
        .flatten()
        .uniq()
        .forEach((t) => new leaflet.GPX(waterfalls, gpxOptions).addTo(map))
      map.addLayer(track)
      track.eachLayer(function handleLayer(l) {
        l.options.icon = leaflet.Icon.Default
        if (l.eachLayer) l.eachLayer(handleLayer)
      })
      map.fitBounds(track.getBounds())
      return
    }
    let layersForTrip = []
    track.eachLayer(function handleLayer(l) {
      l.options.icon = leaflet.Icon.Default
      track.setStyle({ color: 'red' })
      if (l.eachLayer) l.eachLayer(handleLayer)
      if (!l.name) {
        return
      }
      if (pathsForTrip.has(l.name)) {
        layersForTrip = layersForTrip.concat(l)
      }
    })
    _(gpxTrips[tripName] || [])
      .uniq()
      .forEach((t) => {
        const gpxTrack = new leaflet.GPX(t, gpxOptions).addTo(map).eachLayer(function handleLayer(l) {
          l.options.icon = leaflet.Icon.Default
          track.setStyle({ color: 'red' })
          if (l.eachLayer) l.eachLayer(handleLayer)
          layersForTrip = layersForTrip.concat(l)
        })
        gpxTrack.bindPopup(`<h2>${gpxTrack.get_name()}</h2>`, { className: 'kml-popup' })
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
      map.fitBounds(featureGroup.getBounds(), { padding: [50, 50] })
      map.setZoom(16)
    }
  }, [map, tripName, forDownload])
}
