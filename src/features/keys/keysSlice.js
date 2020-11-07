import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  activeKey: '',
  modifiers: [],
  hotkeys: [
    {
      key: 'a',
      modifiers: [],
      description: 'The letter "A".'
    },
    {
      key: 'c',
      modifiers: ['Control'],
      description: 'Copy'
    }
  ]
}

const keysSlice = createSlice({
  name: 'keys',
  initialState,
  reducers: {
    activeKeyUpdated(state, action) {
      console.log('activeKeyUpdated()')
      const { newActiveKey, newActiveKeyModifiers } = action.payload

      return {
        ...state,
        activeKey: newActiveKey,
        modifiers: newActiveKeyModifiers
      }
    }
  }
})

export const { activeKeyUpdated } = keysSlice.actions

export default keysSlice.reducer