import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { keybindAdded } from './keysSlice'

import styles from './KeyDisplay.module.scss'

export const KeyDisplay = () => {
  const activeKey = useSelector(state => state.keys.activeKey)
  const profileHotkeys = useSelector(state => state.keys.profile.hotkeys)

  const [content, setContent] = useState(renderHotkeyDescription())

  const onContentChanged = e => setContent(e.target.value)

  // Look up hotkey description based on active hotkey
  function renderHotkeyDescription() {
    let hotkeyDescription = ''
    for( let hotkey of profileHotkeys ) {
      console.log('comparison: activeKey.key = ', activeKey.key)
      console.log('comparison: hotkey.key = ', hotkey.key)
      console.log('comparison: hotkey.description = ', hotkey.description)
      if( // match active hotkey to stored hotkey config
        activeKey.key.toUpperCase() === hotkey.key.toUpperCase()
        && activeKey.ctrlKey === hotkey.ctrlKey
        && activeKey.altKey === hotkey.altKey
        && activeKey.shiftKey === hotkey.shiftKey
      ) {
        console.log('hotkey match: true')
        hotkeyDescription = hotkey.description
        break
      }
      else {
        console.log('hotkey match: false')
        hotkeyDescription = 'Unbound'
      }
    }
    console.log('returning hotkeyDescription:', hotkeyDescription)
    return hotkeyDescription
  }

  return (
    <section className={styles.section}>
      <div className={styles.keyDisplay}>
        {renderHotkeyDescription()}
      </div>
    </section>
  )
}