**English** | [简体中文](https://github.com/RengarLee/sf6s/blob/main/changelogs/v0.1.3/zh-CN.md)

---

# SF6S Changelog - v0.1.3

## Added

- **Season Filters for Win Rate Queries**: View win rates for a specific season or across all seasons, with character and battle mode filters.
  - Specific season: `win-rate Ryu ranked Phase:13`
  - All seasons: `win-rate Any Total`
  - 🙌 Special thanks to QQ 熊猫头Kikii for suggesting all-season queries.
- **Rank Information in Battle Logs**: Battle logs now include rank information.

## Improved

- **Improved Battle Log Command Flow**: After querying battle logs in the official QQ bot, choose `录制对局` (record replay) or `分析对局` (analyze replay), then select the battle number to submit it for recording or analysis.
  - 🙌 Special thanks to QQ 焕冥 for the suggestion.

## Fixed

- **Random Character Win Rate Queries**: Use `win-rate Random` to view win rates when playing as Random. Player, battle mode, and season filters are also supported.
  - 🙌 Special thanks to QQ 荆棘饺子 for the feedback.
