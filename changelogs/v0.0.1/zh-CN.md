[English](https://github.com/RengarLee/sf6s/blob/main/changelogs/v0.0.1/en-US.md) | **简体中文**

---

# SF6S 版本日志 - v0.0.1

发布日期: 2026-08-12

## 新增

- **SF6 招式帧数查询**：支持通过角色名（如豪鬼、Akuma）与招式别名（如 5hp、236p、OD升龙）查询招式发生帧、硬直差、判定与伤害数据，并渲染为高清图片卡片。
  - 🙌 特别感谢 QQ 太简单, QQ 焕冥, QQ 马肯博, QQ 悠哈, QQ 　, QQ 路德维C, QQ aaa 乐, QQ balance 提供的数据支持

<p align="center">
  <img src="https://raw.githubusercontent.com/RengarLee/sf6s/main/changelogs/v0.0.1/move.jpg" alt="招式查询" width="500" />
</p>

- **对局回放录制与主动通知**：支持提交 9 位游戏内回放 ID 触发后台视频录制，视频发布B站后主动艾特提交者并附带播放链接。

- **服务器升级主动提示**：当服务器进行版本升级或系统维护时，向用户提醒，确保服务状态实时感知。
  - 🙌 特别感谢 QQ 悠哈 提供的建议

<p align="center">
  <img src="https://raw.githubusercontent.com/RengarLee/sf6s/main/changelogs/v0.0.1/update.png" alt="服务器升级提示" width="500" />
</p>

## 优化

- **友好话术与引导提醒**：未识别到角色或招式名时提供智能纠错与补全建议话术；在群聊艾特机器人的无输入场景下提供结构化提示话术与菜单指引。
