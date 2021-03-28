import HtmlSanitizer from "sanitize-html";
import MarkdDownIt from "markdown-it";

const MarkDown = new MarkdDownIt();

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
	return MarkDown.render(text);
};
