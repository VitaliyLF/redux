import styles from './Navbar.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const Navbar = () => {
  return (
    <nav className={cx('navbar')}>
      <div className="">Navbar</div>
    </nav>
  )
}

export default Navbar
