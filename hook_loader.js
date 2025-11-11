const fs = require('fs');
const path = require('path');

/**
 * 读取 JSON 配置文件，并返回 FEISHU_WEBHOOK
 * @param {string} filename 配置文件名，默认 'hook.json'
 * @returns {string} webhook 地址
 */
function loadHook(filename = 'hook.json') {
  const configPath = path.join(__dirname, filename);

  let config;
  try {
    const rawData = fs.readFileSync(configPath, 'utf-8');
    config = JSON.parse(rawData);
  } catch (err) {
    console.error(`⚠️ 找不到 ${filename} 或 JSON 格式错误，请检查！`);
    process.exit(1);
  }

  return config.FEISHU_WEBHOOK;
}

// 导出函数
module.exports = { loadHook };