# SF6Koishi Changelog - v1.0.0

Release Date: 2026-07-15

Initial release of SF6Koishi, an all-in-one assistant bot for Street Fighter 6 players and communities.

## 🎉 Key Features

### 🥊 Frame Data Queries (`koishi-plugin-sf6-frame-data`)
- **Move Card Rendering**: High-definition image card rendering powered by Puppeteer, presenting startup frames, active frames, block advantage, damage, and hitboxes.
- **Smart Alias Matching**: Supports character names (`Akuma`, `Ryu`) and move aliases (`5hp`, `236p`, `SA3`).
- **Dynamic Manifest Cache**: Automatically synchronizes character lists and revision manifests from Scouter API.

### 📹 Replay Recording & Notification (`koishi-plugin-sf6-replayer`)
- **Replay Submission**: Submit 9-character replay IDs (e.g. `12A34B567`) for automated background video recording.
- **Proactive Notifications**: Automatically mention users in group/private chats with video links once Bilibili/YouTube upload & audit completes.
- **Global Deduplication**: Prevents redundant backend rendering tasks by converting duplicated submissions into multi-user subscriptions.

### 🤖 Assistant & Smart Discovery (`koishi-plugin-sf6-assistant`)
- **Interactive Menu**: Trigger main menu via `features`, `menu`, or Chinese aliases (`功能`, `帮助`).
- **Mention Fallback**: Provides friendly discovery options when mentioned in group channels.
- **i18n Support**: Native multi-language support for `zh-CN` and `en-US`.
