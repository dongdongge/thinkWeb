import React from 'react'
import { Layout } from 'antd'
import LoginPage from '../pages/LoginPage.js'
import BaseFooter from './BaseFooter'
import styles from './UserLayout.less'

const { Content, Footer } = Layout;

class UserLayout extends React.PureComponent {
  render() {
    return (
      <Layout className={styles.bg}>
        <div className={styles.center}>
          <Content className={styles.content}>
            <div className={styles.title} >
              <div className={styles.titleGround} />
              <div className={styles.titleText}>原来你也在这里</div>
            </div>
            <div className={styles.mainWarp}>
              <div className={styles.main}>
                <div className={styles.picture} />
                <LoginPage className={styles.user} />
              </div>
            </div>
          </Content>
        </div>
        <Footer className={styles.footer}>
          <BaseFooter
            copyright={<span>技术支持：So You Are Here<br />联系电话：0571-88888888</span>}
          />
        </Footer>
      </Layout>
    )
  }
}

export default UserLayout
