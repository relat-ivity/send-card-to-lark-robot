# send-card-to-lark-robot
用于向飞书自定义群机器人🤖定时发送上下班打卡提醒。

## 💻 配置
安装依赖
``` bash
npm install node-fetch
```
新建`hook.json`配置
```json
{
  "FEISHU_WEBHOOK": "https://open.feishu.cn/open-apis/bot/v2/hook/xxxxxx"
}
```

## 🕜 定时
1. run里运行`taskschd.msc`打开windows任务计划程序
2. 创建任务,添加触发器和操作
3. 程序或脚本填`node`
4. 添加参数填`\path\to\send_feishu_card.js`
5. 起始于填脚本所在目录。
