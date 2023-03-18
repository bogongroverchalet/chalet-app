import { renderToString } from 'react-dom/server'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import leaflet from 'leaflet'
import 'leaflet/dist/leaflet.css'

leaflet.Icon.Default = leaflet.DivIcon.extend({
  html: renderToString(<FontAwesomeIcon icon={faLocationDot} className='text-3xl text-black-700' />),
  iconSize: [20, 20],
  iconAnchor: [10, 33],
})

leaflet.Marker.prototype.options.icon = leaflet.Icon.DefaultInstance = new leaflet.Icon.Default({
  html: renderToString(<FontAwesomeIcon icon={faLocationDot} className='text-3xl text-black-700' />),
})
