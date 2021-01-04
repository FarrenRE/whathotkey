import { createSlice } from '@reduxjs/toolkit'
import { nanoid } from '@reduxjs/toolkit'

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
    id: nanoid(),
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
    /**
     * Called on keypress, used to inform state of active key
     */
    activeKeyUpdated(state, action) {
      const { newActiveKey } = action.payload
      return {
        ...state,
        activeKey: newActiveKey
      }
    },
    /**
     * Called on form submit, used to manage hotkey profile assignments
     */
    keybindAdded: {
      reducer(state, action) {
        const {activeKey, description} = action.payload
        const existingKeybind = state.profile.hotkeys.find(
          kb => kb.key.toUpperCase() === activeKey.key.toUpperCase()
          && kb.shiftKey === activeKey.shiftKey
          && kb.altKey === activeKey.altKey
          && kb.ctrlKey === activeKey.ctrlKey
        )
        if(existingKeybind) {
          existingKeybind.description = description
        }
        else {
          state.profile.hotkeys.push({
            key: activeKey.key,
            shiftKey: activeKey.shiftKey,
            altKey: activeKey.altKey,
            ctrlKey: activeKey.ctrlKey,
            description
          })
        }
      },
      prepare(activeKey, description ) {
        return {
          payload: {
            activeKey,
            description
          }
        }
      }
    }
  },
  /**
   * WIP: Manage active profile
   */
  loadProfile(state, action) {
    const { newActiveProfile } = action.payload
    return {
      ...state,
      profile: newActiveProfile
    }
  }
})

export const { activeKeyUpdated, keybindAdded } = keysSlice.actions

export default keysSlice.reducer
