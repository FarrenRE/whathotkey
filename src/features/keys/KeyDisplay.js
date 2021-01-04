import React from 'react'
import { useSelector } from 'react-redux'


import styles from './KeyDisplay.module.scss'

export const KeyDisplay = () => {
  const activeKey = useSelector(state => state.keys.activeKey)
  const profileHotkeys = useSelector(state => state.keys.profile.hotkeys)

  /**
   * Look up hotkey description based on active hotkey selector
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
    else {
      hotkeyDescription = 'Unbound'
    }

    console.log('Active hotkey description:', hotkeyDescription)
    return hotkeyDescription
  }

  return (
    <section className={styles.section}>
      <div className={styles.keyDisplay}>
        <div className={styles.description}>
          {renderHotkeyDescription()}
        </div>
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
          </span>          <span 
            className={styles.modifier} 
            data-active={activeKey.shiftKey}>
            Shift
          </span>
        </div>
      </div>
    </section>
  )
}