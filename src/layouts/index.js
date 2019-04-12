import * as React from 'react';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import BasicLayout from './BasicLayout';
import UserLayout from './UserLayout';
import Exception from '../components/Exception';
const loginLayout = '/Login';
export default class MainLayout extends React.PureComponent{
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.location !== prevProps.location){
      window.scrollTo(0,0)
    }
  }
  render() {
    const {pathname} = this.props.location;
    const matchRoute = this.props.route.routes.filter(item => item.path === pathname)
    const flag = matchRoute && matchRoute.length > 0 // 匹配到路由
    return (
      <LocaleProvider locale={zh_CN}>
        {pathname === loginLayout ? <UserLayout /> :
          <BasicLayout {...this.props}>
            {flag ? this.props.children : <Exception type="404" style={{ minHeight: 500, height: '80%' }} />}
          </BasicLayout>
        }
      </LocaleProvider>
    );
  }

}
