'use client'

import React from 'react'

import { store } from '@/store/counters'

import styles from './Providers.module.scss'
import classNames from 'classnames/bind'
import { Provider } from 'react-redux'

const cx = classNames.bind(styles)

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={cx('root')}>
      <Provider store={store}>{children}</Provider>
    </div>
  )
}

export default Providers
