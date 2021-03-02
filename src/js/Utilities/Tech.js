/** google xml to js object converter */
export function xml2obj(data) {
	// first parse the xml | papaparse alternative
	let jsonData = JSON.parse(data.request.response);
	let rows = jsonData.feed.entry

	// foreach row
	let finalObj = [];
	rows.forEach(function(row, i) {
		// foreach column
		let finalObjRow = {};
		for (const [key, value] of Object.entries(row)) {
			if (key.includes('gsx$')) finalObjRow[key.split('$')[1]] = value['$t'];
		}
		finalObj.push(finalObjRow);
	})

	return finalObj;
}

/** js object to geojson */
export function obj2geojson(obj) {
	let geojson = {"type":"FeatureCollection", "features":[]};
	obj.forEach(el => {
		if (el.latitude && el.longitude) {
			geojson.features.push({
				"type":"Feature",
				"geometry":{
					"type":"Point",
					"coordinates":[parseFloat(el.longitude), parseFloat(el.latitude)]
				},
				"properties": el
			});
		}
	});
	return geojson;
}

/** remove special characters, whitespaces, etc */
export function getAlphaNumeric(string) {
	return string.replaceAll(/([^\w])+/gi, '').toLowerCase();
}