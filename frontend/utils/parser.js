import { marked as Marked } from "marked";
import TurnDown from "turndown";
import HtmlSanitizer from "sanitize-html";

/**
 * Returns true if text is html
 *
 * @param {String} text - text
 * @returns {Boolean} true if text is html
 */
export function isHtml (text){
	// check if there is an html tag in the text and if it is not a code block or inline code
	return /<[^>]*>/.test(text) && !/(```|`)/.test(text);
}

/**
 * Converts html into markdown
 *
 * @param {String} html - html
 * @returns {String} markdown
 */
export function HtmlToMarkdown (html) {
	// configure turndown
	const turndownService = new TurnDown({
		headingStyle: "atx",
		emDelimiter: "*",
		strongDelimiter: "**",
		bulletListMarker: "-",
		codeBlockStyle: "fenced",
		fence: "```",
		hr: "---",
		linkStyle: "inlined"
	});

	return turndownService.turndown(html);
}

/**
 * Converts markdown into html
 *
 * @param {String} text - text
 * @param {Object} options - options
 * @param {Boolean} options.sanitize - sanitize html
 * @param {Boolean} options.highlight - highlight code
 * @param {Object} options.link - style link elements
 * @param {Boolean} options.link.openOutside - open links outside of app
 * @param {Object} options.table - style table elements
 * @param {Boolean} options.table.wrapText - wrap text in table elements
 * @param {Boolean} options.darkMode - dark mode
 * @returns {String} html
 */
export function MarkdownToHtml(
	text = "",
	{
		sanitize = false,
		highlight = true,
		link = { openOutside: true },
		table = { wrapText: true },
		darkMode = false
	} = {}
) {
	// styling
	const color = darkMode ? "#fff" : "#000";
	const css = {
		tableWrapper: `display: block; overflow-x: auto; white-space: ${table.wrapText ? "normal" : "nowrap"}; overflow-wrap: ${table.wrapText ? "break-word" : "normal"};`,
		tableElements: `border: 1px solid ${color}; padding: 0 0.5rem;`,
		pre: "overflow-x: auto; white-space: pre; word-wrap: normal;",
		code: "padding: 0.2rem 0;"
	};

	// configure marked
	Marked.setOptions({
		breaks: true
	});

	// configure marked
	const renderer = {
		html: (html) => {
			return SanitizeHtml(html);
		},
		heading(text, level) {
			const headerId = text.replace(/ /g, "-").toLowerCase();
			const headerStyle = "margin: 1rem 0 0.5rem 0;";

			return `<h${level} id="${headerId}" style="${headerStyle}">${text}</h${level}>`;
		},
		link(href, title, text) {
			return `<a href="${href}" target="${
				link.openOutside ? "_blank" : "_self"
			}">${text}</a>`;
		},
		table(header, body) {
			// add border to tables
			//return `<table style="${tableWrapper}">${header}${body}</table>`;
			return `<div style="${css.tableWrapper}"><table style="${css.tableWrapper}">${header}${body}</table></div>`;
		},
		tablecell(content, flags) {
			// add border to table cells
			const style = flags.align
				? `style="text-align:${flags.align} ${css.tableElements}"`
				: `style="${css.tableElements}"`;

			const type = flags.header ? "th" : "td";
			return `<${type} ${style}>${content}</${type}>`;
		},
		code(code, language) {
			// add border to code blocks
			return `<pre class="language-${language}" style="${css.pre}"><code class="language-${language}" style="${css.code}">${code}</code></pre>`;
		},
		hr() {
			const style = "margin: 1rem 0;";
			return `<hr style="${style}">`;
		},
		image(href, title, text) {
			const imageClass = "";
			const imageStyle = "max-width: 100%;";
			return `<img src="${href}" alt="${text}" title="${title}" style="${imageStyle}" class="${imageClass}">`;
		}
	};

	if (!sanitize) delete renderer.html;
	if (!highlight) delete renderer.code;

	Marked.use({ renderer });

	// convert markdown to html
	return Marked.parse(text || "");
};

/**
 * Returns a markdown table of contents
 *
 * @param {string} markdown - markdown
 * @param {Object} options - options
 * @param {number} options.maxDepth - max depth of headers to include in table of contents
 * @param {boolean} options.renderAsList - render table of contents as a numbered list
 * @returns {string} markdown table of contents
 */
export function getMarkdownTableOfContents(
	markdown,
	{ maxDepth = 2, renderAsList = true } = {}
) {
	// setup regex for headers
	const headerRegex = /(^#{1,6})\s(.*)/gm;

	// get all headers from markdown up to maxDepth
	const headers = [];
	let match;
	while ((match = headerRegex.exec(markdown)) !== null) {
		const depth = match[1].length;
		if (depth <= maxDepth) headers.push({ depth, text: match[2] });
	}

	let toc;
	if (renderAsList) {
		// render table of contents as a list
		toc = "**Table of Contents**\n";
		headers.forEach((header, index) => {
			const headerId = header.text.replace(/ /g, "-").toLocaleLowerCase();
			const item = `${index + 1}. [${header.text}](#${headerId})\n`;
			toc += item;
		});
	} else {
		// render table of contents as a table
		toc = "| # | Header |\n| - | ------ |\n";
		headers.forEach((header, index) => {
			const headerId = header.text.replace(/ /g, "-").toLocaleLowerCase();
			const item = `| ${index + 1} | [${header.text}](#${headerId}) |\n`;
			toc += item;
		});
	}

	return toc;
}

/**
 * Returns a sanitized html document
 *
 * @param {String} dirtyHtml - html
 * @returns {String} sanitized html
 */
export function SanitizeHtml (dirtyHtml) {
	return HtmlSanitizer(dirtyHtml, {
		allowedTags: [...HtmlSanitizer.defaults.allowedTags, "img"],
		allowedAttributes: {
			a: ["href", "name", "target", "@click"],
			img: ["src", "srcset", "alt", "title", "width", "height", "loading"],
			pre: ["style", "class"],
			code: ["style", "class"],
			th: ["style"],
			td: ["style"],
			table: ["style"],
			hr: ["id", "style"],
			h1: ["id", "style"],
			h2: ["id", "style"],
			h3: ["id", "style"],
			h4: ["id", "style"],
			h5: ["id", "style"],
			h6: ["id", "style"]
		}
	});
};
