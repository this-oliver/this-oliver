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
	// check if text is html
	const htmlRegex = /<[^>]*>/;
	return htmlRegex.test(text);
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
 * @param {Boolean} options.tableStyle - style table elements
 * @param {Boolean} options.darkMode - dark mode
 * @returns {String} html
 */
export function MarkdownToHtml (
	text = "",
	{ sanitize = false, highlight = true, tableStyle = true, darkMode = false } = {}
) {
	// styling
	const color = darkMode ? "#fff" : "#000";
	const css = {
		table: `border: 1px solid ${color}; padding: 0 0.5rem; overflow-x: auto; white-space: pre; word-wrap: normal;`,
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
			function getHeaderClass(classLevel) {
				switch (classLevel) {
				case 1:
					// header
					return "article-section";
				case 2:
					// sub header
					return "article-subsection";
				default:
					// sub sub header
					return "article-subsection";
				}
			}
			return `<h${level} class="${getHeaderClass(level)}">${text}</h${level}>`;
		},
		link(href, title, text) {
			return `<a href="${href} target="_blank">${text}</a>`;
		},
		table(header, body) {
			// add border to tables
			return `<table style="${css.table}">${header}${body}</table>`;
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
		}
	};

	if (!sanitize) delete renderer.html;
	if (!highlight) delete renderer.code;
	if (!tableStyle) delete renderer.table;

	Marked.use({ renderer });

	// convert markdown to html
	return Marked.parse(text || "");
};

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
			a: ["href", "name", "target"],
			img: ["src", "srcset", "alt", "title", "width", "height", "loading"],
			pre: ["style", "class"],
			code: ["style", "class"],
			th: ["style"],
			td: ["style"]
		}
	});
};
