import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit';

export interface WordBaseStore {
    wordBases: WordBase[];
}

export const wordBasesSlice = createSlice<WordBaseStore, SliceCaseReducers<WordBaseStore>, 'wordBase'>({
    name: 'wordBase',
    initialState: {
        wordBases: []
    },
    reducers: {
        setWordBases(state, action) {
            state.wordBases = action.payload.wordBases;
        }
    }
});

export const { setWordBases } = wordBasesSlice.actions;

export default wordBasesSlice.reducer;
