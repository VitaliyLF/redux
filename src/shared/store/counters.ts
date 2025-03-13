import { configureStore } from '@reduxjs/toolkit'

import { useDispatch, useSelector, useStore } from 'react-redux'

type CounterState = {
  counter: number
}

export type CounterId = string

type State = {
  // теперь у нас много счетчиков и по id каунтера у нас записан state в котором есть поле counter
  counters: Record<CounterId, CounterState | undefined>
}

export type IncrementAction = {
  // поле type это то какой тип action
  type: 'increment'
  // Теперь мы должны уточнить какой именно каунтер мы хотим обновить
  // поле payload это данные которые мы передаем в action
  payload: {
    counterId: CounterId
  }
}

export type DecrementAction = {
  type: 'decrement'
  payload: {
    counterId: CounterId
  }
}

type Action = IncrementAction | DecrementAction

// создаем дефолтное состояние для каунтера
const initialCounterState: CounterState = { counter: 0 }
// создаем дефолтное состояние
const initialState: State = {
  counters: {},
}

// когда мы делаем изменения каунтера какие объекты у нас меняются ?
// у нас меняется самый главный state, потом меняется поле counters и уже в нем меняется только каунтер который мы меняем
const reducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case 'increment': {
      // деструктуризируем payload
      const { counterId } = action.payload
      const currentCounter = state.counters[counterId] ?? initialCounterState

      return {
        // копируем пред поля
        ...state,
        // дальше перезаписываем поле counters
        counters: {
          // в нем мы записываем старые каунтеры которые мы не изменили
          // а меняем каунтер по id
          ...state.counters,
          [counterId]: {
            // разворачиваем текущий каунтер и перезаписываем counter
            ...currentCounter,
            counter: currentCounter.counter + 1,
          },
        },
      }
    }

    case 'decrement': {
      // деструктуризируем payload
      const { counterId } = action.payload
      const currentCounter = state.counters[counterId] ?? initialCounterState

      return {
        // копируем пред поля
        ...state,
        // дальше перезаписываем поле counters
        counters: {
          // в нем мы записываем старые каунтеры которые мы не изменили
          // а меняем каунтер по id
          ...state.counters,
          [counterId]: {
            // разворачиваем текущий каунтер и перезаписываем counter
            ...currentCounter,
            counter: currentCounter.counter - 1,
          },
        },
      }
    }

    default:
      return state
  }
}

export const store = configureStore({
  reducer: reducer,
})

// Выносим селектор в отдельную функцию тут в сторе а не в компоненте
export const selectorCounter = (state: AppState, counterId: CounterId) => state.counters[counterId]

// обычно так делаю в redux дя экспорта типа всего стейта
export type AppState = ReturnType<typeof store.getState>
// типизируем диспатч
export type AppDispatch = typeof store.dispatch

// типизирует хук чтобы он понимал какая типизация у нашего стейта
export const useAppSelector = useSelector.withTypes<AppState>()

// типизируем диспатч хук
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

// Типизиру хук useStore
export const useAppStore = useStore.withTypes<typeof store>()
