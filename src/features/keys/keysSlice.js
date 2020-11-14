import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  activeKey: {
    key: '',
    which: '',
    keyCode: '',
    shiftKey: false,
    altKey: false,
    ctrlKey: false,
    metaKey: false,
    readableString: ''
  },
  modifiers: [],
  profile: {
    name: 'test',
    id: 'test',
    hotkeys: [
      {
        key: 's',
        shiftKey: false,
        altKey: false,
        ctrlKey: false,
        description: 'Select drone'
      },
      {
        key: '1',
        shiftKey: true,
        altKey: false,
        ctrlKey: false,
        description: 'Add to control group 1'
      }
    ]
  }
}

const keysSlice = createSlice({
  name: 'keys',
  initialState,
  reducers: {
    activeKeyUpdated(state, action) {
      const { newActiveKey } = action.payload
      // newActiveKey.readableString = prepActiveKeyString(newActiveKey)

      return {
        ...state,
        activeKey: newActiveKey
      }
    },
    keybindAdded: {
      reducer(state, action) {
        // state.hotkeys.push(action.payload)
        const {key, title, content} = action.payload
        // const existingKeybind = state.hotkeys.find( kb => kb.key === key && kb.modifiers ===  ) // TODO
      },
      prepare(key, title, content ) {
        return {
          payload: {
            key,
            title,
            content
          }
        }
      }
    }
  }
})

export const { activeKeyUpdated } = keysSlice.actions

export default keysSlice.reducer