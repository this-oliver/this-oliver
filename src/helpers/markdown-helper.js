import MarkdDownIt from "markdown-it";
import Mila from "markdown-it-link-attributes";
import MIATTR from "markdown-it-attrs";

import HtmlSanitizer from "sanitize-html";

const initMarkDown = () => {
	let MD = new MarkdDownIt();

	MD.use(Mila, {
		attrs: {
			target: "_blank",
			rel: "noopener"
		}
	});

	MD.use(MIATTR, {
		allowedAttributes: ["id", "class"] // empty array = all attributes are allowed
	});

	return MD;
};

export const sanitizeHtml = (dirtyHtml) =>{
	let options = {
		allowedTags: ["b", "i", "em", "strong", "a", "hr"],
		allowedAttributes: {
			a: ["href"]
		},
		allowedIframeHostnames: ["www.youtube.com"],
		selfClosing: [
			"img",
			"br",
			"hr",
		]
	};
	return HtmlSanitizer(dirtyHtml, options);
};

export const getMarkdown = (text) =>{
	const MarkDown = initMarkDown();
	return MarkDown.render(text);
};

export const cleanMarkdown = (string) =>{
	string = Array.from(string);
	let text = "";

	for(let i = 0; i < string.length; i++){
		let char = string[i];

		if(char == "#"){
			string.splice(i, 1);
		}else if (i + 1 < string.length && char == "\\" && string[i + 1] == "n") {
			string.splice(i, 2);
		}else{
			text += char;
		}

	}

	return text;
};

