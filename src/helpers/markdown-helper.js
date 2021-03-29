import MarkdDownIt from "markdown-it";
import Mila from "markdown-it-link-attributes";

import HtmlSanitizer from "sanitize-html";

const initMarkDown = () => {
	let MD = new MarkdDownIt();

	MD.use(Mila, {
		attrs: {
			target: "_blank",
			rel: "noopener"
		}
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
