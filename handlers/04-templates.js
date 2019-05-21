const pug = require('pug');
const config = require('config');
const path = require('path');


exports.init = app => app.use(async (ctx, next) => {

  ctx.locals = {
    get user() {
      return ctx.req.user;
    },

    get flash() {
      return ctx.flash();
    }
  };

  ctx.locals.csrf = () => ctx.csrf;

  ctx.render = function(templatePath, locals) {
    locals = locals || {};

    const localsFull = Object.create(ctx.locals);

    for(const key in locals) {
      localsFull[key] = locals[key];
    }
    // const templatePathResolved = path.join(config.template.root, templatePath + '.pug')

    return pug.renderFile(templatePath, localsFull);
  };

  await next();
});
