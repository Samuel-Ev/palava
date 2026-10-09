# Palava

**Meet your city, one room at a time.**

Palava is a real-time chat platform where people who share a city meet in public rooms, see who is there, and start a conversation in a single tap. No real names, no phone numbers, and no cold "hi" required.

*Status: early access. Under active development.*

---

## Overview

Starting a conversation with a stranger is the hardest part of any social product. Palava removes that friction by giving people shared context and a safe first move:

- **Shared rooms** give everyone something in common to talk about, from city life to football to campus.
- **Live presence** shows who is in the room right now, so the space always feels alive.
- **One-tap openers** let a person send a ready-made first message without having to think of one.
- **Lightweight identity** means a person is a username and an avatar, never a real name.

Palava is built mobile-first for mid-range phones and unreliable networks, with a full desktop layout for larger screens.

## Features

**Conversations**
- Public rooms with live participant counts and message history
- Real-time messaging with delivery safeguards against duplicate sends
- Direct messages between members, with unread indicators
- Suggestion chips: grouped, context-aware quick replies that adapt to the conversation
- Emoji support

**Identity and accounts**
- Guest-first onboarding: start chatting without signing up
- Claim an account with just a username and password, keeping your history
- Returning users are recognised on their device with a "Continue as" screen
- Email is never required

**Safety**
- Report any room or person, with a snapshot of recent messages for review
- Block users, silently and immediately
- Rate limits on messaging and account creation
- A moderation endpoint for reviewing reports

**Experience**
- Distinct dark visual identity with a single high-energy accent
- Motion that is purposeful and respects the reduced-motion setting
- Responsive layout designed for phones first, with a multi-pane desktop view
- Keyboard navigation and visible focus states

## Security and Privacy

Palava is designed to collect as little as possible.

- No real names, phone numbers, or location data are collected.
- Passwords are hashed with scrypt and are never stored or logged in plain text.
- Sessions use HttpOnly, SameSite cookies, and only a hash of each session token is stored.
- A strict Content Security Policy blocks inline scripts.
- All message text is rendered as plain text, preventing script injection.
- Requests from other origins are rejected, and sign-in attempts are rate limited.

## Architecture

```
   Web client (responsive, mobile-first)
          |
          |  HTTPS + WebSocket
          v
   Node.js  /  Express  /  Socket.IO
          |
          v
       MongoDB
```

| Layer | Technology |
|---|---|
| Client | HTML, CSS and JavaScript, Phosphor and Lucide icons |
| Server | Node.js, Express, Socket.IO |
| Data | MongoDB |
| Hosting | Render |

## Roadmap

**Available now**
- Rooms, live presence, and real-time messaging
- Guest accounts, account claiming, and direct messages
- Suggestion chips, block, and report

**Next**
- Avatar builder with layered, customisable looks
- Image messages
- Optional email for account recovery
- Recovery codes and sign-in on a new device
- Push notifications

**Later**
- Voice notes and message reactions
- AI-suggested replies
- City-based rooms and live events
- Moderator tools and an admin dashboard

## Contact

Built and maintained by Samuel.

- GitHub: [@Samuel-Ev](https://github.com/Samuel-Ev)

For questions, feedback, or partnership enquiries, please open an issue on this repository.

## License

Copyright © 2026 Samuel. All rights reserved.
