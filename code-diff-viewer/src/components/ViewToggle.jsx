function ViewToggle({ viewType, onViewTypeChange }) {
  return (
    <div className="inline-flex rounded-md shadow-sm" role="group">
      <button
        type="button"
        onClick={() => onViewTypeChange('unified')}
        className={`px-4 py-2 text-sm font-medium border ${
          viewType === 'unified'
            ? 'bg-blue-600 text-white border-blue-600'
            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600'
        } rounded-l-lg transition-colors duration-200`}
      >
        Unified
      </button>
      <button
        type="button"
        onClick={() => onViewTypeChange('split')}
        className={`px-4 py-2 text-sm font-medium border-t border-b border-r ${
          viewType === 'split'
            ? 'bg-blue-600 text-white border-blue-600'
            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600'
        } rounded-r-lg transition-colors duration-200`}
      >
        Split
      </button>
    </div>
  );
}

export default ViewToggle;
