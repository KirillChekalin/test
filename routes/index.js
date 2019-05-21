
module.exports = (ctx, next) => {
    ctx.body = ctx.render('./templates/index.pug');
};
