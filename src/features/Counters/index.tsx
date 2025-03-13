'use client'

import { useEffect, useReducer, useRef } from 'react'

import {
  AppState,
  DecrementAction,
  IncrementAction,
  selectorCounter,
  useAppDispatch,
  useAppSelector,
} from '@/shared/store/counters'
import { CounterId, store } from '@/shared/store/counters'

// const selectorCounter = (state: AppState, counterId: CounterId) => state.counters[counterId]

const Counter = ({ counterId }: { counterId: CounterId }) => {
  // ### Вариант 1 как вообще все это работает

  // const [, forceUpdate] = useReducer((x) => x + 1, 0)
  // console.log('Counter render', counterId)

  // // Для того чтобы получить предыдущее состояние
  // const lastStateRef = useRef<ReturnType<typeof selectorCounter>>(null)

  // useEffect(() => {
  //   const unsubscribe = store.subscribe(() => {
  //     // текущее состояние
  //     const currentState = selectorCounter(store.getState(), counterId)
  //     // предыдущее состояние
  //     const lastState = lastStateRef.current

  //     // если мы возмем предыдущий результат селектора и текущий результат селектора и сравним их
  //     // и они окажуться равны то перерисовывать компонент не нужно
  //     // если они не равны то перерисовываем компонент
  //     if (currentState !== lastState) {
  //       forceUpdate()
  //     }

  //     lastStateRef.current = currentState
  //   })

  //   return unsubscribe
  //   // нам нужно вызывать ререндер этого компонента только при изменение состояния
  // }, [])

  // // первым агрументом прокидываем весь стор, а вторым id
  // const counterState = selectorCounter(store.getState(), counterId)

  // ### Вариант 2 использование хука useSelector, useDispatch

  const dispatch = useAppDispatch()
  // он должен возвращать только тот кусок который нужен компоненту
  const counterState = useAppSelector((state) => selectorCounter(state, counterId))

  return (
    <>
      <p>Counter number:{counterState?.counter}</p>

      <div>
        <button
          onClick={() =>
            dispatch({ type: 'increment', payload: { counterId } } satisfies IncrementAction)
          }>
          increment
        </button>
        <button
          onClick={() =>
            dispatch({ type: 'decrement', payload: { counterId } } satisfies DecrementAction)
          }>
          decrement
        </button>
      </div>
    </>
  )
}

export default Counter
