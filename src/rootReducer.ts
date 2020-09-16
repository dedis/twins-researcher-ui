import { combineReducers } from '@reduxjs/toolkit'
import cohortReducer from './cohorts/cohortSlice'
import participantReducer from './participants/participantSlice'

const rootReducer = combineReducers({
    cohorts: cohortReducer,
    participants: participantReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer