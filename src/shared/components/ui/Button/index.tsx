import styles from './Button.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const Button = () => {
  return <button className={cx('button')}>Button</button>
}

export default Button
