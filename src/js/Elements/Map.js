import L from 'leaflet';
import 'leaflet.markercluster';

import customPopup from './CustomPopup';
import {getAlphaNumeric} from '../Utilities/Tech';

/** Main map class */
class Map {
	constructor(props) {
		// events
		this.onDataControlClick = props.onDataControlClick;

		// map and the basemap
		this.map = L.map('map', {zoomControl:false}).setView([-9.21, 60.73], 7);
		this.basemap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}', {
			attribution: 'Tiles &copy; Esri',
			maxZoom: 10
		}).addTo(this.map);

		// readd zoom controls
		L.control.zoom({position: 'bottomleft'}).addTo(this.map);

		// marker clustering
		this.clusterGroup = L.markerClusterGroup({
			maxClusterRadius: 10,
			showCoverageOnHover: false
		});

		// attribution
		this.map.attributionControl.addAttribution('<a href="https://greenpeace.org/">Greenpeace</a> / <a href="https://maps.greenpeace.org/">Global Mapping Hub</a>');

		// default functions
		this.addControls();
	}

	/** Add custom map buttons/controls */
	addControls() {
		// button to show filters
		let legendDOM = document.getElementById('filter_legend');
		let filterButton = L.Control.extend({
			options: { position: 'topleft' },
			onAdd: function() {
				var button = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-custom-button leaflet-filter-btn');
				L.DomEvent.disableClickPropagation(button); // so you can't click through
				button.onclick = function() {
					legendDOM.style.visibility = 'visible';
					legendDOM.style.opacity = 1;
				}
				return button;
			}.bind(this)
		});
		this.map.addControl(new filterButton);

		// button to show sidebar
		let sidebarButton = L.Control.extend({
			options: { position: 'topright' },
			onAdd: function() {
				var button = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-custom-button leaflet-data-btn');
				L.DomEvent.disableClickPropagation(button); // so you can't click through
				button.onclick = function() { this.onDataControlClick() }.bind(this)
				return button;
			}.bind(this)
		});
		this.map.addControl(new sidebarButton);
	}

	/** Show geojson data on the map and apply filter if provided */
	showData(props) {
		// remove if already present
		if (this.sightings) {
			this.map.removeLayer(this.sightings);
			this.clusterGroup.clearLayers();
		}

		// add a new layer
		this.geojson = (props.geojson) ? props.geojson : this.geojson;
		this.sightings = new L.geoJSON(this.geojson, {
			renderer: L.canvas(),
			filter: function(feature, layer) {
				let className = getAlphaNumeric(feature.properties.class)
				return (props.filter) ? props.filter[className] : true;
			},
			onEachFeature: function (feature, layer) {
				layer.bindPopup(customPopup(feature.properties));
			},
			pointToLayer: function(feature, latlng) {
				let className = getAlphaNumeric(feature.properties.class)
				let marker = L.marker(latlng, {
					icon: L.divIcon({
						className: 'css_marker',
						html: `<div class="marker_icon marker_icon_${className}" id="marker_id_${feature.id}"></div>`,
						iconSize: [22,22]
					})
				});
				return marker;
			}
		});

		this.clusterGroup.addLayer(this.sightings);
		this.map.addLayer(this.clusterGroup);
	}
}

export default Map;