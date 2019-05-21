const bodyparser = require('koa-bodyparser');

exports.init = app => app.use(bodyparser({
  jsonLimit: '56kb'
}));
