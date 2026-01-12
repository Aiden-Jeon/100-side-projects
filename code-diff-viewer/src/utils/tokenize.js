import Prism from 'prismjs';
// Import C before C++ due to dependencies
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-swift';
import 'prismjs/components/prism-kotlin';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-markdown';

/**
 * Tokenize code for syntax highlighting
 * @param {Array} hunks - Diff hunks
 * @param {string} language - Programming language for syntax highlighting
 * @returns {Object} Tokenized code
 */
export function tokenize(hunks, language = 'javascript') {
  if (!hunks || hunks.length === 0) {
    return {};
  }

  const tokens = {};

  hunks.forEach(hunk => {
    hunk.changes.forEach(change => {
      const code = change.content.slice(1); // Remove the leading +/- or space

      try {
        const grammar = Prism.languages[language] || Prism.languages.javascript;
        const highlighted = Prism.tokenize(code, grammar);

        tokens[change.content] = highlighted;
      } catch (error) {
        console.warn('Failed to tokenize:', error);
        tokens[change.content] = [code];
      }
    });
  });

  return tokens;
}
