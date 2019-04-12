import React from 'react'
import styles from './BaseFooter.less'

export default ({ copyright }) => {
  return (
    <div className={styles.globalFooter}>
      {copyright && <div>{copyright}</div>}
    </div>
  )
}
