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
import { AddKeybindForm } from './features/keys/AddKeybindForm'

function App() {
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
                {/* <AddKeybindForm /> */}
              </React.Fragment>
            )}
          />
          {/* <Route exact path="/posts/:postId" component={SinglePostPage} /> */}
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
