import { useState } from 'react';

function CopyButton({ textToCopy }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
        copied
          ? 'bg-green-600 text-white'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
      }`}
    >
      {copied ? '✓ Copied!' : 'Copy to Clipboard'}
    </button>
  );
}

export default CopyButton;
