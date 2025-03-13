import styles from './PageWrapper.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className={cx('root')}>{children}</div>
}

export default PageWrapper
