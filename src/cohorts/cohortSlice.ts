import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import { getCohorts, callUpdateCohort } from '../api/api';

export type Cohort = {
    cohortID: string
    synopsis: string
    description: string
    moreInfoLink: string
    acceptText: string
    denyText: string
    size: number
}

export interface CohortUpdate {
    cohortID: string
    description: string
    moreInfoLink: string
    acceptText: string
    denyText: string
}

type State = {
    cohorts: Cohort[]
    cohortsById: Record<string, Cohort>
    isLoading: boolean
    error: string | null
}

const initialState: State = { cohorts: [], isLoading: false, error: null, cohortsById: {} }

const cohortsSlice = createSlice({
    name: 'cohorts',
    initialState,
    reducers: {
        getCohortsStart(state) {
            state.isLoading = true;
        },
        getCohortsSuccess(state, { payload }: PayloadAction<Cohort[]>) {
            state.isLoading = false;
            state.cohorts = payload;

            for (let i = 0; i < payload.length; i++) {
                const cohort = payload[i];
                state.cohortsById[cohort.cohortID] = cohort;
            }
        },
        getCohortsFailure(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
        updateCohortStart(state) {
            state.isLoading = true
        },
        updateCohortSuccess(state) {
            state.isLoading = false
        }
    }
});

export const { getCohortsStart, getCohortsSuccess, getCohortsFailure, updateCohortStart, updateCohortSuccess } = cohortsSlice.actions;
export default cohortsSlice.reducer;

export const fetchCohorts = (): AppThunk => async dispatch => {
    try {
        dispatch(getCohortsStart())
        const cohorts = await getCohorts();
        dispatch(getCohortsSuccess(cohorts))
    } catch (err) {
        dispatch(getCohortsFailure(err.toString))
    }
}

export const updateCohort = (data: CohortUpdate): AppThunk => async dispatch => {
    dispatch(updateCohortStart())
    await callUpdateCohort(data)
    dispatch(updateCohortSuccess())
}