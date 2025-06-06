// server.js
const express = require('express');
const OpenAI = require('openai'); // 【改动】我们重新启用官方的 openai 库
const dotenv = require('dotenv');
const cors = require('cors');

// 加载 .env 文件中的环境变量
dotenv.config();

// --- 初始化 ---
const app = express();
const port = 3000; // 服务器运行的端口

// 检查 API 密钥是否存在
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey || apiKey === "YOUR_API_KEY_HERE") {
    console.error("错误：OPENAI_API_KEY 未在 .env 文件中正确设置。");
    process.exit(1); // 退出程序
}

// 【【【 核心改动 1：正确初始化 OpenAI 客户端 】】】
// 由于 API 是 OpenAI 兼容的，我们使用官方库并指定 baseURL
const openai = new OpenAI({
    apiKey: apiKey,
    baseURL: "https://api.gptgod.online/v1", // 指定您的服务商地址
});

// --- 中间件 ---
// 使用 CORS 中间件，允许所有来源的请求
app.use(cors()); 
// 解析传入的 JSON 请求体
app.use(express.json());
// 托管 public 文件夹中的静态文件 (我们的前端页面)
app.use(express.static('public'));

// --- API 路由 ---
// 【【【 核心改动 2：改回使用 openai 库的调用方式 】】】
app.post('/api/generate-wechat-html', async (req, res) => {
    try {
        const { system_prompt, user_prompt } = req.body;

        // 验证输入
        if (!system_prompt || !user_prompt) {
            return res.status(400).json({ success: false, error: '缺少 system_prompt 或 user_prompt' });
        }

        console.log("正在调用 OpenAI 兼容 API (gptgod.online)...");

        // 调用 Chat Completions API，这和最初的写法一样
        const completion = await openai.chat.completions.create({
            // 使用您之前提供的模型名称。如果这个模型仍然无效，您需要
            // 从 gptgod.online 获取一个您的账户可用的模型名称。
            model: "gemini-2.5-pro-preview-06-05", 
            messages: [
                {
                    "role": "system",
                    "content": system_prompt
                },
                {
                    "role": "user",
                    "content": user_prompt
                }
            ],
        });

        // openai 库会自动解析结果，代码更简洁
        const htmlOutput = completion.choices[0].message.content;
        
        console.log("成功从 API 获取结果。");

        // 将结果发送回前端
        res.json({ success: true, html_output: htmlOutput });

    } catch (error) {
        console.error("API 调用时发生错误:", error);
        // 错误信息会由 openai 库提供，更加清晰
        const errorMessage = error.message || '调用 API 失败，请检查后端日志获取详情。';
        res.status(500).json({ success: false, error: errorMessage });
    }
});


// --- 启动服务器 ---
app.listen(port, () => {
    console.log(`服务器正在运行于 http://localhost:${port}`);
    console.log('前端页面可在 http://localhost:3000 访问');
});