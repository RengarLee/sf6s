**English** | [简体中文](https://github.com/RengarLee/sf6s/blob/main/README.md)

---

> **Notice**: This repository is exclusively used for publishing and storing release logs for the SF6S bot.

# SF6S Bot Features Overview

## Core Features

- **SF6 Frame Data Queries**: Query startup frames, block advantage, hitboxes, damage data, and move cancel information (showing which move types can cancel it) via character names (e.g. Akuma) and move aliases (e.g. 5hp, 236p, OD DP), rendered as HD image cards. Includes official Capcom move notes and direct links to character detailed hitbox websites.
  - 🙌 Special thanks to QQ 太简单, QQ 焕冥, QQ 马肯博, QQ 悠哈, QQ 　, QQ 路德维C, QQ aaa 乐, QQ balance for data support

<p align="center">
  <img src="https://raw.githubusercontent.com/RengarLee/sf6s/main/changelogs/v0.0.1/move.jpg" alt="Frame Data Query" width="500" />
</p>

- **Replay Recording & Proactive Notifications**: Submit 9-character in-game replay IDs to trigger backend video recording. Automatically mention the submitter with the video link after publication on Bilibili; video comments automatically include timestamp prompts for low HP comeback highlight moments.

- **Quick Replay Data Analysis**: Provides dedicated analysis commands to swiftly parse match replay data and produce multi-dimensional statistics, helping players quickly grasp match details.

- **Proactive Server Upgrade Notifications**: Notifies users during server version upgrades or system maintenance, keeping users informed of service status in real time.
  - 🙌 Special thanks to QQ 悠哈 for the suggestion

<p align="center">
  <img src="https://raw.githubusercontent.com/RengarLee/sf6s/main/changelogs/v0.0.1/update.png" alt="Server Upgrade Notification" width="500" />
</p>

- **Friendly Prompts & Guidance**: Smart fuzzy matching and candidate character suggestions for unrecognized characters or moves; structured prompts and menu guides when @Bot is mentioned without inputs in group chats.
