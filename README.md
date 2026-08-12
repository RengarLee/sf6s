# SF6S 机器人版本变动日志库 (SF6S Changelogs)

本仓库是 SF6S 机器人 (SF6Koishi) 专用的多语言版本变动日志（Changelog）集中存储库。

旨在提供一个极简、轻量、高可读且对 API 友好的变动日志管理方案。项目内不包含任何安装包或复杂的构建工具，完全依托 GitHub 原生 API 与 Raw CDN 供 SF6S 机器人或第三方客户端无缝读取。

---

## 当前版本：v0.0.1

**发布日期**: 2026-08-12

## 新增

- **SF6 招式帧数查询 (koishi-plugin-sf6-frame-data)**：支持通过角色名（如豪鬼、Akuma）与招式别名（如 5hp、236p、OD升龙）查询招式发生帧、硬直差、判定与伤害数据，并基于 Puppeteer 渲染为高清图片卡片。
- **对局回放录制与主动通知 (koishi-plugin-sf6-replayer)**：支持提交 9 位游戏内回放 ID 触发后台极速视频录制，视频发布（B站/YouTube 审核通过）后主动艾特提交者并附带播放链接。
- **全局去重与多频道订阅**：同一回放 ID 全局仅录制一次，多人提交自动转为多用户/多通道订阅通知。
- **助手菜单与 @Bot 智能引导 (koishi-plugin-sf6-assistant)**：支持通过 `功能` / `菜单` / `帮助` / `features` / `menu` 唤起主功能面板；在群聊中艾特 Bot 自动触发友好引导。
- **多平台协议支持**：支持 OneBot (QQ)、QQ 官方机器人、QQ-Crack、微信机器人、KOOK、Discord、Telegram 等多种消息适配器。

## 优化

- **友好话术与引导提醒**：未识别到角色或招式名时提供智能纠错与补全建议话术；在群聊艾特机器人的无输入场景下提供结构化提示话术与菜单指引。
- **互动与通知体验提升**：优化对局回放提交后的排队与实时状态变化话术反馈；后台录制节点繁忙或临时不可用时提供清晰的原因告知与自动排队挂起提醒。
- **文案国际化与体验统一**：将所有面向用户的反馈文本与提示提醒重构移入 Koishi locales 语言包，提供一致且自然的 `zh-CN` 与 `en-US` 交互对话体验。
- **卡片视觉与排版优化**：优化招式卡片上的落地硬直帧、指令箭头、蓄力按键图标及酒步层数显示，提升视觉阅读与对比交互体验。

## 修复

- 修复帧数卡片渲染在缺失部分字段时可能的样式坍塌问题。
- 修复在轮询状态过程中后台服务返回 404 时的任务状态流转异常。
- 修复偶发发送通知失败后无法重试的逻辑缺陷。

---

## 目录结构规范 (Directory Layout)

每个版本拥有独立的文件目录，每种语言对应独立的 Markdown 文件，格式标准如下：

```text
sf6s/
├── changelogs/
│   └── v0.0.1/                  # 首个版本目录 (格式: vX.Y.Z)
│       ├── zh-CN.md             # 简体中文变动日志
│       └── en-US.md             # 英文变动日志
└── README.md                    # 本说明文档
```

### 语言命名规范 (BCP 47)
- 简体中文：`zh-CN.md`
- 繁体中文：`zh-TW.md`
- 英文：`en-US.md`
- 日文：`ja-JP.md`

---

## 如何撰写与添加新版本日志 (Contribution Guide)

当 SF6S 机器人发布新版本变动时，按以下模式规范撰写：

- **新增**：用于记录全新开发的功能模块或指令。
- **优化**：用于记录话术提醒、引导提示与交互对话体验的提升与改良。
- **修复**：用于记录缺陷修正与异常报错补丁。

