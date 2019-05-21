const favicon = require('koa-favicon');

let arr = __dirname.split('/');
arr.splice(-1,1,'public/favicon.ico');
let path = arr.join('/');

exports.init = app => app.use(favicon(path));
