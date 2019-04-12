/* eslint-disable no-undef */

import React, { Component } from 'react'
import { Link } from 'dva/router'
import { Layout, Menu } from 'antd'
import Debounce from 'lodash-decorators/debounce'
import pathToRegexp from 'path-to-regexp'
import { autobind } from 'core-decorators'
import CDIcon from '../components/CDIcon'
import styles from './BasicSider.less'

const { Sider } = Layout;
const { SubMenu } = Menu;

const getIcon = (icon) => {
  if (typeof icon === 'string' && icon.indexOf('http') === 0) {
    return <img src={icon} alt="icon" className={styles.icon} />
  }
  if (typeof icon === 'string') {
    return <CDIcon type={icon} className={styles.icon} />
  }
  return icon
};

export default class BasicSider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openKeys: this.getDefaultCollapsedSubMenus(props),
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.setState({
        openKeys: this.getDefaultCollapsedSubMenus(nextProps),
      })
    }
  }
  componentWillUnmount() {
    this.triggerResizeEvent.cancel()
  }
  // 获取默认展开二级菜单
  @autobind
  getDefaultCollapsedSubMenus(props) {
    const { location: { pathname } } = props || this.props
    let snippets = pathname.split('/');
    snippets.pop();
    snippets.shift();
    snippets = snippets.map((item, index) => {
      if (index > 0) return snippets.slice(0, index + 1).join('/');
      return item;
    });
    snippets = snippets.map(item => this.getSelectedMenuKeys(`/${item}`)[0]);
    return snippets;
  }

  @autobind
  getSelectedMenuKeys(path) {
    const items = this.getSelectedMenuItems(path);
    return items.map(item => item.path)
  }

  // 获取已选择子菜单
  @autobind
  getSelectedMenuItems(path) {
    const flatMenuKeys = this.getFlatMenuKeys(this.props.menus);
    return flatMenuKeys.filter((item) => {
      return pathToRegexp(`/${item.path}`).test(path)
    })
  }

  // 菜单扁平化
  @autobind
  getFlatMenuKeys(menus) {
    let keys = [];
    menus.forEach((item) => {
      if (item.children) {
        keys.push(item);
        keys = keys.concat(this.getFlatMenuKeys(item.children))
      } else {
        keys.push(item)
      }
    })
    return keys
  }

  // 获取菜单
  @autobind
  getNavMenuItems(menusData) {
    if (!menusData) return [];
    return menusData
      .filter(item => item.name && !item.hideInMenu)
      .map((item) => {
        const ItemDom = this.getSubMenuOrItem(item);
        return this.checkPermissionItem(item.authority, ItemDom)
      })
      .filter(item => !!item)
  }

  @autobind
  getSubMenuOrItem(item) {
    if (item.children && item.children.some(child => child.name)) {
      return (
        <SubMenu
          title={
            item.icon ? (
              <span>
                {getIcon(item.icon)}
                <span>{item.name}</span>
              </span>
            ) : item.name
            }
          key={item.path}
          className={styles.item}
        >
          {this.getNavMenuItems(item.children)}
        </SubMenu>
      )
    } else {
      return (
        <Menu.Item key={item.path} className={styles.item}>
          {this.getMenuItemPath(item)}
        </Menu.Item>
      )
    }
  }

  @autobind
  getMenuItemPath(item) {
    const itemPath = this.conversionPath(item.path)
    const icon = getIcon(item.icon)
    const { target, name } = item
    if (/^https?:\/\//.test(itemPath)) {
      return (
        <a href={itemPath} target={target}>
          {icon}<span>{name}</span>
        </a>
      )
    }
    return (
      <Link
        to={itemPath}
        target={target}
        replace={itemPath === this.props.location.pathname}
        onClick={this.props.isMobile ? () => { this.props.onCollapse(true) } : undefined}
      >
        {icon}<span>{name}</span>
      </Link>
    )
  }

  @autobind
  checkPermissionItem(authority, ItemDom) {
    if (this.props.Authorized && this.props.Authorized.check) {
      const { check } = this.props.Authorized
      return check(authority, ItemDom)
    }
    return ItemDom
  }

  @autobind
  toggle() {
    this.props.onCollapse(!this.props.collapsed)
    this.triggerResizeEvent()
  }

  /* eslint-disable*/
  @Debounce(300)
  triggerResizeEvent() {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }
  // 转化路径
  conversionPath = (path) => {
    if (path && path.indexOf('http') === 0) {
      return path
    } else {
      return `/${path || ''}`.replace(/\/+/g, '/')
    }
  }

  @autobind
  handleOpenChange(openKeys) {
    const lastOpenKey = openKeys[openKeys.length - 1]
    const isMainMenu = this.props.menus.some(
      item => lastOpenKey && (item.key === lastOpenKey || item.path === lastOpenKey)
    )
    this.setState({
      openKeys: isMainMenu ? [lastOpenKey] : [...openKeys],
    })
  }
  render() {
    const { logo, menus, location, collapsed, onCollapse } = this.props
    const { pathname } = location
    const { openKeys } = this.state
    const menuProps = collapsed ? {} : { openKeys }
    const selectedKeys = this.getSelectedMenuKeys(pathname)
    return (
      <Sider
        width={256}
        collapsible
        trigger={null}
        breakpoint="lg"
        collapsed={collapsed}
        onCollapse={onCollapse}
        className={styles.sider}
        style={{ position: 'fixed' }}
      >
        <div className={styles.logo} key="logo">
          <Link to="/OrganManage">
            <img src={logo} alt="logo" width="32" />
            <h1>义乌医疗机构综合管理</h1>
          </Link>
        </div>
        <Menu
          key="Menu"
          theme="light"
          mode="inline"
          {...menuProps}
          inlineIndent={12}
          selectedKeys={selectedKeys}
          onOpenChange={this.handleOpenChange}
          style={{ background: '#f8f8f8', padding: '0 0 16px 0', width: '100%' }}
        >
          {this.getNavMenuItems(menus)}
        </Menu>
      </Sider>
    )
  }
}
