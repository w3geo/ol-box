import 'ol/ol.css';
import { Map, View } from 'ol';
import { apply } from 'ol-mapbox-style';
import LayerGroup from 'ol/layer/Group';
import Link from 'ol/interaction/Link';
import { useGeographic } from 'ol/proj';

useGeographic();

const map = new Map({
  target: 'map',
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
});

function setStyle(style) {
  const layerGroup = new LayerGroup();
  apply(layerGroup, style);
  map.setLayerGroup(layerGroup);
}

map.addInteraction(new Link());

window.parent.addEventListener('message', (event) => {
  if (event.data.type === 'style') {
    setStyle(event.data.style);
  }
});

const query = new URLSearchParams(window.location.search);
if (query.has('style')) {
  setStyle(query.get('style'));
}
