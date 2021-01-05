import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styles from './KeyDisplay.module.scss'
import EditKeybindForm from './EditKeybindForm'

/**
 * Component to display active key description
 */
export const KeyDisplay = () => {
  const activeKey = useSelector(state => state.keys.activeKey)
  const profileHotkeys = useSelector(state => state.keys.profile.hotkeys)

  // manage form editability state
  const [editMode, setEditMode] = useState(false)

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

  return (
    <section className={styles.section}>
      <div className={styles.keyDisplay}>

        <span className={styles.controls}>
          {!editMode ?
            <button 
              className={styles.control}
              onClick={() => setEditMode(true)}>
                Edit
            </button>
            :
            <button 
              className={styles.control}
              onClick={() => setEditMode(false)}>
                Cancel
            </button>
          }
        </span>

        {!editMode ?
          <div className={styles.description}>
            {renderHotkeyDescription()}
          </div>
          :
          <EditKeybindForm
            activeKey={activeKey}
            description={renderHotkeyDescription()} /> // TODO: make active hotkey more accessible for child component     
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