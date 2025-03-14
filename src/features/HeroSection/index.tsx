'use client'

import { useEffect, useReducer } from 'react'

import Container from '@/shared/components/layout/Container'
import { DecrementAction, IncrementAction, store } from '@/shared/store/counter'

import Counter from '../Counters'
import UsersList from '../UsersList'
import styles from './HeroSection.module.scss'
import { IHeroSectionProps } from './type'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const HeroSection = ({ className }: IHeroSectionProps) => {
  // мы меняем состояние но оно не отражается в интерфейсе
  // для этого нам нужно подписаться на изменения состояния
  // лайфхак для форс апдейта компонента
  const [, forceUpdate] = useReducer((x) => x + 1, 0)

  useEffect(() => {
    // подписываемся на изменения состояния
    const unsubscribe = store.subscribe(() => {
      // вызываем forceUpdate чтобы заставить компонент перерисоваться
      // в методе subscribe мы даем функцию которая будет вызываться каждый раз когда у нас летит action в store
      forceUpdate()
    })

    return unsubscribe
  }, [])

  return (
    <section className={cx('hero', className)}>
      <Container className={cx('hero__container')}>
        {/* для получения состояния используем store.getState().counter */}
        <p className={cx('hero__counter')}>Counter number:{store.getState().counter}</p>

        <div className={cx('hero__btns')}>
          {/* на клике по кнопке мы должны вызвать action */}
          <button
            className={cx('hero__btn')}
            onClick={() => store.dispatch({ type: 'increment' } satisfies IncrementAction)}>
            increment
          </button>
          <button
            className={cx('hero__btn')}
            onClick={() => store.dispatch({ type: 'decrement' } satisfies DecrementAction)}>
            decrement
          </button>
        </div>

        <Counter counterId="first" />
        <Counter counterId="second" />

        <UsersList />
      </Container>
    </section>
  )
}

export default HeroSection
