import { AppState } from '@/store/counters'
import { createAction, createReducer } from '@reduxjs/toolkit'

type CounterState = {
  counter: number
}

export type CounterId = string

type CountersState = Record<CounterId, CounterState | undefined>

export const incrementAction = createAction<{
  counterId: CounterId
}>('countres/increment') // вот так указываем scope

export const decrementAction = createAction<{
  counterId: CounterId
}>('countres/decrement') // вот так указываем scope

const initialCounterState: CounterState = { counter: 0 }
const initialCountresState: CountersState = {}

export const countersReducer = createReducer(initialCountresState, (builder) => {
  builder.addCase(incrementAction, (state, action) => {
    const { counterId } = action.payload

    // по началу у нас нет counterId и поэтому ставим его как начальное
    if (!state[counterId]) {
      state[counterId] = { ...initialCounterState }
    }

    // достаем значение из нового стейта и изменяем его
    state[counterId].counter++
  })

  builder.addCase(decrementAction, (state, action) => {
    const { counterId } = action.payload

    // по началу у нас нет counterId и поэтому ставим его как начальное
    if (!state[counterId]) {
      state[counterId] = { ...initialCounterState }
    }

    // достаем значение из нового стейта и изменяем его
    state[counterId].counter--
  })
})

export const selectCounter = (state: AppState, counterId: CounterId) => state.counters[counterId]
