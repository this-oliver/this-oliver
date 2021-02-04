import htmlSanitizer from "sanitize-html";

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
	return htmlSanitizer(dirtyHtml, options);
};
