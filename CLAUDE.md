# TMA React Starter

Telegram Mini App starter template with React, TypeScript, Vite, and Zustand.

## Tech Stack
- React, TypeScript (strict mode)
- Vite with SWC
- Zustand with persist middleware
- @tma.js/sdk-react
- @telegram-apps/telegram-ui

## Commands
- `npm run dev` - Dev server at localhost:5173
- `npm run dev:https` - HTTPS server (required for ngrok)
- `npm run dev:tunnel` - Starts dev + ngrok + updates bot URL automatically
- `npm run build` - Type check + production build
- `npm run preview` - Preview production build locally
- `npm run deploy` - Deploy dist/ to GitHub Pages
- `npm run lint` - ESLint with auto-fix

## Key Files

### SDK Initialization (src/init.ts)
Mounts TMA SDK features conditionally:
- `backButton.mount()` - Back navigation
- `miniApp.mount()` + `bindCssVars()` - Theme CSS variables
- `viewport.mount()` + `bindCssVars()` - Safe area CSS variables
- `biometry.mount()` - Face ID / fingerprint
- `locationManager.mount()` - Geolocation

### State Management (src/store/)
- `index.ts` - Zustand store with `persist` middleware
- `cloudStorage.ts` - Custom storage adapter that syncs to TMA cloudStorage with localStorage fallback

Store shape:
```ts
interface AppState {
  hapticsEnabled: boolean;
  biometryEnabled: boolean;
  setHapticsEnabled: (enabled: boolean) => void;
  setBiometryEnabled: (enabled: boolean) => void;
}
```

### Hooks (src/hooks/)

**useHaptics** - Haptic feedback wrapper
```ts
const { impact, notification, selection } = useHaptics();
impact("light" | "medium" | "heavy" | "rigid" | "soft");
notification("success" | "error" | "warning");
selection(); // selection feedback
```
Respects `hapticsEnabled` store setting.

**useBiometricAuth** - Full biometric auth flow
```ts
const {
  status,              // "idle" | "checking" | "authenticating" | "authorized" | "denied" | "error"
  isAvailable,         // () => boolean
  requestAccess,       // (reason?) => Promise<boolean>
  withBiometricAuth,   // (onSuccess, reason) => Promise - graceful fallback
  requireBiometricAuth,// (onSuccess, reason) => Promise - strict, fails if unavailable
  openSettings,        // () => void
  isProcessing         // boolean
} = useBiometricAuth({ debug?: boolean });
```

### Components (src/components/)
- `App.tsx` - HashRouter setup, theme detection (isDark signal), platform detection (iOS/Android)
- `Root.tsx` - Wraps app with SDKProvider and ErrorBoundary
- `Page.tsx` - Page wrapper that shows/hides TMA back button
- `TabBar/` - Generic tab navigation with haptic feedback
- `ErrorBoundary.tsx` - React error boundary with fallback UI
- `EnvUnsupported.tsx` - Fallback for old Telegram versions

### Mock Environment (src/mockEnv.ts)
Simulates TMA environment for local development. Tree-shaken in production.
Mocks: themeParams, viewport, safeAreaInsets, contentSafeAreaInsets, launchParams.

## TMA SDK Features

| Feature | Usage |
|---------|-------|
| initData | `initData.user()` - current user info |
| miniApp | Theme, lifecycle, ready state |
| backButton | Show/hide, onClick handler |
| hapticFeedback | impact, notification, selection |
| biometry | requestAccess, authenticate |
| cloudStorage | getItem, setItem (async, cross-device) |
| viewport | Safe areas, expansion state |
| popup | Native modal dialogs |
| locationManager | Device geolocation |

## Architecture Decisions

**HashRouter over BrowserRouter**
GitHub Pages doesn't support SPA routing. HashRouter uses `#/path` URLs that work without server config.

**Zustand over Redux/Context**
- No Provider wrapper needed
- Built-in persist middleware
- Minimal boilerplate (~20 lines for full store)
- Direct imports: `useAppStore(state => state.x)`

**Hybrid Storage (Cloud + Local)**
- localStorage: Immediate, synchronous, always works
- cloudStorage: Async, syncs across devices, may be unavailable
- Adapter writes to both, reads prefer localStorage for speed

**Conditional SDK Mounting**
Features like biometry/location aren't always available. Pattern:
```ts
if (biometry.mount.ifAvailable()) {
  // safely use biometry
}
```

**Mock Environment for Dev**
`mockEnv.ts` provides fake TMA context so app runs in browser without Telegram. Import is removed in production via tree-shaking.
