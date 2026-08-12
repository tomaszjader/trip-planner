# VoyageAI — intelligent trip planner

**English** | [Polski](README.pl.md)

VoyageAI is a web application for creating personalized travel plans. You can plan a trip through a conversation with an assistant or a step-by-step form, then explore the itinerary, attraction map, food guide, budget, and packing list.

## Features

- plan trips through chat or a step-by-step wizard,
- generate itineraries with Google Gemini or OpenAI,
- use the local fallback generator and ready-made sample destinations,
- browse a day-by-day itinerary and add or remove activities,
- explore an interactive Leaflet map,
- view a food guide, cost estimate, and practical travel tips,
- manage an editable packing list,
- save plans in browser storage,
- export a plan to PDF through the system print dialog,
- switch between light and dark themes,
- use a responsive interface on desktop and mobile devices.

## Tech stack

- React 18
- TypeScript
- Vite
- Leaflet and React Leaflet
- Lucide React
- Canvas Confetti

## Requirements

- Node.js 18 or newer
- npm

An API key is not required to run the application. Without one, VoyageAI uses local data and its fallback generator. Adding your own Gemini or OpenAI key enables more personalized itinerary generation.

## Run locally

```bash
git clone <repository-url>
cd trip-planner
npm install
npm run dev
```

Vite will print the local application URL in the terminal, usually `http://localhost:5173`.

## AI configuration

1. Start the application.
2. Open **AI Settings** in the top navigation bar.
3. Select Google Gemini or OpenAI.
4. Enter your API key and select a model.
5. Optionally test the key, then save the settings.

Keys and AI settings are stored only in the current browser's `localStorage`. This is convenient for a local demo project, but a production application should send AI provider requests through its own backend so that API keys are not exposed to browser-side code.

## Available commands

```bash
npm run dev      # start the development server
npm run build    # type-check and create a production build
npm run preview  # preview the production build locally
npm run deploy   # deploy manually to the gh-pages branch
```

## Deploy to GitHub Pages

The application is configured for GitHub Pages.

### Automatic deployment with GitHub Actions (recommended)

The repository includes a [deployment workflow](.github/workflows/deploy.yml) that builds and publishes the application after every push to the `main` branch.

1. Open the repository **Settings** on GitHub.
2. Select **Pages** under *Code and automation*.
3. Under **Build and deployment → Source**, select **GitHub Actions**.
4. Push changes to `main`. The site will be updated at:
   `https://<your-username>.github.io/trip-planner/`

### Manual deployment (optional)

Run:

```bash
npm run deploy
```

Then open **Settings → Pages**, choose *Deploy from a branch*, and select the `gh-pages` branch.

## Project structure

```text
trip-planner/
├── src/
│   ├── components/       # UI views and components
│   ├── services/         # AI integrations, sample data, and localStorage
│   ├── types/            # travel plan data types
│   ├── App.tsx           # main application flow
│   ├── index.css         # global visual system
│   └── main.tsx          # React entry point
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## User data

Saved trips, the active plan, theme, selected AI provider, and API keys are stored in `localStorage`. Clearing the site's browser data removes this information. The project currently has no account synchronization or external database.

## Production build

```bash
npm run build
npm run preview
```

The generated files are written to `dist/`.

## Roadmap

- move API communication to a backend,
- synchronize plans across devices,
- add unit and end-to-end tests,
- lazy-load the map to reduce the initial JavaScript bundle,
- import and export plans in a portable format.

## License

This project is available under the [MIT License](LICENSE). See [LICENSE](LICENSE) for details.
