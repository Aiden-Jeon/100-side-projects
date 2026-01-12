# Code Diff Viewer - Session 01

**Date**: January 12, 2026
**Agent**: Claude Code (Sonnet 4.5)
**Duration**: ~2 hours

## Initial Prompt

"Hi claude I want to make a web applications for code diff. I want git style to show the difference. This applications object is to share the which code has changed.

I will write before and after code and it's filename and language. And when click button show the diff. There should be unifed style and split style. And also copy clipboard button to easily copy the differece."

## Technology Stack Decisions

After entering plan mode, we decided on:
- **Framework**: React with Vite (for fast development)
- **Styling**: Tailwind CSS v3 (modern utility-first CSS)
- **Diff Library**: diff2html (switched from react-diff-view after compatibility issues)
- **Syntax Highlighting**: highlight.js (GitHub style)
- **Code Editor**: react-simple-code-editor with Prism.js

## Implementation Steps

### 1. Project Setup
- Manually created Vite + React project structure
- Installed dependencies: React, Vite, Tailwind CSS, diff libraries
- Fixed Tailwind CSS v4 compatibility issue by downgrading to v3
- Configured PostCSS and Tailwind

### 2. Initial Component Architecture
```
src/
├── components/
│   ├── DiffInput.jsx       # Input form for before/after code
│   ├── DiffViewer.jsx      # Diff display with unified/split views
│   ├── ViewToggle.jsx      # Toggle between view modes
│   ├── CopyButton.jsx      # Copy to clipboard functionality
│   └── ExportButton.jsx    # Export diff as HTML
├── utils/
│   ├── diffUtils.js        # Diff generation utilities
│   └── tokenize.js         # Syntax highlighting (deprecated)
├── App.jsx                 # Main application
└── main.jsx                # Entry point
```

### 3. Major Challenges & Solutions

#### Challenge 1: react-diff-view Integration Issues
**Problem**: `parseDiff` from react-diff-view threw errors: "Cannot read properties of undefined (reading 'changes')"

**Attempts Made**:
- Tried using `parseDiff` with `nearbySequences: 'zip'` option
- Attempted manual hunk construction with proper change objects
- Added all required properties: `isInsert`, `isDelete`, `isNormal`, `lineNumber`
- Added git-style prefixes (+, -, space) to content

**Solution**: Switched to **diff2html** library which proved more reliable and had better documentation.

#### Challenge 2: Syntax Highlighting
**Problem**: Initial syntax highlighting didn't work with diff2html

**Solution**:
- Integrated highlight.js with custom highlighting function
- Applied highlighting to each diff line after rendering
- Preserved diff markers (+/-) while colorizing code

#### Challenge 3: Prism.js Import Order
**Problem**: `prism-cpp` component failed with "Cannot set properties of undefined (setting 'class-name')"

**Solution**: Reordered imports to load `prism-c` before `prism-cpp` due to dependency requirements

### 4. Feature Implementation Timeline

#### Phase 1: Core Diff Functionality
1. Created project structure with Vite + React
2. Built DiffInput component with textareas for before/after code
3. Implemented diff generation using `diff` library
4. Initial attempt with react-diff-view (failed)
5. Switched to diff2html for rendering

#### Phase 2: UI/UX Improvements
1. Added default example code for easy testing
2. Added Clear button to reset form
3. Changed layout from side-by-side to vertical (input top, diff bottom)
4. Made input textareas side-by-side for better space utilization
5. Updated to GitHub's font stack for code display

#### Phase 3: Advanced Features
1. Implemented ViewToggle for unified/split views
2. Added CopyButton for clipboard functionality
3. Integrated syntax highlighting with highlight.js
4. Added ExportButton to download diff as standalone HTML
5. Replaced plain textareas with syntax-highlighted code editors

### 5. Key Code Sections

#### Diff Generation (diffUtils.js)
```javascript
export function generatePlainTextDiff(oldCode, newCode, filename = 'file.txt') {
  const patch = structuredPatch(
    filename,
    filename,
    oldCode || '',
    newCode || '',
    '',
    ''
  );

  // Convert to unified diff format
  let result = `--- a/${filename}\n`;
  result += `+++ b/${filename}\n`;

  patch.hunks.forEach(hunk => {
    result += `@@ -${hunk.oldStart},${hunk.oldLines} +${hunk.newStart},${hunk.newLines} @@\n`;
    result += hunk.lines.join('\n') + '\n';
  });

  return result;
}
```

