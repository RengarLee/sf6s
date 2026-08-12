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

- **招式匹配算法优化**：增强 `findMove` 算法，精准区分前前、前跃（forward jump）及无输入（no input）招式变体，支持衍生招式共享前缀匹配。
- **帧数卡片渲染增强**：支持落地硬直帧（landing frames）、指令方向箭头及酒步层数（杰米醉拳层数）复合条件渲染，增加蓄力按键图标。
- **容灾与自动重试**：后台 Worker 繁忙或排队满载时自动标记任务挂起，服务器上线后自动恢复并重试。
- **文案国际化重构**：将所有面向用户的文本统一重构移入 Koishi locales 语言包，原生支持 `zh-CN` 与 `en-US`。

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

当 SF6S 机器人发布新版本变动时，必须严格按照以下模式撰写：

```markdown
# SF6Koishi 版本日志 - v0.0.2

发布日期: 2026-09-01

## 新增

- 新增招式伤害对比分析工具。

## 优化

- 优化帧数卡片在高分辨率下的渲染质量。

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
