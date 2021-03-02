class Intro {
	constructor() {
		this.intro = document.getElementById('intro_wrapper');
		this.close_btn = document.getElementById('intro_btn');
		this.close_btn.onclick = () => {this.hide()}
	}
	hide() {
		this.intro.style.display = 'none';
	}
	show() {
		this.intro.style.display = 'block';
	}
}

export default Intro