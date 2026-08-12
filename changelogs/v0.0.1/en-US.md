**English** | [简体中文](./zh-CN.md)

---

# SF6Koishi Changelog - v0.0.1

Release Date: 2026-08-12

## Added

- **Frame Data Queries (koishi-plugin-sf6-frame-data)**: Query startup frames, block advantage, damage, and hitboxes via character names (Akuma, Ryu) and move aliases (5hp, 236p, OD DP), rendered as HD image cards.
- **Replay Recording & Proactive Notifications (koishi-plugin-sf6-replayer)**: Submit 9-character replay IDs for backend video recording. Mention users with video links once Bilibili/YouTube audit completes.
- **Global Deduplication & Subscriptions**: Ensures each replay ID is recorded only once, converting duplicate requests into shared subscriptions.
- **Server Upgrade Notifications**: Proactively notifies users when the server undergoes version upgrades or maintenance.

## Improved

- **User Phrasing & Helpful Prompts**: Enhanced response copy for unrecognized characters or moves with smart suggestions; added structured prompt messages and menu guides when @Bot is mentioned without arguments.
