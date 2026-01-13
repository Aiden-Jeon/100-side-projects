import { useEffect, useRef, useState } from 'react';
import { html } from 'diff2html';
import 'diff2html/bundles/css/diff2html.min.css';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import ViewToggle from './ViewToggle';
import CopyButton from './CopyButton';
import ExportButton from './ExportButton';

function DiffViewer({ files, viewType, onViewTypeChange, plainTextDiff, language, filename }) {
  const diffContainerRef = useRef(null);
  const [renderedHtml, setRenderedHtml] = useState('');

  useEffect(() => {
    if (diffContainerRef.current && plainTextDiff) {
      console.log('DiffViewer: Highlighting with language:', language);
      console.log('Language available:', hljs.getLanguage(language));

      try {
        // Custom highlight function for diff2html
        const highlightCode = (code) => {
          if (language && hljs.getLanguage(language)) {
            try {
              return hljs.highlight(code, { language }).value;
            } catch (e) {
              console.warn('Highlighting failed:', e);
              return code;
            }
          }
          return code;
        };

        // Generate HTML from the diff with syntax highlighting
        const diffHtml = html(plainTextDiff, {
          drawFileList: false,
          matching: 'lines',
          outputFormat: viewType === 'split' ? 'side-by-side' : 'line-by-line',
          highlight: true,
          renderNothingWhenEmpty: false,
          compiledTemplates: {},
          rawTemplates: {},
        });

        diffContainerRef.current.innerHTML = diffHtml;

        // Apply syntax highlighting to code blocks
        if (language && hljs.getLanguage(language)) {
          // Handle both unified and split view
          const codeLineContents = diffContainerRef.current.querySelectorAll('.d2h-code-line-ctn');

          codeLineContents.forEach((codeLineContent) => {
            // Get the prefix (diff marker) and code separately
            const prefix = codeLineContent.querySelector('.d2h-code-line-prefix');
            const prefixText = prefix ? prefix.textContent : '';

            // Get just the code content
            let codeText = codeLineContent.textContent || '';

            // Remove the prefix character if it's at the start
            if (prefixText && codeText.startsWith(prefixText)) {
              codeText = codeText.substring(prefixText.length);
            }

            if (codeText.trim()) {
              try {
                // Highlight the code
                const result = hljs.highlight(codeText, { language, ignoreIllegals: true });

                // Clear and rebuild
                codeLineContent.innerHTML = '';
                codeLineContent.style.whiteSpace = 'pre';

                // Add prefix if exists
                if (prefixText) {
                  const prefixSpan = document.createElement('span');
                  prefixSpan.textContent = prefixText;
                  prefixSpan.className = 'd2h-code-line-prefix';
                  codeLineContent.appendChild(prefixSpan);
                }

                // Add highlighted code
                const codeElement = document.createElement('code');
                codeElement.className = `hljs language-${language}`;
                codeElement.style.whiteSpace = 'pre';
                codeElement.style.background = 'transparent';
                codeElement.innerHTML = result.value;
                codeLineContent.appendChild(codeElement);
              } catch (e) {
                console.warn('Line highlight failed:', e);
              }
            }
          });
        }

        // Save the rendered HTML for export
        setRenderedHtml(diffContainerRef.current.innerHTML);
      } catch (error) {
        console.error('Error rendering diff:', error);
        diffContainerRef.current.innerHTML = '<p class="text-red-500">Error rendering diff</p>';
      }
    }
  }, [plainTextDiff, viewType, language]);

  if (!plainTextDiff) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="text-center text-gray-500 dark:text-gray-400 py-12">
          <p className="text-lg">No diff to display</p>
          <p className="text-sm mt-2">Enter before and after code, then click "Show Diff"</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Diff View
        </h2>
        <div className="flex gap-3">
          <ViewToggle viewType={viewType} onViewTypeChange={onViewTypeChange} />
          <CopyButton textToCopy={plainTextDiff} />
          <ExportButton diffHtml={renderedHtml} filename={filename?.replace(/\.[^/.]+$/, '') || 'code-diff'} />
        </div>
      </div>

      <div
        ref={diffContainerRef}
        className="diff-container overflow-x-auto"
      />
    </div>
  );
}

export default DiffViewer;
