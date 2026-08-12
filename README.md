# SF6S 机器人版本变动日志库 (SF6S Changelogs)

本仓库是 **SF6S 机器人 (SF6Koishi)** 专用的多语言版本变动日志（Changelog）集中存储库。

旨在提供一个**极简、轻量、高可读且对 API 友好**的变动日志管理方案。项目内**不包含任何安装包或复杂的构建工具**，完全依托 GitHub 原生 API 与 Raw CDN 供 SF6S 机器人或第三方客户端无缝读取。

---

## 📁 目录结构规范 (Directory Layout)

每个版本拥有独立的文件目录，每种语言对应独立的 Markdown 文件，格式标准如下：

```text
sf6s/
├── changelogs/
│   ├── v1.0.0/                  # 版本号目录 (遵循 Semantic Versioning 规范: vX.Y.Z)
│   │   ├── zh-CN.md             # 简体中文变动日志
│   │   └── en-US.md             # 英文变动日志
│   └── v1.1.0/                  # 最新版本目录
│       ├── zh-CN.md
│       └── en-US.md
└── README.md                    # 本说明文档
```

### 语言命名规范 (BCP 47)
- 简体中文：`zh-CN.md`
- 繁体中文：`zh-TW.md`
- 英文：`en-US.md`
- 日文：`ja-JP.md`

---

## ✍️ 如何撰写与添加新版本日志？ (Contribution Guide)

当 SF6S 机器人发布新版本变动时，按以下步骤更新日志：

### 1. 创建版本目录
在 [`changelogs/`](./changelogs) 目录下新建以版本号命名的文件夹（如 `changelogs/v1.2.0/`）。

### 2. 编写多语言日志文件
在新建的版本目录下创建对应的语言 `.md` 文件（如 `zh-CN.md`）。日志建议使用统一的标题与分类图标，以提升可读性：

```markdown
# SF6Koishi 版本日志 - v1.2.0

发布日期: 2026-09-01

## 🎉 核心功能 (Key Features)
- 新增 xx 招式伤害对比分析工具。

## 🚀 功能升级 (Enhancements)
- 优化帧数卡片在高分辨率下的渲染质量。

## 🐞 修复 (Bug Fixes)
- 修复某些招式别名在特定语境下匹配失效的问题。
```

### 3. 提交与推送
```bash
git add .
git commit -m "docs: add changelogs for v1.2.0"
git push origin main
```
推送成功后，SF6S 机器人即可实时读取到最新的版本日志。

---

## 🌐 SF6S 机器人 REST API 读取指南 (REST API Integration)

SF6S 机器人或外部客户端可通过 **GitHub 原生 API** 或 **Raw CDN** 动态查询与展示变动日志。

### 接口 1：获取所有可用版本目录
- **请求方式**: `GET`
- **请求地址**: `https://api.github.com/repos/<OWNER>/<REPO>/contents/changelogs`
- **响应示例**:
  ```json
  [
    {
      "name": "v1.0.0",
      "type": "dir",
      "path": "changelogs/v1.0.0"
    },
    {
      "name": "v1.1.0",
      "type": "dir",
      "path": "changelogs/v1.1.0"
    }
  ]
  ```

### 接口 2：获取指定版本支持的语言文件列表
- **请求方式**: `GET`
- **请求地址**: `https://api.github.com/repos/<OWNER>/<REPO>/contents/changelogs/v1.1.0`
- **响应示例**:
  ```json
  [
    {
      "name": "en-US.md",
      "type": "file",
      "download_url": "https://raw.githubusercontent.com/<OWNER>/<REPO>/main/changelogs/v1.1.0/en-US.md"
    },
    {
      "name": "zh-CN.md",
      "type": "file",
      "download_url": "https://raw.githubusercontent.com/<OWNER>/<REPO>/main/changelogs/v1.1.0/zh-CN.md"
    }
  ]
  ```

### 接口 3：直接获取指定语言日志原文 (Raw Content)
- **请求方式**: `GET`
- **请求地址**: `https://raw.githubusercontent.com/<OWNER>/<REPO>/main/changelogs/<VERSION>/<LANG>.md`
- **示例**:
  - 中文日志: `https://raw.githubusercontent.com/<OWNER>/<REPO>/main/changelogs/v1.1.0/zh-CN.md`
  - 英文日志: `https://raw.githubusercontent.com/<OWNER>/<REPO>/main/changelogs/v1.1.0/en-US.md`

---

## 💻 机器人端 JavaScript / Node.js 读取示例

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

## 📜 版本历史概览 (Version History)

| 版本号 | 发布日期 | 说明 | 对应日志目录 |
| :--- | :--- | :--- | :--- |
| **`v1.1.0`** | 2026-08-12 | 招式判定与酒步支持、回放容灾、国际化重构 | [`changelogs/v1.1.0/`](./changelogs/v1.1.0/) |
| **`v1.0.0`** | 2026-07-15 | SF6Koishi 机器人首个正式版本发布 | [`changelogs/v1.0.0/`](./changelogs/v1.0.0/) |

---

## 📄 开源协议

本项目基于 [MIT License](LICENSE) 开源。
