import Container from '@/shared/components/layout/Container'

import styles from './Header.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const Header = () => {
  return (
    <header className={cx('header')}>
      <Container className={cx('header__container')}>
        <div className="">Header</div>
      </Container>
    </header>
  )
}

export default Header
