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

  // Adds highlight.js labels to pre & code tags
  renderer.code = (code, language) => {
    if (language) {
      language = highlight.getLanguage(language)?.name?.toLowerCase() || "plaintext";
    }

    return `<pre class="snippet"><code class="hljs language-${language}">${code}</code></pre>`;
  };

  // Adds ids to headings
  renderer.heading = (text, level) => {
    const escapedText = text.toLowerCase().replace(/\W+/g, "-");
    const anchor = `<span class="parsed-header-anchor"><a href="#${escapedText}" class="simple-link">#</a></span>`;

    return props.disableAnchors
      ? `<h${level} id="${escapedText}" class="parsed-header">${text}</h${level}>`
      : `<h${level} id="${escapedText}" class="parsed-header">${anchor} ${text}</h${level}>`;
  };

  // Opens external links in new tab
  renderer.link = (href, _title, linkText) => {
    return `<a class="link" href="${href}" target="_blank">${linkText}</a>`;
  };

  return renderer;
}

/**
 * Returns a sanitized html string
 */
function _sanitizeHtml(dirtyHtml: string): string {
  return sanitizeHtml(dirtyHtml, {
    allowedTags: [...sanitizeHtml.defaults.allowedTags, "img"],
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      "a": ["href", "target", "name", "class"],
      "p": ["class"],
      "ul": ["class"],
      "ol": ["class"],
      "li": ["class"],
      "h*": ["class"]
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
