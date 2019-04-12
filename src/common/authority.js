/* eslint-disable no-undef */

export function getAuthority() {
  return sessionStorage.getItem(`${appName}-authority`) || ''
}

export function setAuthority(authority) {
  return sessionStorage.setItem(`${appName}-authority`, authority)
}
