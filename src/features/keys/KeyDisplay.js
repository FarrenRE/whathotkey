import React from 'react'
import { useSelector } from 'react-redux'

import styles from './KeyDisplay.module.scss'

export const KeyDisplay = () => {
  const activeKey = useSelector(state => state.keys.activeKey)
  const activeModifiers = useSelector(state => state.keys.modifiers)
  const activeKeyConfig = useSelector(
    state => state.keys.hotkeys.find( 
      cfg => cfg.key.toUpperCase() === activeKey.key.toUpperCase() && JSON.stringify(cfg.modifiers) === JSON.stringify(activeModifiers) 
    )
  )

  const allHotkeys = useSelector(state => state.keys.hotkeys)
  const availableModifiers = []
  for(let hotkey of allHotkeys) {
    if( hotkey.key === activeKey.key && JSON.stringify(hotkey.modifiers) !== JSON.stringify(activeKeyConfig.modifiers) ) {
      availableModifiers.push( hotkey.modifiers.map( m => m ) )
    }
  }

  const activeKeyString = () => {
    if( activeKey.key.length === 1 ) {
      return activeKey.key.toUpperCase()
    }
    else {
      return activeKey.key
    }
  }

  return (
    <section className={styles.section}>
      <p className={styles.description}>{( activeKeyConfig ? activeKeyConfig.description : `The character: ${ activeKeyString() }` )}</p>
      <p className={styles.modifiers}>
        {( availableModifiers.length > 0 && true 
        ? `Modifiers available: ${ availableModifiers.map( m => m ).join(', ') }`
        : '' )}
      </p>
    </section>
  )
}