#### Diff Rendering with Syntax Highlighting (DiffViewer.jsx)
```javascript
const highlightCode = (code) => {
  if (language && hljs.getLanguage(language)) {
    try {
      return hljs.highlight(code, { language }).value;
    } catch (e) {
      return code;
    }
  }
  return code;
};

// Generate HTML and apply highlighting
const diffHtml = html(plainTextDiff, {
  drawFileList: false,
  matching: 'lines',
  outputFormat: viewType === 'split' ? 'side-by-side' : 'line-by-line',
  highlight: true,
});
```

#### Code Editor with Live Highlighting (DiffInput.jsx)
```javascript
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
/>
```

## Final Features

✅ **Input Form**
- Side-by-side before/after code editors
- Real-time syntax highlighting (18+ languages)
- Filename and language selection
- Default example code
- Clear button

✅ **Diff Display**
- Git-style diff rendering
- Unified view (traditional +/- lines)
- Split view (side-by-side comparison)
- Syntax highlighting based on selected language
- Full-width layout for better readability

✅ **Actions**
- Copy to Clipboard (plain text diff)
- Export as HTML (standalone file with styling)
- Toggle between unified/split views

✅ **Styling**
- Tailwind CSS for consistent design
- GitHub's font stack for code
- Responsive layout
- Dark mode support in CSS

## Supported Languages

JavaScript, TypeScript, Python, Java, C++, C, C#, Ruby, Go, Rust, PHP, Swift, Kotlin, HTML, CSS, JSON, YAML, Markdown

## How to Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:5173
```

## Reproduction Steps

To recreate this project from scratch:

1. **Initialize Project**
```bash
mkdir code-diff-viewer && cd code-diff-viewer
npm init -y
```

2. **Install Dependencies**
```bash
# Core
npm install react react-dom

# Build tools
npm install -D vite @vitejs/plugin-react

# Styling
npm install -D tailwindcss@^3.4.0 postcss autoprefixer

# Diff & Highlighting
npm install diff diff2html highlight.js

