import React from 'react'
import { useSelector } from 'react-redux'

export const KeyDisplay = () => {

  const activeKey = useSelector(state => state.keys.activeKey)
  const activeModifiers = useSelector(state => state.keys.modifiers)
  const activeKeyConfig = useSelector(
    state => state.keys.hotkeys.find( 
      cfg => cfg.key === activeKey && JSON.stringify(cfg.modifiers) === JSON.stringify(activeModifiers) 
    )
  )
  // const availableModifiers = activeKeyConfig.modifiers
  console.log('activeKeyConfig:');
  console.log(activeKeyConfig);

  return (
    <section>
      <p>Active key: { activeKey }</p>
      <p>Description: {( activeKeyConfig ? activeKeyConfig.description : `The character: ${ activeKey }` )}</p>
      {/* <p>Modifiers: {availableModifiers.map( mod => mod ).join(', ')}</p> */}
    </section>
  )
}