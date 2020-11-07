import React from 'react'
import { useSelector } from 'react-redux'

export const KeyDisplay = () => {
  const activeKey = useSelector(state => state.keys.activeKey)
  console.log('activeKey:')
  console.log(activeKey)
  const activeModifiers = useSelector(state => state.keys.modifiers)
  const activeKeyConfig = useSelector(
    state => state.keys.hotkeys.find( 
      cfg => cfg.key === activeKey.key && JSON.stringify(cfg.modifiers) === JSON.stringify(activeModifiers) 
    )
  )
  // const availableModifiers = activeKeyConfig.modifiers
  console.log('activeKeyConfig:');
  console.log(activeKeyConfig);

  const activeKeyString = () => {
    if( activeKey.key.length === 1 ) {
      return activeKey.key.toUpperCase()
    }
    else {
      return activeKey.key
    }
  }

  return (
    <section>
      <p>Active key: { activeKeyString() }</p>
      <p>Description: {( activeKeyConfig ? activeKeyConfig.description : `The character: ${ activeKeyString() }` )}</p>
      {/* <p>Modifiers: {availableModifiers.map( mod => mod ).join(', ')}</p> */}
    </section>
  )
}