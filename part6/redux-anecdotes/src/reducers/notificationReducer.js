import { createSlice } from "@reduxjs/toolkit"

const initialState = "hei"
const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers:{
        addNotification(state, action) {
            return action.payload
        },
        clearNotification(state, action) {
            return null
        }
    }

})
export const { addNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer