import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { Navbar } from './app/Navbar'
import { KeyDisplay } from './features/keys/KeyDisplay'
import { KeysList } from './features/keys/KeysList'
import { KeyInput } from './features/keys/KeyInput'

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
                {/* <KeysList /> */}
                <KeyInput />
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
