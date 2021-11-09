import tinycolor from "tinycolor2";

function getColor(value){
	if(value){
		return tinycolor(value);
	}

	else {
		return tinycolor();
	}
}

export default {
	getRandomHexColor() {
		const color = getColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`);

		while(color.isDark()){
			color.lighten();
		}

		return color.toHexString();
	}
};
