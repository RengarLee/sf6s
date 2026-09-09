**English** | [简体中文](https://github.com/RengarLee/sf6s/blob/main/changelogs/v0.0.9/zh-CN.md)

---

# SF6S Changelog - v0.0.9

## Added

- **Sparring Partner Search**: Find players with linked CFN IDs who regularly use the bot in your group. Filter by character, rank, or MR range to find practice partners. Results provide player profiles only; please contact players directly to arrange matches.
  - 🙌 Special thanks to QQ users 焕冥 and 悠哈 for their suggestions.
- **Setback Notices**: Automatically generates and sends an illustrated setback card when a player's MR drops below a key threshold, or falls below it again after recovering, capturing the ups and downs of ranked play. Requires a linked CFN ID.
- **Victory Announcement and Setback Notice Toggles**: Send `喜报 开启` / `喜报 关闭` to enable or disable victory announcements for rank breakthroughs and returns to previous highs, or `悲报 开启` / `悲报 关闭` to control setback notices when MR drops below key thresholds. Send `喜报` or `悲报` alone to check the corresponding setting. Victory announcements are sent only to groups where the player regularly uses the bot.
  - 🙌 Special thanks to QQ user 悠哈 for the suggestion.

> **About regular groups**: The bot automatically identifies a player's regular groups based on their bot usage in each group. Players must use the bot frequently in a group to appear in that group's sparring search results and receive victory announcements there when enabled.
