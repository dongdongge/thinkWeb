import { CURRENT } from './index'

/**
 * 通用权限检查方法
 * Common check permissions method
 * @param { 权限判定 Permission judgment type string |array | Promise | Function } authority
 * @param { 你的权限 Your permission description  type:string} currentAuthority
 * @param { 通过的组件 Passing components } target
 * @param { 未通过的组件 no pass components } Exception
 */
const checkPermissions = (authority, currentAuthority, target, Exception) => {
  // 没有判定权限.默认查看所有
  // Retirement authority, return target;
  if (!authority) {
    return target
  }

  // 数组处理
  if (Array.isArray(authority)) {
    const auth = currentAuthority.replace(/ /g, '').split(',')
    const arr = [...authority, ...auth]
    const authArr = Array.from(new Set(arr))

    if (authArr.length < arr.length) {
      return target
    }
    return Exception
  }

  // string 处理
  if (typeof authority === 'string') {
    const arr = currentAuthority.replace(/ /g, '').split(',')
    const auth = arr.filter(item => item === authority)
    if (auth.length > 0) {
      return target
    }
    return Exception
  }

  // Function 处理
  if (typeof authority === 'function') {
    try {
      const bool = authority(currentAuthority)
      if (bool) {
        return target
      }
      return Exception
    } catch (error) {
      throw error
    }
  }
  throw new Error('unsupported parameters')
}

export { checkPermissions }

const check = (authority, target, Exception) => {
  return checkPermissions(authority, CURRENT, target, Exception)
}

export default check
