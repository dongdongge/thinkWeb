/* eslint-disable max-len,no-trailing-spaces */
/* eslint-disable no-undef */
import { routerRedux } from 'dva/router'
import { setAuthority } from '../../common/authority'
import { reloadAuthorized } from '../../common/Authorized'
import { resolveToken } from '../../common/utils'
import { TOKEN_NAME } from '../../common/constant'

export default {
  namespace: 'global',
  state: {
    collapsed: false,
    notices: [],
    currentUser: { areaName: '杭州市', orgName: '杭州市第一人民医院', name: '泪子', areaCode: '33010800', orgCode: '110105005', endTime: '2018-11-20' },
    authority: '',
    data: {},
  },
  reducers: {
    changeUser(state, { payload: { currentUser, authority } }) {
      setAuthority(authority)
      sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
      return { ...state, currentUser, authority }
    },
    changeLayoutCollapsed(state, { payload }) {
      return { ...state, collapsed: payload }
    },
    saveData(state, { payload: { data } }) {
      return { ...state, data }
    },
    reset(state) {
      return { ...state, currentUser: {}, authority: '' }
    },
  },

  effects: {
    // 用户登入  获取header里的token jwt解析并获取用户信息
    * login({ payload: { data } }, { call, put }) {
      // yield call(service.Login, data)
      // const currentUser = resolveToken()
      // const authority = currentUser.isAdmin ? 'UserManage' : ''
      // yield put({ type: 'changeUser', payload: { currentUser, authority } })
      // reloadAuthorized()
      // yield put(routerRedux.push('/OrganManage'))
    },
    // 用户登出
    * logout(_, { put }) {
      // window.sessionStorage.clear(TOKEN_NAME)
      // window.sessionStorage.clear(`${appName}-authority`)
      // yield put(routerRedux.push('/Login'))
    },
    // 用户信息查看
    *view({ payload: { id } }, { put, call }) {
      // const data = yield call(service.view, id)
      // yield put({ type: 'saveData', payload: { data } })
    },
    // 用户信息修改
    *saveInfo({ payload: { data, location } }, { call, put }) {
      // const userData = yield call(service.saveInfo, data)
      // const authority = userData.isAdmin ? 'UserManage' : ''
      // yield put({ type: 'changeUser', payload: { currentUser: userData, authority } })
      // if (location.pathname === '/UserManage') window.location.reload()
    },
    // 用户密码修改
    *savePassword({ payload: { data } }, { call, put }) {
      // yield call(service.savePassword, data)
      // yield put({ type: 'logout', payload: { } })
    },
  },
}
