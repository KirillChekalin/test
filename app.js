const Koa = require('koa');
const app = new Koa();

const config = require('config');
const path = require('path');
const fs = require('fs');
const Router = require('koa-router');

const router = new Router();

const handlers = fs.readdirSync(path.join(__dirname, 'handlers')).sort();
handlers.forEach(handler => require('./handlers/' + handler).init(app));

router.get('/', require('./routes/index'));

router.get('/users', require('./routes/users').get);
router.post('/users', require('./routes/users').post);

router.get('/about', require('./routes/about'));
router.get('/logout', require('./routes/logout'));

app.use(router.routes());
app.listen(config.get('port'));
