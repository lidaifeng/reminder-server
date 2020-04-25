module.exports = {
  env: 'production',
  debug: process.env.APP_DEBUG === 'false',

  server: {
    host: '0.0.0.0',
    port: 8000,
    baseUrl: process.env.APP_SERVER_BASE_URL || 'http://localhost:8000/'
  },

  keys: [
    process.env.APP_KEYS_1 || 'im a newer secret',
    process.env.APP_KEYS_2 || 'i like turtle'
  ],

  redis: {
    host: process.env.APP_REDIS_HOST || 'redis',
    port: Number(process.env.APP_REDIS_PORT || 6379),
    keyPrefix: process.env.APP_REDIS_KEY_PREFIX || 'reminder:'
  },

  mysql: {
    host: process.env.APP_MYSQL_HOST || 'mysql',
    port: Number(process.env.APP_MYSQL_PORT || 3306),
    user: process.env.APP_MYSQL_USER || 'root',
    password: process.env.APP_MYSQL_PASSWORD || 'root',
    database: process.env.APP_MYSQL_DATABASE || 'reminder'
  },

  wechat: {
    corpId: process.env.APP_WECHAT_CORP_ID || 'corp id',
    secret: process.env.APP_WECHAT_SECRET || 'secret',
    agentId: Number(process.env.APP_WECHAT_AGENT_ID || 0),
    bgImage: process.env.APP_WECHAT_BG_IMAGE || 'https://cdn.qiujun.me/image/2018/09/04/06c2d3f70e6fed342e2eb43bce55fb43.png!/both/720x400'
  }
}
