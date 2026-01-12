import { useState } from 'react';
import DiffInput from './components/DiffInput';
import DiffViewer from './components/DiffViewer';
import { generatePlainTextDiff } from './utils/diffUtils';

function App() {
  const [viewType, setViewType] = useState('unified');
  const [plainTextDiff, setPlainTextDiff] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [filename, setFilename] = useState('example.js');

  const handleGenerateDiff = ({ beforeCode, afterCode, filename, language }) => {
    try {
      const plainDiff = generatePlainTextDiff(beforeCode, afterCode, filename);

      setPlainTextDiff(plainDiff);
      setLanguage(language);
      setFilename(filename);
    } catch (error) {
      console.error('Error generating diff:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Code Diff Viewer
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Compare code changes in unified or split view with git-style formatting
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Input Section */}
          <div>
            <DiffInput onGenerateDiff={handleGenerateDiff} />
          </div>

          {/* Diff Display Section */}
          <div>
            <DiffViewer
              viewType={viewType}
              onViewTypeChange={setViewType}
              plainTextDiff={plainTextDiff}
              language={language}
              filename={filename}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 text-center text-gray-500 dark:text-gray-400 text-sm">
        <p>Built with React, Vite, and Tailwind CSS</p>
      </footer>
    </div>
  );
}

export default App;
