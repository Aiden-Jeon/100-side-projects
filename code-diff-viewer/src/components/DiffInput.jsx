import { useState } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism.css';

const LANGUAGES = [
  'javascript', 'typescript', 'python', 'java', 'cpp', 'c',
  'csharp', 'ruby', 'go', 'rust', 'php', 'swift',
  'kotlin', 'html', 'css', 'json', 'yaml', 'markdown'
];

// Map language names to Prism language keys
const LANGUAGE_MAP = {
  'javascript': 'javascript',
  'typescript': 'typescript',
  'python': 'python',
  'java': 'java',
  'cpp': 'cpp',
  'c': 'c',
  'csharp': 'csharp',
  'ruby': 'ruby',
  'go': 'go',
  'rust': 'rust',
  'php': 'php',
  'swift': 'swift',
  'kotlin': 'kotlin',
  'html': 'markup',
  'css': 'css',
  'json': 'json',
  'yaml': 'yaml',
  'markdown': 'markdown'
};

const DEFAULT_BEFORE = `function hello() {
  console.log("Hello");
  return true;
}`;

const DEFAULT_AFTER = `function hello(name) {
  console.log("Hello, " + name);
  return true;
}`;

function DiffInput({ onGenerateDiff }) {
  const [beforeCode, setBeforeCode] = useState(DEFAULT_BEFORE);
  const [afterCode, setAfterCode] = useState(DEFAULT_AFTER);
  const [filename, setFilename] = useState('example.js');
  const [language, setLanguage] = useState('javascript');

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerateDiff({
      beforeCode,
      afterCode,
      filename,
      language
    });
  };

  const handleClear = () => {
    setBeforeCode('');
    setAfterCode('');
    setFilename('example.js');
    setLanguage('javascript');
  };

  const highlightCode = (code) => {
    try {
      const prismLanguage = LANGUAGE_MAP[language] || 'javascript';
      const grammar = languages[prismLanguage];
      if (grammar) {
        return highlight(code, grammar, prismLanguage);
      }
    } catch (error) {
      console.warn('Highlighting failed for', language, error);
    }
    return code;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        Input Code
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="filename" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Filename
            </label>
            <input
              type="text"
              id="filename"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="example.js"
            />
          </div>

          <div>
            <label htmlFor="language" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Language
            </label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              {LANGUAGES.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="beforeCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Before Code
            </label>
            <div className="border border-gray-300 rounded-md shadow-sm focus-within:ring-2 focus-within:ring-blue-500 dark:border-gray-600 overflow-hidden">
              <Editor
                value={beforeCode}
                onValueChange={setBeforeCode}
                highlight={highlightCode}
                padding={12}
                style={{
                  fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
                  fontSize: 14,
                  minHeight: '240px',
                  backgroundColor: '#f9fafb',
                }}
                className="code-editor"
                placeholder="Enter original code..."
              />
            </div>
          </div>

          <div>
            <label htmlFor="afterCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              After Code
            </label>
            <div className="border border-gray-300 rounded-md shadow-sm focus-within:ring-2 focus-within:ring-blue-500 dark:border-gray-600 overflow-hidden">
              <Editor
                value={afterCode}
                onValueChange={setAfterCode}
                highlight={highlightCode}
                padding={12}
                style={{
                  fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
                  fontSize: 14,
                  minHeight: '240px',
                  backgroundColor: '#f9fafb',
                }}
                className="code-editor"
                placeholder="Enter modified code..."
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200"
          >
            Show Diff
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="px-6 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-3 rounded-md transition-colors duration-200 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}

export default DiffInput;
