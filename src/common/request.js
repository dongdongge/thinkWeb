import fetch from 'dva/fetch'
import { TOKEN_NAME } from '../common/constant'

function handelAuth(response) {
  if (response.headers.get('authorization')) window.sessionStorage.setItem(TOKEN_NAME, response.headers.get('authorization'))
  return response
}
function checkStatus(response) {
  if (response.status === 401) {
    const error = new Error('尚未认证或认证已过期。');
    error.response = response;
    throw error
  }

  if (response.status >= 200 && response.status < 300) {
    return response
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error
}

function checkData(resData) {
  // mock跳过检查
  if (typeof (resData.status) === 'undefined') {
    return resData
  }

  if (resData.status === 0) {
    return resData.data
  }
  const error = new Error(resData.error.message)
  error.code = resData.error.code
  error.response = resData
  throw error
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  const Authorization = window.sessionStorage.getItem(TOKEN_NAME);
  const defaultOptions = {
    headers: {
      authorization: `${Authorization}`,
    },
  };
  const newOptions = { ...defaultOptions, ...options }
  if (newOptions.method === 'POST' || newOptions.method === 'PUT' || newOptions.method === 'DELETE') {
    newOptions.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      ...newOptions.headers,
    };
    newOptions.body = JSON.stringify(newOptions.body)
  }

  return fetchData(url, newOptions)
}

/**
 * 上传文件
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export function postFile(url, options) {
  const Authorization = window.sessionStorage.getItem(TOKEN_NAME)
  const defaultOptions = {
    headers: {
      authorization: `${Authorization}`,
    },
    credentials: 'include',
    method: 'POST',
  }
  const newOptions = { ...defaultOptions, ...options };
  return fetchData(url, newOptions)
}

function fetchData(url, options) {
  console.log("fetchData");
  console.log(options);
  return fetch(url, options)
    .then(checkStatus)
    .then(handelAuth)
    .then(response => response.json())
    .then(checkData)
    .catch((error) => { throw error })
}
