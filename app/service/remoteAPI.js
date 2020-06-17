'use strict';

const { Service } = require('egg');
const axios = require('axios');
const chalk = require('chalk');
const curl_helper = require('../utils/curl_helper');

const headerConfig = () => {
  const obj = {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  };
  return obj;
};
const generateRequestObj = (method, url, paramsObj, cancelToken = undefined) => {
  for (const key in paramsObj) {
    if (paramsObj[key] === undefined || paramsObj[key] === null) {
      delete paramsObj[key];
    }
  }

  const obj = {
    method,
    url,
    cancelToken,
  };
  if (method === 'get') {
    if (paramsObj) {
      obj.params = paramsObj;
      // get请求需要放到body的情况
      if (paramsObj.bodyParams) {
        obj.data = paramsObj.bodyParams;
      }
    }
  } else {
    obj.data = paramsObj;
  }
  return Object.assign({}, this.baseObj, obj, headerConfig());
};
class RemoteAPIService extends Service {
  async request(method, urlPath, params = {}, customHeader = {}) {
    // console.log('--func--- request', arguments)

    process.env.NODE_ENV !== 'production' &&
      console.log(
        chalk.red('调用后端api:'),
        chalk.blue(
          curl_helper({
            method,
            url: urlPath,
            urlParams: params,
            bodyParams: method !== 'get' ? params : params.bodyParams,
            header: customHeader,
          })
        )
      );
    console.log(typeof generateRequestObj);
    const configObj = generateRequestObj(method, urlPath, params);
    Object.assign(configObj.headers, customHeader);

    return axios(configObj).then(response => Promise.resolve(response.data)).catch(error => {
      if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      // console.log(error.response.data);
      // console.log(error.response.status);
      // console.log(error.response.headers);
        const errorRes = {
          status: error.response.status,
          statusText: error.response.statusText,
          data: { API_Error: error.response.data },
          config: error.response.config,
        };
        return Promise.reject(errorRes);
      }
      return Promise.reject(error.message);

    });
  }
}

module.exports = RemoteAPIService;
