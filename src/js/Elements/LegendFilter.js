import {getAlphaNumeric} from '../Utilities/Tech';

class LegendFilter {
	constructor(props) {
		// set default params
		this.block = document.getElementById('filter_legend');
		this.toggleState = {};

		//events
		this.onToggle = props.onToggle;
		this.createMainBlocks();
	}
	
	// hide and show the filterlegend block
	hide() {
		this.block.style.visibility = 'hidden';
		this.block.style.opacity = 0;
	}
	show() {
		this.block.style.display = 'visible';
		this.block.style.opacity = 1;
	}

	/** create the structure of the legend block */
	createMainBlocks() {
		// close button
		this.close = document.createElement('div');
		this.close.id = 'filter_close';
		this.close.className = 'close';
		this.close.onclick = function() { this.hide() }.bind(this)

		// create title
		this.title = document.createElement('div');
		this.title.className = 'filter_title';
		this.title.innerText = 'Sightings';

		// create addition line
		this.addition = document.createElement('div');
		this.addition.className = 'filter_addition';
		this.addition.innerText = 'slide toggles and hover over map to investigate sightings';

		// append to the block
		this.block.appendChild(this.close);
		this.block.appendChild(this.title);
		this.block.appendChild(this.addition);
	}

	/** show categories */
	initCategories(categories) {
		// get default settings
		// create a list of categories
		this.elements = document.createElement('div');
		this.elements.className = 'filter_categories';

		
		let classes = new Set(categories.map(el => el.class));
		// create a toggle element for each category
		[...classes].forEach(function(className) {
			let alphaNumClass = getAlphaNumeric(className);

			// element block that will host stuff inside
			let row = document.createElement('div');
				row.className = 'layers_el';

			// this one contains the icon and the name
			let layerName = document.createElement('div')
				layerName.className = 'layer_name';
				layerName.innerHTML = `
					<div class="legend_icon legend_icon_${alphaNumClass}"></div>
					<div class="legend_title" id="legend_title_${alphaNumClass}">${className}</div>
				`;

			// now the block with all the toggle stuff, design elements first
			let layerToggleBlock = document.createElement('div');
				layerToggleBlock.className = 'toggle';
				layerToggleBlock.innerHTML = `<b class="b switch"></b><b class="b track"></b>`;
			
			// and then the input for the toggle
			let layerToggle = document.createElement('input');
				layerToggle.className = 'category_switch check'
				layerToggle.dataset.category = alphaNumClass;
				layerToggle.type = 'checkbox';
				layerToggle.checked = true;
			this.toggleState[alphaNumClass] = true;
			
			// on toggle change event
			layerToggle.onclick = function() {
				this.toggleState[alphaNumClass] = layerToggle.checked;
				this.onToggle(this.toggleState);
			}.bind(this);

			// append toggle itself to the toggle block
			layerToggleBlock.prepend(layerToggle);

			// now append layer name and the toggle to the row
			row.appendChild(layerName);
			row.appendChild(layerToggleBlock);

			// and finally add this category to the full list
			this.elements.appendChild(row);
		}.bind(this))

		this.block.appendChild(this.elements);
	}
}
export default LegendFilter;