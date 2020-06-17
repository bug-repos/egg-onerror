'use strict';

const querystring = require('querystring');

const getHeaders = (header = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...header,
  };
  let curlHeaders = '';
  Object.keys(headers).forEach(property => {
    const k = `${property}:${headers[property]}`;
    curlHeaders = `${curlHeaders} -H "${k}"`;
  });
  return curlHeaders.trim();
};

const getMethod = method => {
  return `-X ${method.toUpperCase()}`;
};

const getBody = (body = {}) => {
  const data =
    typeof body === 'object' || Object.prototype.toString.call(body) === '[object Array]'
      ? JSON.stringify(body)
      : body;
  return `--data '${data}'`.trim();
};

const getBuiltURL = (url, params) => {
  let queryStr = querystring.stringify(params);
  if (queryStr) queryStr = url.indexOf('?') === -1 ? '?' + queryStr : '&' + queryStr;
  return (url + queryStr).trim();
};

module.exports = ({ method = 'get', url, urlParams = {}, bodyParams = {}, header = {} }) => {
  method = method.toUpperCase();
  const finallyStr = `curl ${getMethod(method)}
    ${getHeaders(header)}
    ${method !== 'GET' ? getBody(bodyParams) : ''}
    "${getBuiltURL(url, urlParams)}"`
    .trim()
    .replace(/\s{2,}/g, ' ');
  return finallyStr;
};
