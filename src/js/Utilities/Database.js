import axios from 'axios';
import {xml2obj, obj2geojson} from './Tech';

/** Returns google spreadsheet url based on provided id and sheet num */
function getSpreadsheetURL(id, num) {
	return `https://spreadsheets.google.com/feeds/list/${id}/${num}/public/full?alt=json`
}

/** Requesting, processing and storing results from google spreadsheet */
class DB {
	constructor(sheetID, props) {
		// vars
		this.sheetID = sheetID;
		this.data = [];
		this.requestData();
		// events
		this.onLoad = props.onLoad;
	}

	requestData() {
		Promise.all([
			this.getSheetData(3), // categories/species
			this.getSheetData(5), // marine mammals
			this.getSheetData(6) // birds
		])
		.then(function(results) {
			// convert everything to js objects
			// first grab the categories
			let speciesData = xml2obj(results[0]);

			// convert xml to json object => concat features together
			let geojsonData = Object.values(results.slice(1,3)).map(entry => obj2geojson(xml2obj(entry)));
				geojsonData = geojsonData.reduce((acc,el) => {return acc.concat(el.features)}, []);
			// store
			this.data = {categories: speciesData, geojson: geojsonData};
			this.onLoad(this.data);
		}.bind(this));
	}

	getData() {
		return this.data;
	}

	getSheetData(sheetNumber) {
		return axios.get(getSpreadsheetURL(this.sheetID,sheetNumber));
	}
}

export default DB;