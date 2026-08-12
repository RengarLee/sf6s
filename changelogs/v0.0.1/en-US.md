# SF6Koishi Changelog - v0.0.1

Release Date: 2026-08-12

Initial release of SF6Koishi, providing comprehensive assistant bot services for Street Fighter 6 players and communities.

## Key Features

### Frame Data Queries (koishi-plugin-sf6-frame-data)
- **Move Card Rendering**: High-definition image card rendering powered by Puppeteer, presenting startup frames, block advantage, damage, and hitboxes.
- **Smart Alias Matching**: Supports character names (`Akuma`, `Ryu`) and move aliases (`5hp`, `236p`, `SA3`), with accurate distinctions for forward jump variants and no-input conditions.
- **Dynamic Manifest Cache**: Automatically synchronizes character lists and revision manifests from Scouter API, with feedback link support.

### Replay Recording & Notification (koishi-plugin-sf6-replayer)
- **Replay Submission**: Submit 9-character replay IDs (e.g. `12A34B567`) for automated background video recording, with proactive user notifications upon video approval.
- **Global Deduplication**: Prevents redundant backend rendering tasks by converting duplicated submissions into multi-user subscriptions.
- **Resilience & Retries**: Automatically queues tasks when backend workers are busy and retries upon recovery.

### Assistant & Smart Discovery (koishi-plugin-sf6-assistant)
- **Interactive Menu**: Trigger main menu via `features`, `menu`, or Chinese aliases (`功能`, `帮助`).
- **Mention Fallback**: Provides friendly discovery options when mentioned in group channels.
- **i18n & Multi-Adapters**: Native multi-language support for `zh-CN` and `en-US`, compatible with OneBot, QQ Official, QQ-Crack, WeChat Robot, KOOK, Discord, and Telegram.
