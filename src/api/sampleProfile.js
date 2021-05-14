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
      },
      {
        'key': 'l',
        'shiftKey': false,
        'altKey': false,
        'ctrlKey': false,
        'description': 'This is a really long hotkey description to test this case in which there is a really really really long hotkey description so we can know what the display looks like when there is a hotkey description of ludicrous proportions. Maybe have some punctuation happening as well; so we know what truly vast quantities of text will appear as within the key display. Perhaps an additional sentence would serve to bring home the fact that there is a lot, and I mean A LOT of text in this description.'
      },
      {
        'key': 'F1',
        'shiftKey': false,
        'altKey': false,
        'ctrlKey': false,
        'description': 'Chrome: Open help tab'
      },
      {
        'key': 'F3',
        'shiftKey': false,
        'altKey': false,
        'ctrlKey': false,
        'description': 'Firefox: Find in page'
      },
      {
        'key': 'F5',
        'shiftKey': false,
        'altKey': false,
        'ctrlKey': false,
        'description': 'Refresh page'
      },
      {
        'key': 'F5',
        'shiftKey': false,
        'altKey': false,
        'ctrlKey': true,
        'description': 'Refresh page and clear browser cache'
      },
      {
        'key': 'F6',
        'shiftKey': false,
        'altKey': false,
        'ctrlKey': false,
        'description': 'Highlight address bar'
      },
      {
        'key': 'F7',
        'shiftKey': false,
        'altKey': false,
        'ctrlKey': false,
        'description': 'Enable caret browsing (keyboard navigation)'
      },
      {
        'key': 'F11',
        'shiftKey': false,
        'altKey': false,
        'ctrlKey': false,
        'description': 'Engage full-screen mode'
      },
      {
        'key': 'F12',
        'shiftKey': false,
        'altKey': false,
        'ctrlKey': false,
        'description': 'Engage inspector tool'
      },
      {
        'key': '-',
        'shiftKey': false,
        'altKey': false,
        'ctrlKey': false,
        'description': 'Operator: Subtraction'
      },
      {
        'key': '+',
        'shiftKey': false,
        'altKey': false,
        'ctrlKey': false,
        'description': 'Operator: Addition'
      },
      {
        'key': '*',
        'shiftKey': false,
        'altKey': false,
        'ctrlKey': false,
        'description': 'Operator: Multiplication'
      },
      {
        'key': '/',
        'shiftKey': false,
        'altKey': false,
        'ctrlKey': false,
        'description': 'Operator: Division'
      },
      {
        'key': 'Escape',
        'shiftKey': false,
        'altKey': false,
        'ctrlKey': false,
        'description': 'Run away!!!'
      },
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