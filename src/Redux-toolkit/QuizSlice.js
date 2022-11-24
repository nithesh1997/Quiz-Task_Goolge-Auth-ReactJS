import { createSlice } from '@reduxjs/toolkit'

const QuizSlice = createSlice({
    name: 'quiz',
    initialState: {
        QuesAns: {},
        result: false
    },
    reducers: {
        andQues: (state, action) => {
            state.QuesAns = { ...state.QuesAns, ...action.payload }
        },
        showResult: (state) => {
            state.result = true
        }
    }
})

export default QuizSlice.reducer

export const { andQues, showResult } = QuizSlice.actions