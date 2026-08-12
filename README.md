# SF6S 版本变动日志库 (SF6S Changelogs)

本仓库专门用于存储 **SF6S 机器人** 各个版本的变动日志（Changelog）。
遵循 **极简风格**：仅包含版本日志与本 README 文档，无任何构建包或冗余代码。

---

## 📁 目录结构

```text
sf6s/
├── changelogs/
│   ├── v1.0.0/                  # 版本号目录 (格式: vX.Y.Z)
│   │   ├── zh-CN.md             # 简体中文变动日志
│   │   └── en-US.md             # 英文变动日志
│   └── v1.1.0/
│       ├── zh-CN.md
│       └── en-US.md
└── README.md
```

---

## ✍️ 如何添加新版本日志？

1. 在 `changelogs/` 目录下创建新版本的文件夹（例如 `changelogs/v1.1.0/`）。
2. 在新版本目录下创建不同语言的 Markdown 文件：
   - `zh-CN.md` （中文）
   - `en-US.md` （英文）
   - 按需增加其他语言文件（如 `ja-JP.md`）
3. 提交并推送到 GitHub 即可完成发布。

---

## 🌐 SF6S 机器人通过 GitHub 原生 REST API 读取日志

因为项目直接存储在 GitHub，外部系统（SF6S 机器人）可以直接通过 **GitHub 原生 REST API / Raw Content API** 读取版本目录与文件内容，无需任何额外服务器或中间件。

### 1. 读取版本列表 (GitHub REST API)
* **请求方式**: `GET https://api.github.com/repos/<OWNER>/<REPO>/contents/changelogs`
* **返回示例**:
  ```json
  [
    { "name": "v1.0.0", "type": "dir", "path": "changelogs/v1.0.0" },
    { "name": "v1.1.0", "type": "dir", "path": "changelogs/v1.1.0" }
  ]
  ```

### 2. 读取指定版本的语言文件列表 (GitHub REST API)
* **请求方式**: `GET https://api.github.com/repos/<OWNER>/<REPO>/contents/changelogs/v1.0.0`
* **返回示例**:
  ```json
  [
    { "name": "en-US.md", "type": "file", "download_url": "https://raw.githubusercontent.com/..." },
    { "name": "zh-CN.md", "type": "file", "download_url": "https://raw.githubusercontent.com/..." }
  ]
  ```

### 3. 直接获取指定语言变动日志原文 (Raw Content API)
* **请求方式**: `GET https://raw.githubusercontent.com/<OWNER>/<REPO>/main/changelogs/<VERSION>/<LANG>.md`
* **示例**:
  - `https://raw.githubusercontent.com/OWNER/REPO/main/changelogs/v1.0.0/zh-CN.md`
  - `https://raw.githubusercontent.com/OWNER/REPO/main/changelogs/v1.0.0/en-US.md`
