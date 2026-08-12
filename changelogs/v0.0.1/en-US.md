# SF6Koishi Changelog - v0.0.1

Release Date: 2026-08-12

## Added

- **Frame Data Queries (koishi-plugin-sf6-frame-data)**: Query startup frames, block advantage, damage, and hitboxes via character names (Akuma, Ryu) and move aliases (5hp, 236p, OD DP), rendered as HD image cards using Puppeteer.
- **Replay Recording & Proactive Notifications (koishi-plugin-sf6-replayer)**: Submit 9-character replay IDs for backend video recording. Mention users with video links once Bilibili/YouTube audit completes.
- **Global Deduplication & Multi-subscriptions**: Ensures each replay ID is recorded only once, converting duplicate requests into shared subscriptions.
- **Assistant Menu & @Bot Guidance (koishi-plugin-sf6-assistant)**: Trigger main menu via `features`, `menu`, or Chinese aliases (`功能`, `帮助`), with mention fallback guidance in group chats.
- **Multi-Platform Support**: Compatible with OneBot (QQ), QQ Official, QQ-Crack, WeChat Robot, KOOK, Discord, Telegram, and more.

## Improved

- **User Phrasing & Helpful Prompts**: Enhanced response copy for unrecognized characters or moves with smart suggestions; added structured prompt messages and menu guides when @Bot is mentioned without arguments.
- **Interaction & Notification Flow**: Improved user status feedback for replay queueing and progress updates; clear prompts explaining worker busy states and automatic retry queuing.
- **Unified Copywriting & i18n**: Refactored all user-facing prompts into Koishi locales, providing consistent and natural interaction in `zh-CN` and `en-US`.
- **Card Visual Interaction**: Improved readability of landing frames, direction arrows, charge icons, and drink-level conditions on move cards.

## Fixed

- Fixed card layout rendering issues when specific frame data fields are missing.
- Fixed state machine transitions when backend returns 404 during status polling.
- Fixed notification retry logic when message dispatch initially fails.
