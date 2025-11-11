import fetch from "node-fetch"; // 如果是 CommonJS，用 require

// === 配置区 ===
import { loadHook } from './hook_loader.js';
const webhook = loadHook();

// === 生成日期信息 ===
const date = new Date();
const today = date.toISOString().split("T")[0];
const weekdays = ["日", "一", "二", "三", "四", "五", "六"];
const weekdayNumber = date.getDay();
const weekday = weekdays[weekdayNumber];
let lastDay = 6 - weekdayNumber;
if (lastDay < 0) lastDay = 0;

// === 组装卡片 JSON ===
const card = {
    msg_type: "interactive",
    card: {
        schema: "2.0",
        config: {
            update_multi: true,
            style: {
                text_size: {
                    normal_v2: {
                        default: "normal",
                        pc: "normal",
                        mobile: "heading"
                    }
                }
            }
        },
        body: {
            direction: "vertical",
            padding: "12px",
            elements: [{
                    tag: "markdown",
                    content: `今天是${today}，星期${weekday}，距离周末还有${lastDay}天。\nMaiicy与你们同在，麦门😊👍`,
                    text_align: "left",
                    text_size: "normal_v2"
                },
                {
                    tag: "img",
                    img_key: "img_v3_02r9_f311cdc5-e65d-4665-8caf-9ca15bf3889g",
                    preview: true,
                    transparent: false,
                    scale_type: "crop_top",
                    size: "large"
                }
            ]
        },
        header: {
            title: {
                tag: "plain_text",
                content: "上班打卡"
            },
            template: "blue"
        }
    }
};

// === 发送请求 ===
(async () => {
    try {
        const res = await fetch(webhook, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(card)
        });

        const result = await res.text();
        console.log(`[${new Date().toLocaleString()}] 飞书卡片发送结果：`, result);
    } catch (err) {
        console.error("❌ 发送失败：", err);
    }
})();