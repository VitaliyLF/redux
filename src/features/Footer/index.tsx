import Container from '@/shared/components/layout/Container'

import styles from './Footer.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const Footer = () => {
  return (
    <footer className={cx('footer')}>
      <Container className={cx('footer__container')}>
        <div className="">Footer</div>
      </Container>
    </footer>
  )
}

export default Footer
