# Palava

Real-time chat for people who share a city. Express + Socket.IO server, plain-JS client (Phosphor Fill + Lucide icons).

## Run locally
```
npm install
npm start          # http://localhost:3000
npm test           # end-to-end smoke test (server must NOT already be running on 3111)
```

## What works
- Guest account on first tap, kept by a long-lived HttpOnly cookie (rolling 12 months). "Continue as <name>" on return.
- Claim a guest account (username + password, no email needed) without losing history. Log in, log out.
- Rooms with live "people here", real-time messages, history (last 50), 30-day retention in rooms.
- DMs for members (guests are asked to save their account first), unread counts, block, report.
- Passwords hashed with scrypt, session tokens stored only as hashes, rate limits, origin checks, strict CSP.

## Deploy free on Render (about 10 minutes)
1. Put this folder in a GitHub repo.
2. Create a free MongoDB Atlas cluster (M0). Database Access: add a user. Network Access: allow 0.0.0.0/0 (Render free has no fixed IP). Copy the connection string.
3. Render > New > Web Service > pick the repo. Runtime Node, build `npm install`, start `npm start`, plan Free.
4. Environment: `NODE_ENV=production`, `MONGODB_URI=<atlas string>`, optional `ADMIN_TOKEN=<long random string>`.
5. Health check path: `/healthz`.
The database name defaults to `palava` (override with `MONGODB_DB`; use `firetalk` if you already deployed under the old name).
Without MONGODB_URI, data lives in data.json and is wiped whenever Render restarts the free instance.

Free instances sleep after about 15 minutes idle; the first visit afterwards takes about 30 seconds to wake.

## Moderation
`GET /api/admin/reports` with header `x-admin-token: <ADMIN_TOKEN>` returns the latest 200 reports with message snapshots. Disabled unless ADMIN_TOKEN is set. A proper panel comes from merging DistroChat v4's admin panel.

## Known limits (honest list)
- State is held in memory and saved as ONE snapshot (file or one MongoDB document, 16 MB cap). Fine for an MVP of hundreds of users. Next step: real collections (users, sessions, messages) per the spec's data model.
- One server process only. For more, add the Socket.IO Redis adapter.
- Not built yet: avatar builder, image messages, email add/verify, recovery code, Link this device, push notifications, multiple saved accounts on one device.
- Mongo path (MONGODB_URI) is written but was not run against a real Atlas cluster here. The file path is what the tests cover.
- Bundle: lucide.min.js is the whole icon set (about 107 KB gzipped). Tree-shake with a build step later.