# Code Editor
npm install react-simple-code-editor prismjs
```

3. **Create Configuration Files**
- `vite.config.js` - Vite configuration with React plugin
- `tailwind.config.js` - Tailwind content paths
- `postcss.config.js` - PostCSS with Tailwind and Autoprefixer
- `index.html` - HTML entry point

4. **Create Component Structure**
- `src/main.jsx` - React entry point
- `src/App.jsx` - Main app component
- `src/index.css` - Global styles with Tailwind directives
- `src/components/` - All UI components
- `src/utils/` - Utility functions

5. **Key Implementation Details**
- Use `diff` library's `structuredPatch` for generating diffs
- Use `diff2html` for rendering (more reliable than react-diff-view)
- Use `highlight.js` for syntax highlighting in diff view
- Use `react-simple-code-editor` with Prism.js for input editors
- Apply GitHub's font stack: `ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace`

## Learnings

1. **Library Selection Matters**: react-diff-view had poor documentation and compatibility issues. diff2html worked immediately and had better examples.

2. **Font Stack**: GitHub's font stack provides professional, native-looking code display across all platforms.

3. **Layout Strategy**: Vertical layout (input top, diff bottom) works better than side-by-side for diff viewers, as diffs need horizontal space.

4. **Syntax Highlighting Complexity**: Two different highlighting approaches needed:
   - Input: Prism.js with react-simple-code-editor
   - Diff: highlight.js applied post-render

5. **Import Order Dependencies**: Some Prism.js language components have dependencies (C++ requires C first).

## Post-Implementation Improvements

### Phase 4: Syntax Highlighting Refinements

After initial implementation, several improvements were made to enhance syntax highlighting:

#### Issue 1: Prism.js Component Loading Errors
**Problem**: Prism.js components had dependency issues causing "Cannot read properties of undefined" errors
- `prism-cpp` required `prism-c` and `prism-clike` to be loaded first
- Full language imports were breaking the application

**Solution**:
- Used Prism core with selective language imports
- Added proper import order: `prism-core`, `prism-clike`, `prism-javascript`, `prism-python`
- Added try-catch error handling for graceful fallbacks

#### Issue 2: Python Highlighting Quality
**Problem**: Python highlighting in diff view was not showing advanced features (keywords, f-strings, docstrings)

**Solution**:
- Explicitly loaded highlight.js with full language support
- Added custom CSS with `!important` to override diff2html styles
- Used GitHub's color scheme for consistent highlighting

#### Issue 3: First Character Truncation
**Problem**: Code in diff view was missing first character ("import" → "mport")

**Solution**:
- Properly extracted diff prefix using `.d2h-code-line-prefix` element
- Separated prefix handling from code content extraction
- Preserved complete code for accurate syntax detection

#### Issue 4: Split View Not Highlighting
**Problem**: Syntax highlighting only worked in unified view, not split view

**Solution**:
- Changed selector from `.d2h-code-line` to `.d2h-code-line-ctn` for universal targeting
- Works for both unified and split view DOM structures

#### Issue 5: Indentation Breaking
**Problem**: Code indentation was lost in diff view

**Solution**:
- Added `whiteSpace: 'pre'` style to preserve whitespace
- Applied to both container and code elements

#### Issue 6: Export Filename
**Problem**: Exported files always named "code-diff.html"

**Solution**:
- Pass filename from input form to DiffViewer
- Strip file extension and add "-diff.html" suffix
- Example: `example.py` → `example-diff.html`

### Final CSS Additions

Added custom CSS for proper syntax highlighting in diff view:

```css
/* Highlight.js token colors with GitHub theme */
.diff-container .hljs-keyword { color: #d73a49 !important; }
.diff-container .hljs-built_in { color: #005cc5 !important; }
.diff-container .hljs-string { color: #032f62 !important; }
.diff-container .hljs-comment { color: #6a737d !important; font-style: italic; }
/* ... and more */
```

## Future Enhancements

- [ ] File upload support
- [ ] Multiple file diffs
- [ ] Permalink/URL sharing with base64 encoded content
- [ ] Diff statistics (lines added/removed)
- [ ] Custom theme selection (dark mode toggle)
- [ ] Line-by-line comments
- [ ] Git integration (compare commits)
- [ ] Save/load diff sessions
- [ ] PDF export option
- [ ] Diff history/undo
- [ ] Word-level diff (not just line-level)

## Screenshots

The application features:
- Clean, modern UI with Tailwind CSS
- Professional code display with GitHub's font stack
- Real-time syntax highlighting in input editors (Prism.js)
- Advanced syntax highlighting in diff view (highlight.js)
- Beautiful git-style diff rendering with diff2html
- Both unified and split view modes
- Export to standalone HTML with embedded styles
- Responsive design that works on all screen sizes
- Proper indentation and whitespace preservation

## Key Technical Decisions

1. **Dual Highlighting Libraries**:
   - **Input editors**: Prism.js (lightweight, works well with react-simple-code-editor)
   - **Diff view**: highlight.js (better Python support, more robust)

2. **Font Stack**: GitHub's exact font stack for professional code display
   ```
   ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace
   ```

3. **Layout**: Vertical layout (input top, diff bottom) for maximum horizontal space for diffs

4. **CSS Specificity**: Used `!important` to ensure highlight.js styles override diff2html's default styling

## Conclusion

Successfully built a fully functional code diff viewer with git-style formatting, advanced syntax highlighting, and export capabilities. The project demonstrates:

- Effective troubleshooting of library compatibility issues
- Integration of multiple highlighting libraries for different use cases
- Proper DOM manipulation for post-render syntax highlighting
- Attention to UX details (font selection, layout, indentation preservation)
- Robust error handling and graceful fallbacks

**Final Statistics**:
- Total lines of code: ~1,000 lines
- Time spent: ~3 hours (including refinements)
- Components: 7 (DiffInput, DiffViewer, ViewToggle, CopyButton, ExportButton, App, utils)
- Libraries integrated: 9 (React, Vite, Tailwind, diff2html, highlight.js, Prism.js, react-simple-code-editor, diff, etc.)
- Languages supported: 18+
- Both unified and split view modes working
- Export functionality with proper filename handling

**Key Learnings**:
1. Different highlighting libraries excel at different tasks
2. DOM structure differs between view modes - write universal selectors
3. CSS specificity matters when integrating third-party styles
4. Whitespace preservation is critical for code display
5. Error boundaries and try-catch prevent single component failures

---

Generated with Claude Code - Session 01 (Updated)
Final Update: January 12, 2026
