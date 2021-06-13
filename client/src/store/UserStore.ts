import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit';

export interface UserStore {
    user: Partial<{
        userID: number;
        nickName: string;
        account: string;
    }>
}

export const userSlice = createSlice<UserStore, SliceCaseReducers<UserStore>, 'user'>({
    name: 'user',
    initialState: {
        user: {}
    },
    reducers: {
        setUser(state, action) {
            state.user = action.payload.user;
        }
    }
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
