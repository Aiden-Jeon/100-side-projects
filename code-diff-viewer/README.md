# Code Diff Viewer

A web application for viewing code differences in git-style format. Compare before and after code with support for unified and split views, syntax highlighting, and clipboard copy functionality.

## Features

- **Git-Style Diff Display**: View code changes just like git diff output
- **Unified View**: Traditional diff view with +/- lines
- **Split View**: Side-by-side comparison of before and after code
- **Syntax Highlighting**: Support for 18+ programming languages
- **Copy to Clipboard**: Easily copy the diff output
- **Responsive Design**: Works on desktop and mobile devices
- **Dark Mode Support**: Automatic dark mode based on system preferences

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **react-diff-view** - Diff rendering library
- **diff** - Diff generation
- **Prism.js** - Syntax highlighting

## Supported Languages

JavaScript, TypeScript, Python, Java, C++, C, C#, Ruby, Go, Rust, PHP, Swift, Kotlin, HTML, CSS, JSON, YAML, Markdown

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Usage

1. **Enter Before Code**: Paste or type your original code in the "Before Code" textarea
2. **Enter After Code**: Paste or type your modified code in the "After Code" textarea
3. **Set Filename**: Enter a filename (e.g., `example.js`)
4. **Select Language**: Choose the programming language for syntax highlighting
5. **Click "Show Diff"**: The diff will be displayed on the right side
6. **Toggle View**: Switch between Unified and Split views
7. **Copy to Clipboard**: Click the copy button to copy the diff

## Project Structure

```
code-diff-viewer/
├── src/
│   ├── components/
│   │   ├── DiffInput.jsx      # Input form component
│   │   ├── DiffViewer.jsx     # Main diff display component
│   │   ├── ViewToggle.jsx     # View mode toggle
│   │   └── CopyButton.jsx     # Clipboard copy button
│   ├── utils/
│   │   ├── diffUtils.js       # Diff generation utilities
│   │   └── tokenize.js        # Syntax highlighting tokenizer
│   ├── App.jsx                # Main app component
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

## Future Enhancements

- File upload support
- Multiple file diffs
- Permalink/URL sharing
- Export to various formats (HTML, PDF)
- Theme customization
- Diff statistics
- Line-by-line comments

## License

MIT
