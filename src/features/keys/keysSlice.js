import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  activeKey: {
    key: '',
    which: '',
    keyCode: '',
    shiftKey: false,
    altKey: false,
    ctrlKey: false,
    metaKey: false
  },
  modifiers: [],
  hotkeys: [
    {
      key: '1',
      modifiers: [],
      description: 'Select control group 1'
    },
    {
      key: '1',
      modifiers: ['Control'],
      description: 'Set control group 1'
    },
    {
      key: '1',
      modifiers: ['Shift'],
      description: 'Add selection to control group 1'
    },
    {
      key: 's',
      modifiers: [],
      description: 'Select larvae'
    },
    {
      key: 'D',
      modifiers: [],
      description: 'Spawn drone'
    }
  ]
}

const keysSlice = createSlice({
  name: 'keys',
  initialState,
  reducers: {
    activeKeyUpdated(state, action) {
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