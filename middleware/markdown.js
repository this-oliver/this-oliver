import MarkdDownIt from "markdown-it";
import Mila from "markdown-it-link-attributes";
import MIATTR from "markdown-it-attrs";

import HtmlSanitizer from "sanitize-html";

const initMarkDown = () => {
	const MD = new MarkdDownIt();

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

/**
 * Returns sanitized html
 * @param {String} dirtyHtml - html
 * @returns {String}
 */
export const sanitizeHtml = (dirtyHtml) => {
	if (!dirtyHtml) {
		throw new Error("(Markdown Error) Missing dirty html");
	}

	const options = {
		allowedTags: ["b", "i", "em", "strong", "a", "hr"],
		allowedAttributes: {
			a: ["href"]
		},
		allowedIframeHostnames: ["www.youtube.com"],
		selfClosing: ["img", "br", "hr"]
	};
	return HtmlSanitizer(dirtyHtml, options);
};

/**
 * Returns markdown render of text
 * @param {String} text - text
 * @returns {String}
 */
export const getMarkdown = (text) => {
	if (!text) {
		throw new Error("(Markdown Error) Missing text");
	}

	const MarkDown = initMarkDown();
	return MarkDown.render(text);
};

/**
 * Returns clean markdown
 * @param {String} text - markdown text
 * @returns {String}
 */
export const cleanMarkdown = (text) => {
	if (!text) {
		throw new Error("(Markdown Error) Missing text");
	}

	text = Array.from(text);
	let value = "";

	for (let i = 0; i < text.length; i++) {
		const char = text[i];

		if (char === "#") {
			text.splice(i, 1);
		} else if (
			i + 1 < text.length &&
			char === "\\" &&
			text[i + 1] === "n"
		) {
			text.splice(i, 2);
		} else {
			value += char;
		}
	}

	return value;
};
