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
 * @param {String} markdown - markdown text
 * @param {Object} options - options
 * @param {Boolean} options.sanitize - sanitize html
 * @param {Boolean} options.highlight - highlight code
 * @param {Object} options.link - style link elements
 * @param {Boolean} options.link.openOutside - open links outside of app
 * @param {Object} options.table - style table elements
 * @param {Boolean} options.table.wrapText - wrap text in table elements
 * @param {Object} options.text - style text elements
 * @param {String} options.text.fontSize - font size of text elements
 * @param {Object} options.paragraph - style paragraph elements
 * @param {String} options.paragraph.fontSize - font size of paragraph elements
 * @param {Object} options.list - style list elements
 * @param {String} options.list.fontSize - font size of list elements
 * @param {Boolean} options.darkMode - dark mode
 * @returns {String} html
 */
export function MarkdownToHtml(
	markdown = "",
	{
		sanitize = false,
		highlight = true,
		link = { openOutside: true },
		table = { wrapText: false },
		text = { fontSize: "1.25rem"},
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
		heading(headerText, level) {
			const headerId = headerText.replace(/ /g, "-").toLowerCase();

			function getFontSize(level){
				// extract size from text.fontSize
				const size = text.fontSize ? text.fontSize.match(/\d+/)[0] : "1.25";
				// convert to number and maintain decimal
				const sizeNum = Number(size);

				switch (level) {
				case 1:
					return sizeNum / 0.45;
				case 2:
					return sizeNum / 0.55;
				case 3:
					return sizeNum / 0.65;
				case 4:
					return sizeNum / 0.75;
				default:
					return sizeNum / 0.80;
				}
			}

			const headerStyle = `font-size: ${getFontSize(level)}rem; padding: 1.15rem 0;`;

			return `<h${level} id="${headerId}" class="parsed-header" style="${headerStyle}">
			<span class="parsed-header-anchor"><a href="#${headerId}" class="simple-link">#</a></span>
			${headerText}
			</h${level}>`;
		},
		link(href, title, linkText) {
			return `<a href="${href}" target="${
				link.openOutside ? "_blank" : "_self"
			}">${linkText}</a>`;
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
		image(href, title, imageText) {
			const imageClass = "";
			const imageStyle = "max-width: 100%;";
			return `<img src="${href}" alt="${imageText}" title="${title}" style="${imageStyle}" class="${imageClass}">`;
		},
		paragraph(paragraphText) {
			const paragraphStyle = `font-size: ${text.fontSize ? text.fontSize : "1.25rem"}; line-height: 1.25;`;
			return `<p style="${paragraphStyle}">${paragraphText}</p>`;
		},
		list(body, ordered, start) {
			const listStyle = `font-size: ${text.fontSize ? text.fontSize : "1.25rem"};`;
			return `<${ordered ? "ol" : "ul"} class="mb-2" style="${listStyle}">${body}</${ordered ? "ol" : "ul"}>`;
		},
		listitem(text) {
			const listItemStyle = `font-size: ${text.fontSize ? text.fontSize : "1.25rem"};`;
			return `<li class="mb-2" style="${listItemStyle}">${text}</li>`;
		}
	};

	if (!sanitize) delete renderer.html;
	if (!highlight) delete renderer.code;

	Marked.use({ renderer });

	// convert markdown to html
	return Marked.parse(markdown || "");
};

function _getHeaders(markdown){
	const lines = markdown.split("\n");
	const headers = [];

	let isCodeBlock = false;

	for (const line of lines) {
		// Check if the line starts a code block
		if (line.trim().startsWith("```")) {
			isCodeBlock = !isCodeBlock;
			continue;
		}

		// If we're inside a code block, ignore the line
		if (isCodeBlock) {
			continue;
		}

		// Check if the line is a first-level header
		const match = line.trim().match(/^# (.+)/);
		if (match) {
			headers.push(match[1]);
		}
	}

	return headers;
}

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
	{ renderAsList = true } = {}
) {
	const headers = _getHeaders(markdown);
	if(headers.length === 0) return "";

	let toc;
	if (renderAsList) {
		// render table of contents as a list
		toc = "**Table of Contents**\n";
		headers.forEach((header, index) => {
			const headerId = header.replace(/ /g, "-").toLocaleLowerCase();
			const item = `${index + 1}. [${header}](#${headerId})\n`;
			toc += item;
		});
	} else {
		// render table of contents as a table
		toc = "| # | Header |\n| - | ------ |\n";
		headers.forEach((header, index) => {
			const headerId = header.replace(/ /g, "-").toLocaleLowerCase();
			const item = `| ${index + 1} | [${header}](#${headerId}) |\n`;
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
			h6: ["id", "style"],
			p: ["style"]
		}
	});
};
