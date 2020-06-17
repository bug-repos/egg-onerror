'use strict';

const Service = require('egg').Service;

class TestService extends Service {
  constructor(ctx) {
    super(ctx);
    this.request = this.ctx.service.remoteAPI.request;
  }
  async echo() {
    const res = await this.request('get', 'https://www.oschina.net/action/openapi/user');
    return res;
  }
}

module.exports = TestService;

