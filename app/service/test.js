'use strict';

const Service = require('egg').Service;

class TestService extends Service {
  constructor(ctx) {
    super(ctx);
    this.request = this.ctx.service.remoteAPI.request;
  }
  async echo() {
    const res = await this.request('get', 'http://op.plustest.ndog.co/api2/testaaa');
    return res;
  }
}

module.exports = TestService;

