import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { Grommet } from 'grommet'
import { grommet } from 'grommet/themes'
import { RequestProvider } from '@react-cmpt/react-request-hook'

import Home from '../pages/Home'
import Search from '../pages/Search'
import About from '../pages/About'

import api from '../services/api'

export default function Routes() {
  return (
    <RequestProvider value={api}>
      <Grommet full theme={grommet}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/search">
              <Search />
            </Route>
            <Route path="/about">
              <About />
            </Route>
          </Switch>
        </Router>
      </Grommet>
    </RequestProvider>
  )
}
