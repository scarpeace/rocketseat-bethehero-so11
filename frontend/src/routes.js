import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import NewIncident from './pages/NewIncident'

export default function Routers(){
  return(
    <BrowserRouter>
    {/* Garante que apenas uma rota seja executada por momento mesmo que o caminho delas for semelhante então ele nunca chama mais de uma rota */}
    <Switch>
      <Route path="/" exact component={Login}/>
      <Route path="/register" component={Register}/>
      <Route path="/profile" component={Profile}/>
      <Route path="/incidents/new" component={NewIncident}/>
    </Switch>
    </BrowserRouter>
  )
}