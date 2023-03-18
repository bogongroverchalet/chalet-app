import { FeatureGroup } from 'react-leaflet'
import { EditControl } from 'react-leaflet-draw'
import 'leaflet-draw/dist/leaflet.draw.css'
import fileDownload from 'js-file-download'
import togpx from 'togpx'

export default function EditControls({ tripName }) {
  const save = ({ layers, layer = layers }) => {
    const trip = togpx(layer.toGeoJSON(), { featureTitle: () => tripName })
    fileDownload(trip, `${tripName}.gpx`)
  }
  return (
    <FeatureGroup>
      <EditControl
        position='topright'
        onCreated={save}
        onEdited={save}
        draw={{
          rectangle: false,
          circle: false,
          circlemarker: false,
          polygon: false,
        }}
        edit={{}}
      />
    </FeatureGroup>
  )
}
