import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './index.less'

const Loader = ({ spinning }) => {
  return (
    <div className={classNames(styles.loader, {
    [styles.hidden]: !spinning,
    [styles.fullScreen]: true,
  })}
    >
      <div className={styles.warpper}>
        <div className={styles.inner} />
        <div className={styles.text} >请等待</div>
      </div>
    </div>
  )
}

Loader.defaultProps = {
  spinning: false,
}

Loader.propTypes = {
  spinning: PropTypes.bool,
}

export default Loader
