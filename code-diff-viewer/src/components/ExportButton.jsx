import { useState } from 'react';

function ExportButton({ diffHtml, filename = 'diff' }) {
  const [exporting, setExporting] = useState(false);

  const handleExport = () => {
    setExporting(true);

    try {
      // Create a complete HTML document with embedded CSS
      const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Code Diff - ${filename}</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/diff2html/bundles/css/diff2html.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
      margin: 0;
      padding: 20px;
      background-color: #f5f5f5;
    }
    .container {
      max-width: 1400px;
      margin: 0 auto;
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    h1 {
      margin-top: 0;
      color: #333;
    }
    .info {
      color: #666;
      font-size: 14px;
      margin-bottom: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Code Diff: ${filename}</h1>
    <div class="info">Generated on ${new Date().toLocaleString()}</div>
    ${diffHtml}
  </div>
</body>
</html>`;

      // Create a blob and download
      const blob = new Blob([fullHtml], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${filename}-diff.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setTimeout(() => setExporting(false), 1000);
    } catch (err) {
      console.error('Failed to export:', err);
      setExporting(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={!diffHtml}
      className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
        !diffHtml
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
          : exporting
          ? 'bg-blue-600 text-white'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
      }`}
    >
      {exporting ? '✓ Exported!' : 'Export HTML'}
    </button>
  );
}

export default ExportButton;
