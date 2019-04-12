/* eslint-disable prefer-const,no-unused-expressions,no-extra-boolean-cast,no-param-reassign,guard-for-in */
/**
 * utils
 */

import qs from 'qs'
import cloneDeep from 'lodash.clonedeep'
import jwt from 'jsonwebtoken'
import request from '../common/request'
import { TOKEN_NAME } from '../common/constant'

const COMMON = '/api/areaCode'

/**
 * json转url
 * @param uri 地址
 * @param params 参数
 * @returns {*}
 */
export function getQueryUrl(uri, params) {
  return `${uri}?${qs.stringify(params)}`
}

/**
 * 获取路由节点列表
 * @param navData 路由数据
 * @param layoutName 布局名称
 * @returns {null} 布局下的子路由
 */
export function getRouteData(navData, layoutName) {
  if (!navData.some(item => item.layout === layoutName) ||
    !(navData.filter(item => item.layout === layoutName)[0].children)) {
    return null
  }
  const route = (navData.filter(item => item.layout === layoutName)[0]).children
  return route.map(node => node)
}

/**
 * 数组格式转树状结构
 * @param   {array}     array
 * @param   {String}    id
 * @param   {String}    pid
 * @param   {String}    children
 * @return  {Array}
 */
export const arrayToTree = (array, id = 'id', pid = 'pid', children = 'children') => {
  let data = cloneDeep(array)
  let result = []
  let hash = {}
  data.forEach((item, index) => {
    hash[data[index][id]] = data[index]
  })

  data.forEach((item) => {
    const hashVP = hash[item[pid]]
    if (hashVP) {
      !hashVP[children] && (hashVP[children] = [])
      hashVP[children].push(item)
    } else {
      result.push(item)
    }
  })
  return result
}

/**
 * 数组内查询
 * @param   {array}      array
 * @param   {String}    key
 * @param   {String}    keyAlias
 * @return  {Array}
 */
export const queryArray = (array, key, keyAlias = 'key') => {
  if (!(array instanceof Array)) {
    return null
  }
  const item = array.filter(i => i[keyAlias] === key)
  if (item.length) {
    return item[0]
  }
  return null
}

/**
 * 日期转换
 * @param   {moment}    date
 * @param   {String}    format（"YYYY-MM-DD" "YYYY-MM-RR HH:MM;SS"）
 * @return  {String}
 */
export const dateToString = (date, format) => {
  return date ? date.format(format) : ''
}

export function urlToList(url) {
  const urllist = url.split('/').filter(i => i)
  return urllist.map((urlItem, index) => {
    return `/${urllist.slice(0, index + 1).join('/')}`
  })
}

/**
 * 数组转字符串
 * @param array
 * @param concat
 * @returns {null}
 */
export const arrayToString = (array, concat = ',') => {
  return array && array.length > 0 ? array.join(concat) : null
}


/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g

function isUrl(path) {
  return reg.test(path)
}

/**
 * 菜单生成
 * @param {Array} data
 * @param {String} parentPath
 * @param {*} parentAuthority
 */
export function formatter(data, parentPath = '', parentAuthority) {
  return data.map((item) => {
    let { path } = item
    if (!isUrl(path)) path = parentPath + path
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    }
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority)
    }
    return result
  })
}

/**
 * 页面布局
 */
export function getGrid(span = 12) {
  if (span === 24) {
    return {
      xl: 24, lg: 24, md: 24, sm: 24,
    }
  } else {
    return {
      xl: span, lg: 12, md: 12, sm: 24,
    }
  }
}

/**
 * formitemLayout的布局
 */
export function getFormItemLayout(labelSpan, wrapperSpan) {
  if (labelSpan || wrapperSpan) {
    return {
      labelCol: { span: labelSpan || 24 - wrapperSpan },
      wrapperCol: { span: wrapperSpan || 24 - labelSpan },
    }
  }
  return {
    labelCol: {
      xl: { span: 12 },
      lg: { span: 12 },
    },
    wrapperCol: {
      xl: { span: 12 },
      lg: { span: 12 },
    },
  }
}
/**
 * 判断是否为数组
 */
export function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]'
}

/**
 * 查询监督员getSupervisor
 * @param cache 是否缓存
 * @returns {Promise.<*>}
 */
export async function getSupervisor(cache = true) {
  if (cache) {
    const obj = JSON.parse(sessionStorage.getItem('supervisor'))
    if (!!obj) {
      return obj
    }
  }

  const obj = await request('/api/jdy')
  if (!obj || (Object.keys(obj)).length === 0) {
    return []
  }

  sessionStorage.setItem('supervisor', JSON.stringify(obj))
  return obj
}
/**
 * 下拉框通用
 * @param cache 是否缓存
 * @param cacheName 缓存名称
 * @param api 查询路径
 * @returns {Promise.<*>}
 */
export async function getSelect(cache = true, cacheName, api) {
  if (cache) {
    const obj = JSON.parse(sessionStorage.getItem(cacheName))
    if (!!obj) {
      return obj
    }
  }

  const obj = await request(api)
  if (!obj || (Object.keys(obj)).length === 0) {
    return []
  }

  sessionStorage.setItem(cacheName, JSON.stringify(obj))
  return obj
}
/**
 * 查询字典表getCode
 * @param api api网关
 * @param typeId 字段关键字
 * @param cache 是否缓存
 * @returns {Promise.<*>}
 */
