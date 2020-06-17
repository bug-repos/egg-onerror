'use strict';

// reference: https://eggjs.org/zh-cn/basics/extend.html#context

module.exports = {
  respondData(status, json) {
    /**
     * 如果是后端api错误，json是一个对象
     * 如果是链接错误，json是string
     * 如果是node运行错误，json是Error
     */
    if (!json) {
      json = {};
      switch (status) {
        case 401:
          json.msg = 'session expired';
          break;
        case 403:
          json.msg = 'permission denied';
          break;
        case 200:
          json.msg = 'success';
          break;
        default:
          break;
      }
    }
    if (typeof json === 'string') {
      json = { msg: json };
    }
    if (json instanceof Error) {
      json = {
        name: json.name,
        message: json.message,
        stack: json.stack,
        data: 'Node_Error',
      };
    }
    this.status = status;
    this.body = {
      result: json,
    };
  },
};
