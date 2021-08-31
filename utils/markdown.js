import Marked from "marked";
import SanitizeHtml from "sanitize-html";

/**
 * RenderConfig is a Marked renderer config that styles
 * markdown headers and links so that they match the app's
 * existing style
 */
const renderConfig = {
	heading (text, level) {
		function getHeaderClass (classLevel) {
			switch (classLevel) {
			case 1:
				return "article-section";
			case 2:
				return "article-subsection";
			default:
				return "article-subsection";
			}
		}

		return `
            <h${level} class="${getHeaderClass(level)}">
              ${text}
            </h${level}>`;
	},
	link (href, title, text) {
		return `
            <a href="${href} target="_blank">
              ${text}
            </a>`;
	}
};

/**
 * liteRenderConfig is a Marked renderer config that hides certain
 * markdown properties (like headers). This config is meant for
 * descriptive purposes like article card descriptions
 */
const liteRenderConfig = {
	// hide headers
	heading (text, level) {
		return "";
	},
	// show links
	link (href, title, text) {
		return `
            <a href="${href} target="_blank">
              ${text}
            </a>`;
	}
};

/**
 * Converts markdown into html
 * @param {String} text - text
 * @param {Boolean} lite - parse lightly
 * @returns {String}
 */
export const MarkdownToHtml = (text, lite = false) => {
	if (!text) {
		throw new Error("(Markdown Error) Missing text");
	}

	// get render config
	const renderer = lite ? liteRenderConfig : renderConfig;

	// set render config
	Marked.use({ renderer });

	// render markedown into html
	const dirtyHtml = Marked(text);

	// clean html
	const cleanHtml = SanitizeHtml(dirtyHtml);

	return cleanHtml;
};
