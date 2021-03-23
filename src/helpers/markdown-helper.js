import HtmlSanitizer from "sanitize-html";
import Marked from "marked";

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
	return Marked(text);
};
