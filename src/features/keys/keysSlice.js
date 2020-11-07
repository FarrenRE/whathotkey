import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  activeKey: '',
  modifiers: []
}

const keysSlice = createSlice({
  name: 'keys',
  initialState,
  reducers: {
    activeKeyUpdated(state, action) {
      console.log('activeKeyUpdated()')
      const { nextKeyId } = action.payload

      return {
        ...state,
        activeKey: nextKeyId
      }
    }
  }
})

export const { activeKeyUpdated } = keysSlice.actions

export default keysSlice.reducer