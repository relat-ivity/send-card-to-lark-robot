import fetch from "node-fetch";

// === 配置区 ===
const { loadHook } = require('./hook_loader');
const webhook = loadHook();

// === 生成日期信息 ===
const date = new Date();
const weekdayNumber = date.getDay();
const lastDay = 5 - weekdayNumber;


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
      padding: "12px 12px 12px 12px",
      elements: [{
          tag: "markdown",
          content: `恭喜你们又熬到下班，距离周末还有${lastDay}天。\nMaiicy与你们同在，麦门😊👍`,
          text_align: "left",
          text_size: "normal_v2",
          margin: "0px 0px 0px 0px"
        },
        {
          tag: "img",
          img_key: "img_v3_02r9_f46ea10e-5ee5-473d-9c02-127faa03821g",
          preview: true,
          transparent: false,
          scale_type: "crop_top",
          size: "large",
          margin: "0px 0px 0px 0px"
        }
      ]
    },
    header: {
      title: {
        tag: "plain_text",
        content: "下班打卡"
      },
      subtitle: {
        tag: "plain_text",
        content: ""
      },
      template: "green",
      padding: "12px 12px 12px 12px"
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
