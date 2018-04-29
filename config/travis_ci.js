module.exports = {
  env: 'test',
  debug: false,

  redis: {
    host: 'localhost',
    port: 6379,
    keyPrefix: 'birthday:'
  },

  mysql: {
    poolSize: 5,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'birthday'
  }
}
