# 微信公众号 AI 排版工具 🚀

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-blue?logo=node.js)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-green?logo=express)](https://expressjs.com/)

一款功能强大、简单易用的 AI 排版工具，旨在帮助内容创作者将 Markdown 格式的草稿，一键转换为兼容微信公众号编辑器的、格式精美的 HTML 代码。

![image](https://github.com/user-attachments/assets/038abd26-837d-4fe3-9a1c-f581ccb58eb1)

复制到公众号的预览效果：
![image](https://github.com/user-attachments/assets/0eb70dc2-3bd5-48c8-ae9a-d214581aedab)


---

## ✨ 功能特性

-   **🤖 AI 驱动**：利用大语言模型（如 GPT-4o, Gemini, Claude 等）的强大能力，根据您的风格要求智能排版。
-   **🎨 风格自定义**：通过简单的自然语言提示词，定义文章的整体视觉风格（如科技蓝、温馨活泼、商务专业等）。
-   **👁️ 实时预览**：在生成结果后，可以直观地预览排版效果。
-   **📄 代码视图**：提供生成的 HTML 源码视图，方便开发者检查。
-   **📋 一键复制**：优化过的“复制预览”功能，可将纯净的、兼容性最佳的 HTML 内容直接粘贴到微信编辑器，最大限度保留样式。
-   **🛡️ 微信兼容性**：内置的 System Prompt 严格遵循微信编辑器的样式“白名单”，确保生成的代码块、引用、标题等格式能稳定显示。

## ⚙️ 如何在本地运行

请确保您的电脑上已经安装了 [Node.js](https://nodejs.org/) (推荐 v18.x 或更高版本)。

### 第 1 步：获取项目文件

您可以选择以下两种方式之一来获取项目文件：

*   **方式 A (推荐): 使用 Git 克隆**
    ```bash
    git clone https://github.com/zhgarylu/wechat-formatter.git
    cd wechat-formatter
    ```

*   **方式 B: 下载 ZIP 压缩包**
    1.  在本页面点击绿色的 `Code` 按钮。
    2.  选择 `Download ZIP`。
    3.  解压下载的文件，并通过终端进入该项目文件夹。

### 第 2 步：初始化项目和安装依赖

在您的项目文件夹根目录下，打开终端并执行以下命令。

1.  **创建 `package.json` 文件**
    *   这个文件用于管理项目信息和依赖。
    ```bash
    npm init -y
    ```

2.  **安装所需依赖**
    *   本项目需要 `express`, `openai`, `dotenv`, 和 `cors`。
    ```bash
    npm install express openai dotenv cors
    ```
    安装完成后，您会看到一个 `node_modules` 文件夹和一个 `package-lock.json` 文件。

### 第 3 步：配置 API 连接

#### 3.1 配置 API 密钥

1.  **创建 `.env` 文件**
    *   首先，我们创建一个示例文件 `.env.example`。
    ```bash
    # For macOS / Linux
    echo "OPENAI_API_KEY=\"YOUR_API_KEY_HERE\"" > .env.example

    # For Windows
    echo OPENAI_API_KEY="YOUR_API_KEY_HERE" > .env.example
    ```
    *   然后，复制这个示例文件来创建您自己的配置文件：
    ```bash
    # For macOS / Linux
    cp .env.example .env

    # For Windows
    copy .env.example .env
    ```

2.  **填入您的 API 密钥**
    *   用代码编辑器打开刚刚创建的 `.env` 文件。
    *   将 `YOUR_API_KEY_HERE` 替换为您自己的真实 API 密钥。
    
    ```env
    # .env 文件内容示例
    OPENAI_API_KEY="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    ```

#### 3.2 (高级) 配置自定义 API 地址

默认情况下，本项目配置为连接 `gptgod.online` 的服务。如果您想使用**官方 OpenAI API** 或**其他兼容 OpenAI 的第三方服务**，请按以下步骤操作：

1.  **打开 `server.js` 文件**。

2.  **找到以下代码块** (大约在第 21 行):
    ```javascript
    const openai = new OpenAI({
        apiKey: apiKey,
        baseURL: "https://api.gptgod.online/v1", // <= 修改这里！
    });
    ```

3.  **修改 `baseURL` 的值**:
    *   **如果使用其他第三方服务**: 将 `"https://api.gptgod.online/v1"` 替换为您的服务商提供的 API 地址。例如：
        ```javascript
        baseURL: "https://your-custom-api-provider.com/v1"
        ```
    *   **如果使用官方 OpenAI 服务**: 您可以直接**删除** `baseURL` 这一行，因为 `openai` 库默认就会连接官方服务器。修改后如下：
        ```javascript
        const openai = new OpenAI({
            apiKey: apiKey,
        });
        ```

### 第 4 步：启动服务

一切准备就绪！运行以下命令启动应用：

```bash
node server.js
```

启动成功后，您会在终端看到以下信息：
```
服务器正在运行于 http://localhost:3000
前端页面可在 http://localhost:3000 访问
```

### 第 5 步：开始使用

打开您的浏览器，访问 `http://localhost:3000` 即可开始体验智能排版！

## 📖 使用指南

1.  **输入文章内容**: 在左侧的“文章内容”文本框中，粘贴您的 Markdown 或纯文本草稿。
2.  **定义排版风格**: 在“排版风格提示词”文本框中，用自然语言描述您想要的风格。例如：“我想要一个干净、专业的科技博客风格，主色调使用蓝色。”
3.  **开始排版**: 点击 "🚀 开始智能排版" 按钮，稍等片刻。
4.  **预览与复制**:
    -   AI 生成的结果会显示在右侧的“预览”区。
    -   点击“代码”标签页可以查看生成的 HTML 源码。
    -   点击“预览”区右上角的“复制预览”按钮，然后直接到微信公众号编辑器中粘贴即可。

## 📂 项目文件结构

```
wechat-ai-formatter/
├── public/
│   └── index.html      # 前端页面
├── .env                # (本地) 环境变量，存放API密钥
├── .env.example        # 环境变量示例文件
├── .gitignore          # Git 忽略配置
├── node_modules/       # (自动生成) 依赖库存放处
├── package-lock.json   # (自动生成) 依赖版本锁定
├── package.json        # 项目和依赖配置
├── README.md           # 就是你正在看的这个文件
└── server.js           # 后端 Express 服务器
```

## 🤝 贡献

欢迎任何形式的贡献！如果您有好的想法或发现了 Bug，请随时提交 Pull Request 或创建 Issue。

1.  Fork 本仓库
2.  创建您的新分支 (`git checkout -b feature/AmazingFeature`)
3.  提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4.  推送到您的分支 (`git push origin feature/AmazingFeature`)
5.  创建一个 Pull Request

## 📄 许可证

本项目采用 [MIT 许可证](https://opensource.org/licenses/MIT)。
