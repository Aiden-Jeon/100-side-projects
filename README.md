# 100 Side Projects

A collection of 100 side projects built with various AI coding agents (Claude Code, Cursor, Antigravity, Codex, and more).

## Overview

This repository tracks my journey building 100 side projects using different AI coding assistants. Each project includes detailed working logs documenting prompts, decisions, challenges, and learnings.

## Repository Structure

```
100-side-projects/
├── template/              # Template for new projects
│   ├── README.md         # Project README template
│   └── working_logs/     # Session logs template
├── scripts/              # CLI tools
│   ├── init-project.js   # Initialize new project
│   └── deploy-project.js # Deploy project locally
├── [project-001]/        # Individual projects
├── [project-002]/
└── ...
```

## Quick Start

### Initialize a New Project

```bash
npm run init
```

This will prompt you for:
1. Which coding agent you'll use (Claude Code, Cursor, etc.)
2. Project name (kebab-case)
3. Brief description
4. MCP servers to include

### Deploy a Project

```bash
npm run deploy <project-name>
```

Example:
```bash
npm run deploy todo-app
```

This automatically detects your project type and starts the appropriate dev server:
- Next.js, Vite, Create React App, Vue, Angular
- Static HTML sites
- Python (Flask, Django)

## Project Template

Each project includes:

### README.md
- Project overview
- Agent and MCP servers used
- Setup instructions
- Tech stack
- Notes and learnings

### working_logs/
Session logs documenting:
- Date and agent used
- Initial prompts
- Key decisions made
- Challenges encountered
- Progress tracking
- Code changes
- Next steps
- Learnings

## Workflow

1. **Start a new project**
   ```bash
   npm run init
   ```

2. **Build your project** with your chosen AI agent
   - Document your prompts in working_logs
   - Track progress and decisions

3. **Test locally**
   ```bash
   npm run deploy <project-name>
   ```

4. **Wrap up session**
   - Complete working log entry
   - Document learnings
   - Note any next steps

## Goals

- Build 100 diverse projects
- Compare different AI coding agents
- Document best practices and patterns
- Learn by building

## Projects

| # | Project Name | Agent | Tech Stack | Status |
|---|--------------|-------|------------|--------|
| 1 | - | - | - | - |

## Contributing

This is a personal learning repository, but feel free to:
- Use the template for your own journey
- Share feedback or suggestions
- Open issues for ideas

## License

MIT
