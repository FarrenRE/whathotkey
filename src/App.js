import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { Navbar } from './app/Navbar'
import { KeyDisplay } from './features/keys/KeyDisplay'
import { KeyInput } from './features/keys/KeyInput'

import { client, q } from './api/db'

function App() {

  console.log('FaunaDB attempt:')
  client.query(
    q.Collection('test', q.Database('64b65ab7-bb51-433c-b282-3bee5f80f745'))
  )
  .then((ret) => console.log(ret))
  .catch((err) => console.error('Error: %s', err))

  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <React.Fragment>
                <KeyDisplay />
                <KeyInput />
              </React.Fragment>
            )}
          />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
