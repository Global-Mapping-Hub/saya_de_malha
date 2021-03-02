function customPopup(props) {
	return `<div class="popup_photo_container">
				${(props.photoid) ? `<div class="popup_photo" style="background-image: url(${props.photoid}"></div>` : ''}
				<div class="popup_photo_text">${props.name}</div>
			</div>

			<div class="popup_content">
				${((props.date) ? `<div class="popup_el">
					<div class="popup_el_title">Date & Time:</div>
					<div class="popup_el_content">${props.date} ${(props.time)?props.time:''}</div>
				</div>` : '')}
				${((props.category) ? `<div class="popup_el">
					<div class="popup_el_title">Category:</div>
					<div class="popup_el_content">${(props.class !== 'bird') ? props.category.split('-')[1] : props.category}</div>
				</div>` : '')}
				${((props.name) ? `<div class="popup_el">
					<div class="popup_el_title">Scientific name:</div>
					<div class="popup_el_content">${props.name}</div>
				</div>` : '')}

				${((props.class) ? `<div class="popup_el">
					<div class="popup_el_title">Class:</div>
					<div class="popup_el_content">${props.class}</div>
				</div>` : '')}

				${((props.behaviour) ? `<div class="popup_el">
					<div class="popup_el_title">Behaviour:</div>
					<div class="popup_el_content">${props.behaviour}</div>
				</div>` : '')}

				${((props.number) ? `<div class="popup_el">
					<div class="popup_el_title">Best guess № of animals:</div>
					<div class="popup_el_content">${props.number}</div>
				</div>` : '')}
			</div>
	`;
}

export default customPopup; 