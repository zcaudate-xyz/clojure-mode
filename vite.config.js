import analyze from "rollup-plugin-analyzer";

export default {
  base: './',
  optimizeDeps: {
    // avoids loading deps multiple time
    exclude: ['prosemirror-model', 'y-prosemirror', 'y-websocket'],
    // root: "demo"
  },
  build: {
    emptyOutDir: false,
    lib: {
      entry: 'dist/nextjournal/clojure_mode.mjs', // Main entry point for your library
      name: 'ClojureMode', // The name of the global variable in UMD build
      fileName: (format) => `clojure-mode.${format}.js`
    },
    rollupOptions: {
      plugins: [analyze()],
      output: {
        format: ['es', 'umd'], // Output both ES module and UMD formats
        globals: {
          '@codemirror/autocomplete': 'CodeMirror.autocomplete',
          '@codemirror/commands': 'CodeMirror.commands',
          '@codemirror/lang-markdown': 'CodeMirror.langMarkdown',
          '@codemirror/language': 'CodeMirror.language',
          '@codemirror/lint': 'CodeMirror.lint',
          '@codemirror/search': 'CodeMirror.search',
          '@codemirror/state': 'CodeMirror.state',
          '@codemirror/view': 'CodeMirror.view',
          '@lezer/common': 'lezer.common',
          '@lezer/generator': 'lezer.generator',
          '@lezer/highlight': 'lezer.highlight',
          '@lezer/lr': 'lezer.lr',
          '@lezer/markdown': 'lezer.markdown',
          '@nextjournal/lezer-clojure': 'lezerClojure',
          'markdown-it-footnote': 'markdownitFootnote',
          'squint-cljs': 'squint',
          'w3c-keyname': 'w3cKeyname'
        }
      },
      external: [
        /^@codemirror\/.*/,
        /^@lezer\/.*/,
        'w3c-keyname'
      ]
    }
  },
};
