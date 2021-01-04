export const sampleProfile = () => {
  const profile = {
    'name': 'sample',
    'id': 1,
    'hotkeys': [
      {
        'key': 's',
        'shiftKey': false,
        'altKey': false,
        'ctrlKey': false,
        'description': 'Select drone'
      }
    ]
  }

  // add control group hotkeys to sample profile
  profile.hotkeys = [...profile.hotkeys, ...spawnControlGroupHotkeys()]

  return profile
}

/**
 * Helper function to generate hotkey objects
 */
function spawnHotkey(key, ctrl, alt, shift, desc) {
  return {
    'key': `${key}`,
    'ctrlKey': ctrl,
    'altKey': alt,
    'shiftKey': shift,
    'description': desc
  }
}

/**
 * Generate control group hotkeys for keys 1-10, shift + 1-10, etc.
 */
function spawnControlGroupHotkeys() {
  const controlGroupHotkeys = []
  for(let i=0; i<10; i++) {
    controlGroupHotkeys.push(
      spawnHotkey(`${i}`, false, false, false, `Select control group ${i}`),
      spawnHotkey(`${i}`, false, false, true, `Add selection to control group ${i}`),
      spawnHotkey(`${i}`, true, false, false, `Create control group ${i} from selection`),
    )
  }
  return controlGroupHotkeys
}

export default sampleProfile