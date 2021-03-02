import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import '../style.css';

import Map from './Elements/Map';
import Spinner from './Elements/Spinner';
import Intro from './Elements/Intro';
import DB from './Utilities/Database';
import LegendFilter from './Elements/LegendFilter';
import Sidebar from './Elements/Sidebar';

// loading progress
let spinner = new Spinner();

// sidebar with marker info
let sidebar = new Sidebar();

// map of sightings
let map = new Map({
	onDataControlClick: function() {
		sidebar.show();
	}
});

// filters
let filter = new LegendFilter({
	onToggle: function(status) {
		map.showData({
			filter: status
		});
	}
});

// load data
new DB('1fiVQYL6Fz5PolsXLdTLf1Pr51lE7fgaDFtdYiTeS0So', {
	onLoad: function(obj) {
		spinner.hide();
		map.showData({
			geojson: obj.geojson
		});
		sidebar.showData(obj);
		filter.initCategories(obj.categories);
	}
});

// show intro
let intro = new Intro();
	intro.show();