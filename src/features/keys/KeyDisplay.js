import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setInputLocked } from './keysSlice'
import { keybindAdded } from './keysSlice'
// import EditKeybindForm from './EditKeybindForm'
import styles from './KeyDisplay.module.scss'

/**
 * Component to display active key description
 */
export const KeyDisplay = () => {

  const dispatch = useDispatch()
  const activeKey = useSelector(state => state.keys.activeKey)
  const profileHotkeys = useSelector(state => state.keys.profile.hotkeys)

  // manage form editability state
  const [editMode, setEditMode] = useState(false)
  // state to manage initial/edited description value
  const [content, setContent] = useState( renderHotkeyDescription() )

  /**
   * Look up hotkey description based on active hotkey selector
   * @returns String hotkey description
   */
  function renderHotkeyDescription() {
    let hotkeyDescription = ''
    let activeHotkey = profileHotkeys.find( hotkey => (
      activeKey.key.toUpperCase() === hotkey.key.toUpperCase()
      && activeKey.ctrlKey === hotkey.ctrlKey
      && activeKey.altKey === hotkey.altKey
      && activeKey.shiftKey === hotkey.shiftKey
    ) )
    if( activeHotkey ) {
      hotkeyDescription = activeHotkey.description
    }
    else { // if no description, set to this value:
      hotkeyDescription = 'Unbound'
    }

    return hotkeyDescription
  }

  const onEditClick = () => {
    setEditMode(true)
    setContent(renderHotkeyDescription()) // on edit, set default content to current description
    dispatch(
      setInputLocked({ inputLocked: true })
    )
  }

  const onCancelClick = () => {
    setEditMode(false)
    dispatch(
      setInputLocked({ inputLocked: false })
    )
  }

  const onDescriptionChange = (e) => {
    setContent( e.target.value )
  }

  const onSaveClick = () => {
    if (content) {
      dispatch(
        keybindAdded(activeKey, content)
      )
    }
    setEditMode(false)
    dispatch(
      setInputLocked({ inputLocked: false })
    )
  }

  return (
    <section className={styles.section}>
      <div className={styles.keyDisplay}>

        <div className={styles.controls}>
          {!editMode ?
            <button 
              className={styles.control}
              onClick={onEditClick}>
                Edit
            </button>
            :
            <>
              <button 
                className={styles.control}
                onClick={onSaveClick}>
                  Save
              </button>
              <button 
                className={styles.control}
                onClick={onCancelClick}>
                  Cancel
              </button>
            </>
          }
        </div>

        {!editMode ?
          <div className={styles.description}>
            {renderHotkeyDescription()}
          </div>
          :
          <form>
            <textarea
              id="description"
              name="description"
              value={content}
              onChange={onDescriptionChange}
            />
          </form>
        }


        <div className={styles.modifiers}>
          <span 
            className={styles.modifier} 
            data-active={activeKey.ctrlKey}>
            Ctrl
          </span>
          <span 
            className={styles.modifier} 
            data-active={activeKey.altKey}>
            Alt
          </span>          
          <span 
            className={styles.modifier} 
            data-active={activeKey.shiftKey}>
            Shift
          </span>
        </div>

      </div>
    </section>
  )
}