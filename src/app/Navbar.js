import React from 'react'
import { Link } from 'react-router-dom'

import firebaseApp from '../firebaseConfig'

export const Navbar = () => {
  return (
    <nav>
      <section>
        <h1>whotkey?</h1>
        <div className="navContent">
          <div className="navLinks">
            <Link to="/">Home</Link>
            <button
              data-testid="signin-anon"
              onClick={() => {
                firebaseApp.auth().signInAnonymously();
              }}
            >
              Sign In Anonymously
            </button>
            <button
              onClick={() => {
                firebaseApp.auth().signOut();
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </section>
    </nav>
  )
}