export async function getDictionary(typeId, cache = true, api = COMMON) {
  if (cache) {
    const obj = JSON.parse(sessionStorage.getItem(typeId))
    if (!!obj) {
      return obj
    }
  }

  // const obj = await request(`${api}/sysCode/list?typeId=${typeId}`)
  const obj = undefined
  if (!obj || (Object.keys(obj)).length === 0) {
    return []
  }

  sessionStorage.setItem(typeId, JSON.stringify(obj))
  return obj
}

/**
 * 地区数据
 * @param cache
 * @param api
 * @returns {Promise.<*>}
 */
export async function getFullAddress(cache = true, api = COMMON) {
  if (cache) {
    const obj = JSON.parse(sessionStorage.getItem('fullAddress'))
    if (!!obj) {
      return obj
    }
  }

  const obj = await request(`${api}`)
  if (!obj || (Object.keys(obj)).length === 0) {
    return []
  }

  sessionStorage.setItem('fullAddress', JSON.stringify(obj))
  return obj
}

/**
 * 全国地区级联查询
 * @param parentCode
 * @param api api网关
 * @returns {Promise.<*>}
 */
export async function getCascade(parentCode, api = COMMON) {
  const obj = await request(`${api}/areaInfo/list?parentCode=${parentCode}`)
  if (!obj || obj.length === 0) {
    return null
  } else {
    obj.map(data =>
      Object.assign(data, { isLeaf: false })
    )
  }
  return obj
}

/**
 * 全国机构级联查询
 * @param parentCode
 * @param api api网关
 * @returns {Promise.<*>}
 */
export async function getOrgCascade(parentCode, api = COMMON) {
  const obj = await request(`${api}/orgInfo/list?areaCode=${parentCode}`)
  if (!obj || obj.length === 0) {
    return null
  } else {
    obj.map(data =>
      Object.assign(data, { isLeaf: false })
    )
  }
  return obj
}

/**
 * 用户等级判断
 */
export function getLevel(code) {
  if (code) {
    if (code.length === 2) {
      return 1
    } else if (code.length === 4) {
      return 2
    } else if (code.length === 6) {
      return 3
    } else {
      return 4
    }
  }
  return 0
}

/**
 * 获得用户的地区编码
 * 若为数组则直接返回 若不为数组则根据最后一段编码还原为全字段编码
 * example: code: 41012542 =>  ['41010000', '41012500', '41012542']
 */
export function getCode(code) {
  if (isArray(code) && code.length > 0) return code
  const level = getLevel(code)
  const codeArray = []
  if (level === 1) {
    return code.split(',')
  } else if (level === 2) {
    const first = `${code.split('').splice(0, 2).join('')}`
    codeArray.push(first)
    codeArray.push(code)
    return codeArray
  } else if (level === 3) {
    const second = `${code.split('').splice(0, 4).join('')}`
    const first = `${second.split('').splice(0, 2).join('')}`
    codeArray.push(first)
    codeArray.push(second)
    codeArray.push(code)
    return codeArray
  } else if (level === 4) {
    const third = `${code.split('').splice(0, 6).join('')}`
    const second = `${code.split('').splice(0, 4).join('')}`
    const first = `${second.split('').splice(0, 2).join('')}`
    codeArray.push(first)
    codeArray.push(second)
    codeArray.push(third)
    codeArray.push(code)
    return codeArray
  }
  return undefined
}

/**
 * jwt转换
 */
export function resolveToken() {
  const token = window.sessionStorage.getItem(TOKEN_NAME) || ''
  const parts = token.split(' ')
  if (parts.length === 2) {
    const scheme = parts[0]
    if (/^Bearer$/i.test(scheme)) {
      const user = jwt.decode(parts[1])
      const time = Math.floor((new Date()).getTime() / 1000)
      if (user && user.exp && user.exp > time) return user
    }
  }

  const error = new Error('尚未认证或认证已过期。')
  error.status = 401
  throw error
}

/**
 * 身份证校验
 */
export function IdentityCodeValid(id, callback) {
  let format = /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/
  // 号码规则校验
  if (!format.test(id)) {
    callback('身份证不合规')
  }
  // 区位码校验
  // 出生年月日校验   前正则限制起始年份为1900;
  let year = id.substr(6, 4) // 身份证年
  const month = id.substr(10, 2) // 身份证月
  const date = id.substr(12, 2) // 身份证日
  const time = Date.parse(`${month}-${date}-${year}`) // 身份证日期时间戳date
  const nowTime = Date.parse(new Date()) // 当前时间戳
  const dates = (new Date(year, month, 0)).getDate()// 身份证当月天数
  if (time > nowTime || date > dates) {
    callback('出生日期不合规')
  }
  // 校验码判断
  let c = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2] // 系数
  let b = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'] // 校验码对照表
  let idArray = id.split('')
  let sum = 0
  for (let k = 0; k < 17; k += 1) {
    sum += parseInt(idArray[k], 10) * parseInt(c[k], 10)
  }
  if (idArray[17] && idArray[17].toUpperCase() !== b[sum % 11].toUpperCase()) {
    callback('身份证不合规')
  }
  callback()
}
