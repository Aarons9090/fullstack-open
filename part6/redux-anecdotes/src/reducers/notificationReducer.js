import { createSlice } from "@reduxjs/toolkit"

const initialState = null

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        addNotification(state, action) {

            return action.payload
        },
        clearNotification(state, action) {
            return null
        }
    }
})

export const { addNotification, clearNotification } = notificationSlice.actions

let timeoutID
export const setNotification = (message, seconds) => {
    return async dispatch => {
        clearTimeout(timeoutID)
        dispatch(addNotification(message))
        
        timeoutID = setTimeout(() => {
            dispatch(clearNotification())
        }, 1000 * seconds)
    }
}

export default notificationSlice.reducer