import React, { Component } from 'react'
import { Layout, BackTop, Form, Button, message } from 'antd'
import { connect } from 'dva'
import { ContainerQuery } from 'react-container-query'
import classNames from 'classnames'
import Authorized from '../common/Authorized'
import { routerRedux } from 'dva/router'
import Loader from '../components/Loader'
import BasicSider from './BasicSider'
import BasicHeader from './BasicHeader'
import { getMenuData } from '../common/menu'
import logo from '../assets/title.png'

const { Content } = Layout;

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
  },
}
@Form.create()
@connect(state => ({
  currentUser: state.global.currentUser,
  collapsed: state.global.collapsed,
  data: state.global.data,
  loading: state.loading,
  load: state.loading.models.global,
}))
export default class BasicLayout extends Component {
  constructor() {
    super()
    this.state = { type: null }
  }
  componentDidMount() {
    const { pathname } = this.props.location
    // if (window.sessionStorage.getItem('token') === null) {
    //   this.props.dispatch(routerRedux.push('/Login'))
    // } else {
    //   const currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
    //   const authority = currentUser.isAdmin ? 'UserManage' : ''
    //   this.props.dispatch({ type: 'global/changeUser', payload: { currentUser, authority } })
    //   if (pathname === '/') { this.props.dispatch(routerRedux.push('/OrganManage')) }
    // }
  }
  // 点击头部菜单事件
  onMenuClick = (e) => {
    const { dispatch } = this.props
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (e.key === 'logout') {
      this.props.dispatch({ type: 'global/logout' })
    } else if (e.key) {
      this.setState({ type: e.key }, () => {
        if (e.key === 'edit') { dispatch({ type: 'global/saveData', payload: { data: currentUser } }) }
        this.props.showModal()
      })
    }
  };
  // Menu开关
  changeCollapsed = (collapsed) => {
    this.props.dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: collapsed,
    })
  }

  render() {
    const { collapsed, location, loading, currentUser } = this.props
    const margin = collapsed ? '56px 0 0 80px' : '56px 0 0 256px'
    const layout = (
      <Layout>
        <Loader fullScreen spinning={loading.effects['global/login']} />
        <BasicSider
          logo={logo}
          location={location}
          menus={getMenuData()}
          collapsed={collapsed}
          onCollapse={this.changeCollapsed}
          Authorized={Authorized}
        />
        <Layout>
          <BasicHeader
            collapsed={collapsed}
            currentUser={currentUser}
            onMenuClick={this.onMenuClick}
            onCollapse={this.changeCollapsed}
          />
          <Content style={{ margin }}>
            <Content>{this.props.children}</Content>
          </Content>
          <BackTop style={{ right: 16, bottom: 64 }} />
        </Layout>
      </Layout>
    )

    return (
      <ContainerQuery query={query}>
        {params => <div className={classNames(params)}>{layout}</div>}
      </ContainerQuery>
    )
  }
}
