'use strict';

const Controller = require('egg').Controller;

class TestController extends Controller {

  constructor(ctx) {
    super(ctx);
    this.service = this.ctx.service.test;
  }
  async echo(ctx) {
    const res = await this.service.echo();
    ctx.respondData(200, res);
  }
}

module.exports = TestController;
