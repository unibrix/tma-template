# TMA React Starter

Starter template for Telegram Mini Apps with React + TypeScript.

**Stack:** React 18 · TypeScript · Vite · Zustand · [@tma.js/sdk-react](https://docs.telegram-mini-apps.com/) · [Telegram UI](https://github.com/Telegram-Mini-Apps/TelegramUI)

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173/ — the app runs with a mock Telegram environment.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with mock TMA environment |
| `npm run dev:https` | Start dev server with HTTPS (for ngrok) |
| `npm run dev:tunnel` | Start dev + ngrok tunnel + auto-update bot URL |
| `npm run build` | Type check + production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Check code with ESLint |
| `npm run lint:fix` | Auto-fix ESLint issues |
| `npm run deploy` | Deploy to GitHub Pages |

## Development with ngrok

Test on a real device with auto bot URL updates:

```bash
brew install ngrok
ngrok config add-authtoken YOUR_TOKEN  # from ngrok.com/dashboard
npm run dev:tunnel
```

## Deploy to GitHub Pages

**1. Configure base path**

Edit `vite.config.ts` with your repo name:
```ts
base: command === 'serve' ? '/' : '/your-repo/',
```

**2. Enable GitHub Pages**

Go to repo **Settings → Pages → Source: GitHub Actions**

**3. Set up secrets** (optional)

If your app uses environment variables, add them in **Settings → Secrets and variables → Actions**:
- `VITE_API_URL` - Your API endpoint
- Any other `VITE_*` variables your app needs

**4. Push to main**

Each commit to `main` automatically triggers a build and deploy via GitHub Actions.

## Connect to Telegram

**1. Create a bot** — [@BotFather](https://t.me/BotFather) → `/newbot`

**2. Configure environment**

```bash
cp .env.example .env.production
# Edit: BOT_TOKEN, VITE_APP_URL
```

**3. Run setup**

```bash
./scripts/setup-bot.sh
```

## Project Structure

```
src/
├── components/
│   ├── App.tsx           # Router + theme
│   ├── TabBar/           # Tab navigation
│   ├── Page.tsx          # Back button wrapper
│   └── ErrorBoundary.tsx
├── hooks/
│   ├── useHaptics.ts     # Haptic feedback
│   └── useBiometricAuth.ts # Biometric auth
├── store/                # Zustand + cloud storage
├── pages/
├── navigation/
└── init.ts               # SDK initialization
```

## Environment Variables

```bash
cp .env.example .env.development  # for dev:tunnel
cp .env.example .env.production   # for setup-bot.sh
```

Variables with `VITE_` prefix are embedded at build time.

## Resources

- [Telegram Mini Apps Docs](https://core.telegram.org/bots/webapps)
- [TMA.js SDK Documentation](https://docs.telegram-mini-apps.com/)
- [Telegram UI Components](https://github.com/Telegram-Mini-Apps/TelegramUI)

## License

MIT
