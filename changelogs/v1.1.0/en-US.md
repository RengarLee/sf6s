# SF6Koishi Changelog - v1.1.0

Release Date: 2026-08-12

This release brings major enhancements to frame data card rendering, move matching algorithms, replay recording error-handling, and unified multi-language localization!

## 🚀 Features & Enhancements

### 🥊 Frame Data Upgrades (`sf6-frame-data`)
- **Move Matching Algorithm Improvements**:
  - Enhanced `findMove` to accurately distinguish forward jump variants, compound prefixes, and no-input conditions.
  - Expanded command alternatives for shared prefix moves.
- **Enhanced Card Rendering**:
  - Added localized translations for landing frames and directional arrows in `renderMoveCardHtml`.
  - Added support for compound drink-level conditions (e.g. Jamie's Drink Level moves).
  - Added new charge key icons and direction indicators.
- **Smart Guidance**: Improved fallback guidance messages when character or move queries are unrecognized.

### 📹 Replay Replayer Enhancements (`sf6-replayer`)
- **Worker Availability Notification**: Notifies users when backend recording workers are full or offline, marking tasks for pending retry.
- **Rate Limiting & Access Control**: Introduced `rateLimit` configurations and `privateChat` allowlists to prevent abuse.
- **Multi-channel Subscriptions**: Refactored subscription schema for cross-platform/cross-channel notification tracking.

### 🌍 i18n Refactoring & Adapters (`sf6-assistant` & Adapters)
- **Locale Refactoring**: Unified all user-facing strings into Koishi locale files (`zh-CN` / `en-US`).
- **QQ-Crack Adapter**: Added integration and configuration support for `qq-crack`.
- **English Aliases**: Enhanced locale resolution for `features` and `menu` commands.

## 🐞 Bug Fixes & Refactoring
- Fixed layout rendering issues when specific frame fields are absent.
- Fixed state machine transitions when backend returns 404 during status polling.
- Updated test suites and build artifacts for type consistency.
