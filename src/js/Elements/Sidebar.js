import Chart from 'chartjs';
import chroma from 'chroma-js';

const SIDEBAR_WIDTH_STRING = '-40%';

/** sidebar controls */
class Sidebar {
	constructor() {
		// sidebar dom element
		this.sidebar = document.getElementById('sidebar');
		this.content = document.getElementById('sidebar_content');
		this.close = document.getElementById('sidebar_close');

		// sidebar width stuff, depends on the screen size
		this.sidebarWidth = SIDEBAR_WIDTH_STRING;
		if (window.innerWidth <= 800 ) this.sidebarWidth = '-100%';
	}

	/** show marker's data */
	showData(obj) {
		// insert html code
		let stats = this.getStats(obj.geojson)
		this.content.innerHTML = this.constructHTML({stats});

		console.log(stats);

		// show doughnut chart
		let ctx = document.getElementById('sidebar_chart').getContext('2d');
		this.doughnutChart = new Chart(ctx, {
			type: 'doughnut',
			data: {
				labels: Object.keys(stats),
				datasets: [{
					data: Object.values(stats),
					backgroundColor: chroma.scale(['#3f51b5','#00bcd4']).colors(Object.keys(stats).length),
				}]
			},
			//options: options
		});

		// init close button
		this.close.addEventListener('click', function() {
			this.hide();
		}.bind(this));
	}

	/** calculate occurrences */
	getStats(data) {
		let stats = {};
		data.map(feature => feature.properties.class).forEach(el => { stats[el] = (stats[el]) ? stats[el] + 1 : 1 })
		return stats;
	}

	/** return sidebar HTML */
	constructHTML() {
		return `
			<div id="sidebar_image_block">
				<img src="//www.greenpeace.org/usa/wp-content/uploads/2020/02/GP0STSJUV_Medium_res_with_credit_line.jpg" class="sidebar_image"/>
			</div>
			<div id="sidebar_header"><h2>Sightings summary</h2></div>
			<canvas id="sidebar_chart" width="400" height="400"></canvas>
			<div id="sidebar_text">
				<p>As part of the <a href="https://www.greenpeace.org/international/act/protect-the-oceans/" target="_blank">Protect the Oceans</a> campaign, Greenpeace has implemented a scientific research programme to document biodiversity throughout the Atlantic and is now continuing this work in the Indian Ocean with the <a href="https://www.greenpeace.org/international/tag/arctic-sunrise/" target="_blank">Arctic Sunrise</a> ship, a 50 meters vessel designed as an ice breaker.</p>
				<p>Our research is carried out by an international team of scientists and collaborators with the aim of collecting valuable data to help understand some of the most remote regions of our ocean.</p>
			</div>
		`;
	}

	/** hide sidebar */
	hide() {
		this.sidebar.style.setProperty('margin-right', this.sidebarWidth);
	}
	/** show sidebar */
	show() {
		this.sidebar.style.setProperty('margin-right', '0%');
	}
}

export default Sidebar;