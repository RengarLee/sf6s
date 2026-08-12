# SF6S 多语言版本变动日志库 (SF6S Multi-language Changelogs)

本仓库专门用于管理 **SF6S 机器人** 的各个版本变动日志（Changelog）。
遵循 **“无二进制包发布、一个版本一个目录、一种语言一个 Markdown 文件”** 的规范设计。

---

## 📁 目录结构 (Directory Layout)

```text
sf6s/
├── changelogs/
│   ├── index.json               # 自动生成的全版本索引清单 (REST API 消费入口)
│   └── v1.0.0/                  # 版本号目录 (格式: vX.Y.Z)
│       ├── zh-CN.md             # 简体中文变动日志
│       ├── en-US.md             # 英文变动日志
│       └── ja-JP.md             # 日文变动日志 (按需扩展)
├── scripts/
│   ├── validate-changelogs.js   # 格式校验脚本
│   └── build-manifest.js        # 索引生成脚本
└── .github/workflows/
    ├── validate-changelogs.yml  # PR / Commit CI 校验
    └── release-changelog.yml    # 打 Tag 发布时自动生成 GitHub Release & 更新 index.json
```

---

## ✍️ 如何新增一个版本的变动日志？

1. 在 `changelogs/` 目录下新建当前版本的文件夹，例如 `changelogs/v1.1.0/`。
2. 在该目录下增加各语言的 `.md` 文件：
   - `zh-CN.md`
   - `en-US.md`
3. 本地运行校验命令：
   ```bash
   npm run validate
   ```
4. 本地生成/测试索引文件：
   ```bash
   npm run build:manifest
   ```
5. 提交并推送代码（或打 Tag 如 `git tag v1.1.0 && git push origin v1.1.0`），GitHub Actions 将自动校验并触发发布流程。

---

## 🌐 外部系统 (如 SF6S 机器人) REST API 读取方式

由于第三方服务/机器人需要定期从 GitHub 获取最新变动日志，可以通过以下 **REST API / Raw HTTP** 方式读取：

### 1. 获取全量版本及语言索引清单 (`index.json`)
* **Raw API 地址**:
  `GET https://raw.githubusercontent.com/<OWNER>/<REPO>/main/changelogs/index.json`
* **GitHub Contents REST API**:
  `GET https://api.github.com/repos/<OWNER>/<REPO>/contents/changelogs/index.json`
* **返回 JSON 结构示例**:
  ```json
  {
    "updatedAt": "2026-08-12T12:50:57.172Z",
    "latestVersion": "v1.0.0",
    "totalVersions": 1,
    "versions": [
      {
        "version": "v1.0.0",
        "availableLanguages": ["zh-CN", "en-US"],
        "languages": {
          "zh-CN": {
            "file": "changelogs/v1.0.0/zh-CN.md"
          },
          "en-US": {
            "file": "changelogs/v1.0.0/en-US.md"
          }
        }
      }
    ]
  }
  ```

### 2. 获取指定版本与语言的日志原文 (Raw Content API)
* **地址格式**:
  `GET https://raw.githubusercontent.com/<OWNER>/<REPO>/main/changelogs/<VERSION>/<LANG>.md`
* **示例**:
  - 中文: `https://raw.githubusercontent.com/OWNER/REPO/main/changelogs/v1.0.0/zh-CN.md`
  - 英文: `https://raw.githubusercontent.com/OWNER/REPO/main/changelogs/v1.0.0/en-US.md`

### 3. 获取 GitHub Releases 官方 REST API (不含二进制附件)
* **地址格式**:
  `GET https://api.github.com/repos/<OWNER>/<REPO>/releases`
  `GET https://api.github.com/repos/<OWNER>/<REPO>/releases/tags/v1.0.0`

---

## ⚙️ CI/CD 自动化说明

1. **格式校验工作流 (`validate-changelogs.yml`)**:
   - 监听 `main` 分支的提交与 Pull Request。
   - 自动检测版本文件夹格式（必须符合 `vX.Y.Z` 规范）、校验是否包含无效文件或空文件。

2. **自动发布工作流 (`release-changelog.yml`)**:
   - 监听以 `v*` 开头的 Tag 推送（如 `v1.0.0`）。
   - 自动生成最新的 `index.json` 并提交回仓库。
   - 调用 GitHub REST API 创建对应的 GitHub Release，并将变动日志写入 Release 说明中，**不附带任何编译安装包/zip二进制文件**。
