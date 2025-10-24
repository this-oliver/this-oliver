<script setup lang="ts">
import highlight from "highlight.js";
import highlightBash from "highlight.js/lib/languages/bash";
import highlightJavascript from "highlight.js/lib/languages/javascript";
import highlightPython from "highlight.js/lib/languages/python";
import highlightTypescript from "highlight.js/lib/languages/typescript";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
import "highlight.js/styles/github.css"; // light theme
import "highlight.js/styles/github-dark.css"; // dark theme

const props = defineProps({
  markdown: {
    type: String,
    required: true
  },
  disableAnchors: {
    type: Boolean,
    default: false
  }
});

marked.setOptions({
  headerIds: false, // deprecated
  mangle: false // deprecated
});

/**
 * Returns rendered html from markdown.
 */
const renderedHtml = computed<string>(() => {
  // apply a custom renderer to the marked library
  marked.use({ renderer: _getMarkdownRenderer() });

  // convert markdown to html
  const compiledHtml: string = marked.parse(props.markdown || "");

  // returns sanitized html
  return _sanitizeHtml(compiledHtml);
});

/**
 * Returns a markdown renderer that has custom configurations (i.e. adds classes to parsed html tags)
 */
function _getMarkdownRenderer() {
  const renderer = new marked.Renderer();

  // Adds ids to headings
  renderer.heading = (text, level) => {
    const escapedText = text.toLowerCase().replace(/\W+/g, "-");
    const anchor = `<a class="link mr-1" href="#${escapedText}">#</a>`;

    const maxTextSize = 4;
    const textSize = maxTextSize - level;
    let textClass = "text-lg";

    if (textSize > 0) {
      textClass = `text-${textSize}xl`;
    } else if (textSize === 0) {
      textClass = "text-xl";
    }

    const baseClass = `${textClass} my-2`;

    return props.disableAnchors
      ? `<h${level} id="${escapedText}" class="${baseClass}">${text}</h${level}>`
      : `<h${level} id="${escapedText}" class="${baseClass}">${anchor}${text}</h${level}>`;
  };

  // Opens external links in new tab
  renderer.link = (href, _title, linkText) => {
    return `<a class="link" href="${href}" target="_blank">${linkText}</a>`;
  };

  // Adds styling to paragraphs
  renderer.paragraph = (text) => {
    return `<p class="my-2">${text}</p>`;
  };

  // Adds styling to strikethrough text
  renderer.del = (text) => {
    return `<span class="line-through">${text}</span>`;
  };

  // Adds styling to lists
  renderer.list = (body, ordered) => {
    const baseClass = "my-[1rem] pl-[1.5rem]";
    const tag = ordered ? "ol" : "ul";

    if (body.includes("<input")) {
      return `<${tag} class="list-none ${baseClass}">${body}</${tag}>`;
    }

    return ordered
      ? `<ol class="list-decimal ${baseClass}">${body}</ol>`
      : `<ul class="list-disc ${baseClass}">${body}</ul>`;
  };

  // Adds styling to list items
  renderer.listitem = (text) => {
    const baseClass = "my-1";

    return `<li class="${baseClass}">${text}</li>`;
  };

  // Supports checkboxes for task lists
  renderer.checkbox = (checked) => {
    return checked
      ? "<input type=\"checkbox\" disabled checked class=\"mr-2\"/>"
      : "<input type=\"checkbox\" disabled class=\"mr-2\"/>";
  };

  // Adds highlight.js labels to code blocks
  renderer.code = (code, language) => {
    if (language) {
      language = highlight.getLanguage(language)?.name?.toLowerCase() || "plaintext";
    }

    return `<pre class="snippet"><code class="hljs language-${language} my-[1rem] rounded-lg text-sm">${code}</code></pre>`;
  };

  // Adds highlight.js labels to inline code
  renderer.codespan = (code) => {
    return `<code class="hljs text-sm rounded-lg">${code}</code>`;
  };

  // Adds styling for blockquotes
  renderer.blockquote = (quote) => {
    return `<blockquote class="border-l-4 border-gray-300 pl-5 italic my-2">${quote}</blockquote>`;
  };

  // Adds styling for tables
  renderer.table = (header, body) => {
    const baseClass = "border border-gray-300";
    const tableClass = `table-auto border-collapse my-4 w-full ${baseClass}`;
    const headerClass = `${baseClass}`;
    const bodyClass = `${baseClass}`;

    return `<table class="${tableClass}"><thead class="${headerClass}">${header}</thead><tbody class="${bodyClass}">${body}</tbody></table>`;
  };

  // Adds styling for table cells
  renderer.tablecell = (content, flags) => {
    const baseClass = "border border-gray-300 p-2";

    return flags.header === true
      ? `<th class="font-bold text-left border-double border-2 ${baseClass}">${content}</th>`
      : `<td class="${baseClass}">${content}</td>`;
  };

  return renderer;
}

/**
 * Returns a sanitized html string
 */
function _sanitizeHtml(dirtyHtml: string): string {
  return sanitizeHtml(dirtyHtml, {
    allowedTags: [...sanitizeHtml.defaults.allowedTags, "img", "input"],
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      blockquote: ["class"],
      code: ["class"],
      h1: ["class", "id"],
      h2: ["class", "id"],
      h3: ["class", "id"],
      h4: ["class", "id"],
      h5: ["class", "id"],
      input: ["class", "type", "disabled", "checked"],
      li: ["class"],
      ol: ["class"],
      p: ["class"],
      pre: ["class"],
      span: ["class"],
      table: ["class"],
      tbody: ["class"],
      td: ["class"],
      th: ["class"],
      thead: ["class"],
      ul: ["class"]
    }
  });
}

/**
 * Initialize highlighter
 */
function _initHighlighter() {
  highlight.registerLanguage("bash", highlightBash);
  highlight.registerLanguage("javascript", highlightJavascript);
  highlight.registerLanguage("typescript", highlightTypescript);
  highlight.registerLanguage("python", highlightPython);
}

watch(() => props.markdown, () => {
  highlight.highlightAll();
});

watch(() => renderedHtml, () => {
  highlight.highlightAll();
});

onMounted(() => {
  _initHighlighter();

  // wait 3 seconds for the markdown to render
  setTimeout(() => {
    highlight.highlightAll();
  }, 500);
});
</script>

<template>
  <div id="markdown-card">
    <!-- eslint-disable-next-line vue/no-v-html -->
    <span v-html="renderedHtml" />
  </div>
</template>
