import { diffLines, structuredPatch } from 'diff';

/**
 * Convert diff changes to react-diff-view hunks format
 */
function convertToHunks(changes) {
  const hunks = [];
  let oldLineNum = 1;
  let newLineNum = 1;
  const hunkChanges = [];

  changes.forEach((change) => {
    const lines = change.value.split('\n').filter((line, idx, arr) => {
      // Keep empty lines except the last one if it's empty
      return line !== '' || idx < arr.length - 1;
    });

    lines.forEach((line) => {
      if (change.added) {
        hunkChanges.push({
          type: 'insert',
          isInsert: true,
          isDelete: false,
          isNormal: false,
          content: '+' + line,
          lineNumber: newLineNum,
          oldLineNumber: undefined,
          newLineNumber: newLineNum,
        });
        newLineNum++;
      } else if (change.removed) {
        hunkChanges.push({
          type: 'delete',
          isInsert: false,
          isDelete: true,
          isNormal: false,
          content: '-' + line,
          lineNumber: oldLineNum,
          oldLineNumber: oldLineNum,
          newLineNumber: undefined,
        });
        oldLineNum++;
      } else {
        hunkChanges.push({
          type: 'normal',
          isInsert: false,
          isDelete: false,
          isNormal: true,
          content: ' ' + line,
          lineNumber: oldLineNum,
          oldLineNumber: oldLineNum,
          newLineNumber: newLineNum,
        });
        oldLineNum++;
        newLineNum++;
      }
    });
  });

  if (hunkChanges.length > 0) {
    const oldStart = hunkChanges.find(c => c.oldLineNumber)?.oldLineNumber || 1;
    const newStart = hunkChanges.find(c => c.newLineNumber)?.newLineNumber || 1;
    const oldLines = hunkChanges.filter(c => c.type === 'normal' || c.type === 'delete').length;
    const newLines = hunkChanges.filter(c => c.type === 'normal' || c.type === 'insert').length;

    hunks.push({
      content: `@@ -${oldStart},${oldLines} +${newStart},${newLines} @@`,
      oldStart,
      oldLines,
      newStart,
      newLines,
      changes: hunkChanges,
    });
  }

  return hunks;
}

/**
 * Generate a unified diff from before and after code
 * @param {string} oldCode - The original code
 * @param {string} newCode - The modified code
 * @param {string} filename - The filename for the diff
 * @returns {Array} Parsed diff files for react-diff-view
 */
export function generateDiff(oldCode, newCode, filename = 'file.txt') {
  // Handle empty inputs
  const oldText = oldCode || '';
  const newText = newCode || '';

  try {
    // Use diffLines to get the changes
    const changes = diffLines(oldText, newText);

    console.log('Changes:', changes);

    // Convert to hunks format
    const hunks = convertToHunks(changes);

    console.log('Formatted hunks:', hunks);

    // Return in the format expected by react-diff-view
    return [{
      oldPath: filename,
      newPath: filename,
      oldRevision: 'Before',
      newRevision: 'After',
      type: 'modify',
      hunks: hunks
    }];
  } catch (error) {
    console.error('Error generating diff:', error);
    return [];
  }
}

/**
 * Generate plain text diff for clipboard
 * @param {string} oldCode - The original code
 * @param {string} newCode - The modified code
 * @param {string} filename - The filename for the diff
 * @returns {string} Plain text diff
 */
export function generatePlainTextDiff(oldCode, newCode, filename = 'file.txt') {
  const patch = structuredPatch(
    filename,
    filename,
    oldCode || '',
    newCode || '',
    '',
    ''
  );

  // Convert structured patch back to unified format
  let result = `--- a/${filename}\n`;
  result += `+++ b/${filename}\n`;

  patch.hunks.forEach(hunk => {
    result += `@@ -${hunk.oldStart},${hunk.oldLines} +${hunk.newStart},${hunk.newLines} @@\n`;
    result += hunk.lines.join('\n') + '\n';
  });

  return result;
}
