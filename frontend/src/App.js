import React, { Component } from 'react';
import './App.css';
import {BrowserRouter , Route , Link , Switch} from 'react-router-dom' ; 

// import Common from './components/Common.json'
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import User from './components/Blog/user';
import Write from './components/Blog/Write';
import PayCheck from './components/Blog/payCheck';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          {/*<Route  path = '/' component= {Register}/>  {/* ...type 1   */}
          <Route exact path = '/' component= {Register}/>  {/* ...type 2   */}
          {/* <Route  path = '/reg' component= {Register}/>    {/* ...type 3   */}

          <Route  path = '/login' component= {Login}/> 
          <Route  path = '/user' component= {User}/>
          <Route  path = '/write' component= {Write}/>
          <Route  path = '/:data' component= {PayCheck}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
