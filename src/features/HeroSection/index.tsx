import SearchIcon from '@/shared/components/icons/search-icon.svg'
import Container from '@/shared/components/layout/Container'

import styles from './HeroSection.module.scss'
import { IHeroSectionProps } from './type'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const HeroSection = ({ className }: IHeroSectionProps) => {
  return (
    <section className={cx('hero', className)}>
      <Container className={cx('hero__container')}>
        HeroSection
        <SearchIcon className={cx('hero__icon')} />
      </Container>
    </section>
  )
}

export default HeroSection
