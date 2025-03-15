import { configureStore } from '@reduxjs/toolkit'

type State = {
  counter: number
}

export type IncrementAction = {
  type: 'increment'
}

export type DecrementAction = {
  type: 'decrement'
}

type Action = IncrementAction | DecrementAction

// создаем дефолтное состояние
const initialState: State = {
  counter: 0,
}

// создаем reducer
// это функция которая принимает пред состояние и action и должен вернуть новое состояние
// первый раз когда вызывается reducer состояния нет и поэтому мы должны вернуть дефолтное состояние
const reducer = (state = initialState, action: Action): State => {
  // реализовываем логику
  // reducer должен быть чистой функцией которая принимает пред состояние и экшен и возвращает новое состояние
  switch (action.type) {
    // если у нас тип action 'increment' то мы возвращаем новое состояние
    case 'increment':
      return {
        ...state,
        // Это называется иммутабельным обновлением состояния
        // разворачиваем пред состояние и перезаписываем counter
        counter: state.counter + 1,
      }

    // если у нас тип action 'decrement' то мы возвращаем новое состояние
    case 'decrement':
      return {
        ...state,
        // Это называется иммутабельным обновлением состояния
        // разворачиваем пред состояние и перезаписываем counter
        counter: state.counter - 1,
      }

    // если тип action не совпадает ни с одним из кейсов то мы возвращаем пред состояние
    default:
      return state
  }
}

// создание стора
export const store = configureStore({
  reducer: reducer,
})
