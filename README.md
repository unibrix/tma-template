# Telegram Mini App - React Starter

Minimal starter template for Telegram Mini Apps using official SDKs.

**Stack:** React + TypeScript + Vite + [@tma.js/sdk-react](https://docs.telegram-mini-apps.com/packages/tma-js-sdk-react) + [Telegram UI](https://github.com/Telegram-Mini-Apps/TelegramUI)

## Setup

### 1. Create a Telegram Bot

1. Open [@BotFather](https://t.me/BotFather) in Telegram
2. Send `/newbot` and follow the prompts
3. Save the bot token

### 2. Clone and Configure

```bash
git clone <your-repo-url>
cd tma-react-starter
npm install
```

Update `vite.config.ts` - change the base path to your repo name:
```ts
base: command === 'serve' ? '/' : '/your-repo-name/',
```

### 3. Local Development

```bash
npm run dev
```

Open http://localhost:5173/ - the app includes a mock environment for testing without Telegram.

For testing in Telegram, use [TMA Studio](https://github.com/erfanmola/TMA-Studio).

### 4. Deploy

Push to GitHub and enable GitHub Pages:

1. Go to repo **Settings → Pages**
2. Set Source: **GitHub Actions**
3. Push to `main` branch

The GitHub Action will automatically build and deploy your app.

### 5. Connect Bot to App

After first deploy, configure your bot:

```bash
cp .env.example .env
# Edit .env: add BOT_TOKEN and APP_URL (your GitHub Pages URL)
./scripts/setup-bot.sh
```

Or add `BOT_TOKEN` as a GitHub Secret for automatic bot configuration on every deploy.

## Environment Variables

### App Variables (VITE_*)

Variables prefixed with `VITE_` are embedded in the build and accessible in code:

```bash
# .env
VITE_API_URL=https://api.example.com
```

```typescript
// In code
const apiUrl = import.meta.env.VITE_API_URL
```

For production, add as GitHub Secrets and they'll be injected during build.

### Bot Setup Variables

Used only by the setup script (not embedded in build):

| Variable | Description |
|----------|-------------|
| `BOT_TOKEN` | Bot token from @BotFather |
| `APP_URL` | Deployed app URL |

## Project Structure

```
src/
├── components/
│   ├── App.tsx           # Router + theme
│   ├── Page.tsx          # Back button wrapper
│   └── Root.tsx          # Error boundary
├── pages/
│   └── IndexPage/        # Home page
├── navigation/routes.tsx # Route definitions
├── init.ts               # SDK initialization
├── mockEnv.ts            # Local dev mock
└── vite-env.d.ts         # TypeScript env types
```

## SDK Features

| Feature | Usage |
|---------|-------|
| `initData` | User profile (name, username, premium) |
| `themeParams` | Auto dark/light theme |
| `hapticFeedback` | Vibration feedback |
| `backButton` | Native back navigation |
| `mainButton` | Bottom action button |
| `popup` | Native dialogs |
| `cloudStorage` | Persist user data |

## Commands

```bash
npm run dev      # Start dev server
npm run build    # Build for production
```

## Resources

- [Telegram Mini Apps Docs](https://core.telegram.org/bots/webapps)
- [TMA.js SDK](https://docs.telegram-mini-apps.com/)
- [Telegram UI](https://github.com/Telegram-Mini-Apps/TelegramUI)

## License

MIT
