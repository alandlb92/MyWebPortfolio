# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio/CV website — a vanilla JS SPA with no build tools, framework, or package manager. Deployed as static files on Hostinger.

## Running Locally

No build step. Serve directly with any static file server:

```bash
python -m http.server 8080
# or
npx serve .
```

Open `http://localhost:8080`.

## Architecture

### Data Flow

1. `index.html` loads `js/index.js`
2. `index.js` fetches `Pages/Modules/MainContent.html` and injects it into `#content`
3. `js/MainContent.js` reads `js/Data/Data.json`, generates project cards and work experience entries via string template substitution against `Pages/Modules/ProjectCard.html` and `Pages/Modules/WorkExperienceCard.html`
4. Filters, sidebar panel, and scroll behavior are wired up via DOM event listeners

### Template System

HTML templates use `{{PLACEHOLDER}}` markers. `MainContent.js` calls `.replace()` to substitute values from Data.json. To add a new field to a card, add the placeholder to the HTML template and the substitution in `MainContent.js`.

### Data Schema (`js/Data/Data.json`)

Each project entry:
```json
{
  "category": "Game Dev",
  "title": "...",
  "description": "Short blurb",
  "about": "Long-form HTML content for side panel",
  "image": "src/ProjectFiles/...",
  "htmlpath": "Pages/ProjectName.html",
  "skills": ["Unity", "C#"],
  "Roles": "Developer",
  "GithubLink": "...",
  "projectLink": "..."
}
```

Work experience entries follow a similar structure with `company`, `role`, `period`, `description`.

### State

Global variables in `MainContent.js`: `data` (all projects), `filters` (active skill Set), `filterMap` (skill→card map). No external state library — state lives in module-level variables and CSS classes.

### Styling

Single file: `src/style.css`. Uses CSS custom properties for theming:
- `--primary-bg-color`: `#333` (dark background)
- `--text-color`: `#dfdfdf`
- `--secondary-text-color`: `#67fff0` (cyan accent)

Mobile breakpoint: `768px`.

### Adding a Project

1. Add entry to `js/Data/Data.json`
2. Add project media to `src/ProjectFiles/`
3. (Optional) Create a detail page at `Pages/ProjectName.html`
