import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getParticipants, callShareInformation, callReencrypt } from '../api/api'
import { AppThunk } from "../store";

export type Participant = {
    did: string
    status: number
}

type State = {
    participants: Participant[]
    isLoading: boolean
    error: string | null
}

const initialState: State = { participants: [], isLoading: false, error: null }

const participantSlice = createSlice({
    name: 'participants',
    initialState,
    reducers: {
        getParticipantsStart(state) {
            state.isLoading = true;
        },
        getParticipantsSuccess(state, { payload }: PayloadAction<Participant[]>) {
            state.isLoading = false;
            state.participants = payload;

        },
        getParticipantsFailure(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
        actionStart(state) {
            state.isLoading = true;
        },
        actionSuccess(state) {
            state.isLoading = false;
        },
        actionFailure(state, { payload }: PayloadAction<string>) {
            state.isLoading = false;
            state.error = payload;
        }
    }
});

export const { getParticipantsStart, getParticipantsFailure, getParticipantsSuccess, actionStart, actionSuccess, actionFailure } = participantSlice.actions;
export default participantSlice.reducer;

export const fetchParticipants = (cohortID: string): AppThunk => async dispatch => {
    try {
        dispatch(getParticipantsStart())
        const cohorts = await getParticipants(cohortID);
        dispatch(getParticipantsSuccess(cohorts))
    } catch (err) {
        dispatch(getParticipantsFailure(err.toString))
    }
}

export const share = (cohortID: string, did: string): AppThunk => async dispatch => {
    try {
        dispatch(actionStart())
        await callShareInformation(cohortID, did);
        dispatch(fetchParticipants(cohortID))
        dispatch(actionSuccess())
    } catch (err) {
        dispatch(actionFailure(err.toString()))
    }
}

export const reencrypt = (cohortID: string, did: string): AppThunk => async dispatch => {
    try {
        dispatch(actionStart())
        await callReencrypt(cohortID, did);
        dispatch(fetchParticipants(cohortID))
        dispatch(actionSuccess())
    } catch (err) {
        dispatch(actionFailure(err.toString()))
    }
}