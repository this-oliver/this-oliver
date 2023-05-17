<script setup lang="ts">
// import 'highlight.js/styles/github.css' // light theme
import 'highlight.js/styles/github-dark.css' // dark theme
import highlight from 'highlight.js'
import highlightBash from 'highlight.js/lib/languages/bash'
import highlightJavascript from 'highlight.js/lib/languages/javascript'
import highlightTypescript from 'highlight.js/lib/languages/typescript'
import highlightPython from 'highlight.js/lib/languages/python'
import sanitizeHtml from 'sanitize-html'
import { marked } from 'marked'

const props = defineProps({
  markdown: {
    type: String,
    required: true
  },
  disableAnchors: {
    type: Boolean,
    default: false
  }
})

const renderedHtml = computed<string>(() => {
  return _markdownToHtml(props.markdown)
})

/**
 * Returns html string from markdown
 */
function _markdownToHtml (markdown: string, sanitize?: boolean) {
  if (!markdown) { return '' }

  const renderer = new marked.Renderer()

  /**
   * Adds highlight.js labels to pre & code tags
   */
  renderer.code = (code, language) => {
    if (language) {
      language = highlight.getLanguage(language)?.name?.toLowerCase() || 'plaintext'
    }

    return `<pre class="snippet"><code class="hljs language-${language}">${code}</code></pre>`
  }

  /**
   * Adds ids to headings
   */
  renderer.heading = (text, level) => {
    const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-')
    const anchor = `<span class="parsed-header-anchor"><a href="#${escapedText}" class="simple-link">#</a></span>`

    return props.disableAnchors
      ? `<h${level} id="${escapedText}" class="parsed-header">${text}</h${level}>`
      : `<h${level} id="${escapedText}" class="parsed-header">${anchor} ${text}</h${level}>`
  }

  /**
   * Opens external links in new tab
   */
  renderer.link = (href, _title, linkText) => {
    return `<a class="markdown-link" href="${href}" target="_blank">${linkText}</a>`
  }

  marked.use({ renderer })

  // convert markdown to html
  let compiledHtml: string = marked.parse(markdown)

  if (sanitize) {
    compiledHtml = _sanitizeHtml(compiledHtml)
  }

  return compiledHtml
}

/**
 * Returns a sanitized html string
 */
function _sanitizeHtml (dirtyHtml: string): string {
  return sanitizeHtml(dirtyHtml, {
    // eslint-disable-next-line import/no-named-as-default-member
    allowedTags: [...sanitizeHtml.defaults.allowedTags, 'img'],
    allowedAttributes: {
      a: ['href', 'name', 'target', '@click'],
      img: ['src', 'srcset', 'alt', 'title', 'width', 'height', 'loading'],
      pre: ['style', 'class'],
      code: ['style', 'class'],
      th: ['style'],
      td: ['style'],
      table: ['style'],
      hr: ['id', 'style'],
      h1: ['id', 'style'],
      h2: ['id', 'style'],
      h3: ['id', 'style'],
      h4: ['id', 'style'],
      h5: ['id', 'style'],
      h6: ['id', 'style'],
      p: ['style']
    }
  })
}

/**
 * Initialize highlighter
 */
function _initHighlighter () {
  highlight.registerLanguage('bash', highlightBash)
  highlight.registerLanguage('javascript', highlightJavascript)
  highlight.registerLanguage('typescript', highlightTypescript)
  highlight.registerLanguage('python', highlightPython)
}

watch(() => props.markdown, () => {
  highlight.highlightAll()
})

watch(() => renderedHtml, () => {
  highlight.highlightAll()
})

onMounted(() => {
  _initHighlighter()

  // wait 3 seconds for the markdown to render
  setTimeout(() => {
    highlight.highlightAll()
  }, 500)
})
</script>

<template>
  <div id="markdown-card">
    <!-- eslint-disable-next-line vue/no-v-html -->
    <span v-html="renderedHtml" />
  </div>
</template>

<style>
h1, h2, h3 {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

h4, h5, h6, p {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

pre {
  margin: 0.5rem 0;
  overflow: hidden;
  border-radius: 0.5rem;
}

code {
  font-size: small;
  padding: 0 0.5rem;
}

code:not(pre code) {
  padding: 0.15rem 0.25rem;
  overflow: hidden;
  border-radius: 0.25rem;
  color: beige;
  background-color: black;
}

hr {
  margin: 0.5rem 0;
}

table {
  display: block;
  overflow-x: auto;
  white-space: normal; /* alt: nowrap */
  overflow-wrap: normal; /* alt: break-word */

  color: beige;
  background-color: black;
}

th, td {
  border: 1px solid;
  padding: 0 0.5rem;
}
</style>
