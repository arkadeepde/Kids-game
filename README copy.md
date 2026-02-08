# Kids Games

A small Next.js app with simple, touch-friendly games for toddlers.

This repository includes:
- A homepage with a menu of games
- A converted "Bubble Pop" game (tap bubbles to pop them)

Getting started:

1. Install dependencies

```bash
cd /Users/arkadeepde/Projects/Kids
npm install
```

2. Run the dev server

```bash
npm run dev
```

3. Open http://localhost:3000 in a browser (preferably a tablet or phone for touch interactions).

Notes:
- The Bubble Pop game is implemented as a client component at `app/games/bubble-pop/page.js`.
- Add more games in `app/games/` and link them from the homepage.
