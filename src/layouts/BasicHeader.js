import React, { PureComponent } from 'react'
import { Menu, Icon, Layout, Dropdown, Avatar } from 'antd'
import Debounce from 'lodash-decorators/debounce'

import styles from './BasicHeader.less'

const { Header } = Layout;

export default class BasicHeader extends PureComponent {
  componentWillUnmount() {
    this.triggerResizeEvent.cancel()
  }

    toggle = () => {
      const { collapsed, onCollapse } = this.props
      onCollapse(!collapsed)
      this.triggerResizeEvent()
    }

  @Debounce(600)
  triggerResizeEvent() { // eslint-disable-line
      const event = document.createEvent('HTMLEvents')
      event.initEvent('resize', true, false)
      window.dispatchEvent(event)
    }

  render() {
    const { collapsed, onMenuClick, currentUser } = this.props
    const margin = collapsed ? 80 : 256
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={e => onMenuClick(e)}>
        <Menu.Item key="edit"><Icon type="edit" />修改信息</Menu.Item>
        <Menu.Item key="password"><Icon type="lock" />修改密码</Menu.Item>
        <Menu.Item key="logout"><Icon type="logout" />退出系统</Menu.Item>
      </Menu>
    )
    return (
      <Header className={styles.header} style={{ marginRight: margin }}>
        <Icon
          className={styles.trigger}
          style={{ marginLeft: margin }}
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.toggle}
        />
        <div className={styles.right}>
          <Dropdown overlay={menu} trigger={['click']}>
            <span className={`${styles.action} ${styles.account} ${styles.lightblue}`}>
              <Avatar className={styles.avatar} src={currentUser.avatar || require('../assets/avatar.svg')} />
              {currentUser.name}
            </span>
          </Dropdown>
        </div>
      </Header>
    )
  }
}
