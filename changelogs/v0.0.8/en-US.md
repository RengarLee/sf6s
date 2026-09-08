**English** | [简体中文](https://github.com/RengarLee/sf6s/blob/main/changelogs/v0.0.8/zh-CN.md)

---

# SF6S Changelog - v0.0.8

## Added

- **Milestone "Setback Notice" Push**: Automatically generates and pushes a visual graphics card when a player's MR drops below a key tier, or falls again after recovering, tracking the ups and downs of the ranked journey (*Requires prior CFN ID "binding"*).
- **Personal Toggles for "Victory Announcement" and "Setback Notice"**: Send "喜报 开启/关闭" or "悲报 开启/关闭" to enable or disable each notification separately, or send "喜报" or "悲报" alone to check the current setting. Both are enabled by default and the setting applies across groups; when disabled, the corresponding notice no longer @-mentions you, and no message is sent if there are no users to notify in the group.

## Improved

- **Refined "Victory Announcement" Trigger Logic**: Adjusted milestone rules so rank breakthroughs and returns to peak performance trigger the victory announcement more readily, sharing players' ranked progress and highlight moments more promptly.
- **Enhanced Binding Success Confirmation**: After a successful binding, a text confirmation is now shown before the player's profile image, noting that "Victory Announcement" and "Setback Notice" are enabled by default and can be reviewed via "菜单"; existing notification toggle settings are preserved when re-binding.
