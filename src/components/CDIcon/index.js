/* eslint-disable react/require-default-props,max-len */
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Tooltip } from 'antd'
import Authorized from '../../common/Authorized'
import './iconfont'
import './index.less'

const CDIcon = ({ type, className, onClick = () => {}, title = false, hand = false, permission, classNameS }) => {
  const svg = (
    <Authorized authority={permission}>
      <svg
        className={classNameS || classnames('colorful-icon', className)}
        onClick={onClick}
        aria-hidden="true"
        style={{ marginRight: 8, cursor: hand ? 'pointer' : 'auto' }}
      >
        <use xlinkHref={`#${type.startsWith('#') ? type.replace(/#/, '') : type}`} />
      </svg>
    </Authorized>
  )

  if (!title) { return svg }

  return (<Tooltip title={title} placement="top"> {svg} </Tooltip>)
}

CDIcon.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  title: PropTypes.string,
  permission: PropTypes.string,
  hand: PropTypes.bool,
}

export default CDIcon
