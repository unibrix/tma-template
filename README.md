# Telegram Mini App - React Starter

Minimal starter for Telegram Mini Apps with React + TypeScript.

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173/ to see the app running locally.

## Deploy to GitHub Pages

1. Update base path in `vite.config.ts`:
   ```ts
   // github.com/YourUsername/your-repo → '/your-repo/'
   base: command === 'serve' ? '/' : '/tma-react-starter/',
   ```

2. Enable GitHub Pages:
   - Go to repo **Settings → Pages**
   - Source: **GitHub Actions**

3. Push to `main` — deploys automatically

## Connect to Telegram

1. Create a bot via [@BotFather](https://t.me/BotFather) → `/newbot`

2. Configure the bot:
   ```bash
   cp .env.example .env
   ```

   Edit `.env`:
   ```
   BOT_TOKEN=your_token_from_botfather
   APP_URL=https://yourusername.github.io/your-repo/
   ```

3. Run setup:
   ```bash
   ./scripts/setup-bot.sh
   ```

4. Open your bot in Telegram and click the menu button!

## Project Structure

```
src/
├── components/     # App, Page, Root, ErrorBoundary
├── pages/          # IndexPage (home)
├── navigation/     # Route definitions
├── init.ts         # SDK initialization
└── mockEnv.ts      # Local dev mock
```

## Environment Variables

Variables with `VITE_` prefix are available in code:

```bash
# .env
VITE_API_URL=https://api.example.com
```

```ts
// usage
const url = import.meta.env.VITE_API_URL
```

## Resources

- [Telegram Mini Apps Docs](https://core.telegram.org/bots/webapps)
- [TMA.js SDK](https://docs.telegram-mini-apps.com/)
- [Telegram UI](https://github.com/Telegram-Mini-Apps/TelegramUI)
