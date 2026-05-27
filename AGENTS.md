# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Commands

```sh
pnpm start          # Dev server (Vite)
pnpm build          # Production build with sourcemaps
pnpm build:analyze  # Bundle size visualizer
pnpm test           # Run vitest (browser-based, WebKit)
pnpm tsc            # TypeScript type check
pnpm lint           # ESLint check
pnpm lint-fix       # ESLint auto-fix
pnpm preview        # Preview production build on port 8080
pnpm storybook      # Start Storybook on port 6006

# Build for specific devices
TARGET_DEVICE=lg    pnpm build   # LG webOS
TARGET_DEVICE=tizen pnpm build   # Samsung Tizen
```

## Project Overview

This is a **Lightning TV** app built with **SolidJS** — a WebGL-based TV application framework (no DOM). UI renders to canvas via `@lightningjs/renderer`. Interaction is via remote control direction keys.

### Architecture

```
src/
  index.tsx          # Entry: creates renderer, registers shaders, loads fonts, defines routes
  pages/             # Route-level page components
    App.tsx          # Root layout (focus manager, mouse, announcer, background)
    HelloWorld.tsx   # Home page
    Text.tsx         # Text demo page
    NotFound.tsx     # 404
  components/        # Reusable UI components
    Button/          # Example component with storybook + test
  styles.ts          # Shared style objects
  fonts.ts           # Font loading config
  translate.ts       # i18n via @solid-primitives/i18n (JSON-based)
  test-utils.jsx     # Test renderer wrapper
devices/             # Multi-device build system
  common/            # Shared device configuration (keys, renderer options, shaders)
  lg/                # LG webOS overrides
  tizen/             # Samsung Tizen overrides
  deviceConfigPlugin.js  # Vite plugin: swaps #devices/common import per TARGET_DEVICE
environments/        # Vite env files (.env, .env.production, etc.)
```

### Key Framework Rules

- No DOM elements (`<div>`, `<span>`) — use `<View>`, `<Text>`, `<Row>`, `<Column>`
- No CSS (`class`, `className`, `style={{}}`) — pass props directly
- Colors must be hex strings with alpha: `"#ff0000ff"` (no named colors like `"red"`)
- Background color = `color` prop (not `background`)
- All nodes default to `position: absolute`; use `display: "flex"` for flex layout
- Directional padding not supported — only single `padding` number
- Focus managed via `useFocusManager` — use `autofocus`, `onEnter`, `onFocusChanged`
- Prefer `@lightningtv/solid` imports over `solid-js` for JSX (`moduleName` is aliased in Vite)

### Route Structure

Routes are defined in `src/index.tsx` using `@solidjs/router` with `HashRouter`:

- `/` → `HelloWorld`
- `/text` → `TextPage`
- `/*all` → `NotFound`

### Multi-Device Build

Set `TARGET_DEVICE=lg` or `TARGET_DEVICE=tizen` to build for specific platforms. The device config plugin swaps `#devices/common` → `#devices/{target}` via alias. Output goes to `dist/{device}/`.

### Path Aliases

- `@/*` → `src/*`
- `#devices/*` → `devices/*`
- `theme` → `./theme.js`

### Testing

Tests use `vitest` with Playwright (WebKit, headed by default). Button test example at `src/components/Button/Button.test.jsx`.
