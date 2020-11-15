import React from 'react'
import { useSelector } from 'react-redux'

import styles from './KeyDisplay.module.scss'

export const KeyDisplay = () => {
  const debug = false;
  const activeKey = useSelector(state => state.keys.activeKey)
  const profileHotkeys = useSelector(state => state.keys.profile.hotkeys)

  const renderHotkeyDescription = () => {
    let hotkeyDescription = ''
    for( let hotkey of profileHotkeys ) {
      if( 
        activeKey.key.toUpperCase() === hotkey.key.toUpperCase()
        && activeKey.ctrlKey === hotkey.ctrlKey
        && activeKey.altKey === hotkey.altKey
        && activeKey.shiftKey === hotkey.shiftKey
      ) {
        hotkeyDescription = hotkey.description
        break
      }
      else {
        hotkeyDescription = 'no data available.'
      }
    }
    return hotkeyDescription
  }

  return (
    <section className={styles.section}>
      <p className={styles.description}>{`Pressed: ${ activeKey.readableString }`}</p>
      <p className={styles.description}>{renderHotkeyDescription()}</p>
    </section>
  )
}