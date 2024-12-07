import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
    pastes: localStorage.getItem("pastes")
        ? JSON.parse(localStorage.getItem("pastes"))
        : [],
}

export const pasteSlice = createSlice({
    name: 'paste',
    initialState,
    reducers: {
        addToPaste: (state, action) => {
            const paste = action.payload;
            state.pastes.push(paste)
            localStorage.setItem("pastes", JSON.stringify(state.pastes))
            toast.success('Note is Successfully Created', {
                position: 'top-right'  // This places the toast at the top-right corner
            })
        },
        removeFromPaste: (state, action) => {
            const pasteId = action.payload
            const index = state.pastes.findIndex((item) => item._id === pasteId)
            if (index >= 0) {
                state.pastes.splice(index, 1)
                localStorage.setItem("pastes", JSON.stringify(state.pastes))
                toast.success('Note Deleted', {
                    position: 'top-right'  // This places the toast at the top-right corner
                })
            }
        },

        updateToPaste: (state, action) => {
            const paste = action.payload
            const index = state.pastes.findIndex((item) => item._id === paste._id)
            if (index >= 0) {
                state.pastes[index] = paste
                localStorage.setItem("pastes", JSON.stringify(state.pastes))
                toast.success('Note Updated', {
                    position: 'top-right'  // This places the toast at the top-right corner
                })
            }

        },
        resetAllPaste: (state, action) => {
            state.pastes = []
            localStorage.removeItem("pastes")
        },
    },
})

// Action creators are generated for each case reducer function
export const { addToPaste, removeFromPaste, updateToPaste, resetAllPaste } = pasteSlice.actions

export default pasteSlice.reducer