"use strict";

const user = {
  async edit(ctx, next) {
    let imgpath = [];
    for (let i in ctx.request.files) {
      let filepath =
        ctx.config.baseUrl + ctx.request.files[i].filepath.split("public\\")[1];
      filepath = filepath.replace(/\\/, "/");
      imgpath.push(filepath);
    }
    await ctx.services.user.edit(
      ctx.jwtData.userid,
      ctx.request.body.content,
      imgpath
    );
    ctx.data = true;
    ctx.msg = "发表成功";
    return next();
  },
};

module.exports = user;