```markdown
# SF6Koishi 版本日志 - v0.0.2

发布日期: 2026-09-01

## 新增

- 新增招式伤害对比分析工具。

## 优化

- 优化招式查询未找到时的推荐话术提醒与菜单引导体验。

## 修复

- 修复某些招式别名在特定语境下匹配失效的问题。
```

---

## SF6S 机器人 REST API 读取指南 (REST API Integration)

SF6S 机器人或外部客户端可通过 GitHub 原生 API 或 Raw CDN 动态查询与展示变动日志。

### 接口 1：获取所有可用版本目录
- **请求方式**: `GET`
- **请求地址**: `https://api.github.com/repos/<OWNER>/<REPO>/contents/changelogs`
- **响应示例**:
  ```json
  [
    {
      "name": "v0.0.1",
      "type": "dir",
      "path": "changelogs/v0.0.1"
    }
  ]
  ```

### 接口 2：获取指定版本支持的语言文件列表
- **请求方式**: `GET`
- **请求地址**: `https://api.github.com/repos/<OWNER>/<REPO>/contents/changelogs/v0.0.1`
- **响应示例**:
  ```json
  [
    {
      "name": "en-US.md",
      "type": "file",
      "download_url": "https://raw.githubusercontent.com/<OWNER>/<REPO>/main/changelogs/v0.0.1/en-US.md"
    },
    {
      "name": "zh-CN.md",
      "type": "file",
      "download_url": "https://raw.githubusercontent.com/<OWNER>/<REPO>/main/changelogs/v0.0.1/zh-CN.md"
    }
  ]
  ```

### 接口 3：直接获取指定语言日志原文 (Raw Content)
- **请求方式**: `GET`
- **请求地址**: `https://raw.githubusercontent.com/<OWNER>/<REPO>/main/changelogs/<VERSION>/<LANG>.md`
- **示例**:
  - 中文日志: `https://raw.githubusercontent.com/<OWNER>/<REPO>/main/changelogs/v0.0.1/zh-CN.md`
  - 英文日志: `https://raw.githubusercontent.com/<OWNER>/<REPO>/main/changelogs/v0.0.1/en-US.md`

---

## 机器人端 JavaScript / Node.js 读取示例

```typescript
import fetch from 'node-fetch'

const OWNER = 'your-org'
const REPO = 'sf6s'

// 获取最新版本日志内容
async function fetchLatestChangelog(lang: string = 'zh-CN') {
  // 1. 获取版本目录列表
  const res = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/changelogs`)
  const contents = await res.json() as Array<{ name: string; type: string }>
  
  // 过滤并按语义化版本排序，拿到最新版本号
  const versionDirs = contents
    .filter(item => item.type === 'dir' && /^v\d+\.\d+\.\d+/.test(item.name))
    .map(item => item.name)
    .reverse()

  const latestVersion = versionDirs[0]
  if (!latestVersion) return null

  // 2. 拉取 Raw 变动日志 Markdown
  const rawUrl = `https://raw.githubusercontent.com/${OWNER}/${REPO}/main/changelogs/${latestVersion}/${lang}.md`
  const logRes = await fetch(rawUrl)
  
  if (!logRes.ok) {
    // 语言后退 fallback 至 zh-CN
    const fallbackRes = await fetch(`https://raw.githubusercontent.com/${OWNER}/${REPO}/main/changelogs/${latestVersion}/zh-CN.md`)
    return { version: latestVersion, markdown: await fallbackRes.text() }
  }

  return { version: latestVersion, markdown: await logRes.text() }
}
```

---

## 版本历史概览 (Version History)

| 版本号 | 发布日期 | 说明 | 对应日志目录 |
| :--- | :--- | :--- | :--- |
| **`v0.0.1`** | 2026-08-12 | SF6Koishi 机器人首个发布版本功能日志 | [`changelogs/v0.0.1/`](./changelogs/v0.0.1/) |

---

## 开源协议

本项目基于 [MIT License](LICENSE) 开源。
