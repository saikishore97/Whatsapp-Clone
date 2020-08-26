import React,{useState} from 'react';
import './App.css';
import SideBar from './components/SideBar/SideBar.component';
import Chat from './components/Chat/Chat.component';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';

import LoginPage from './pages/Login.page';
import {useStateValue} from './StateProvider';



function App() {
  const[{user},dispatch]=useStateValue();

  return (
    <div className="App">
      {!user?(<LoginPage />):(
          <div className="app__body">
          <Router>      
              <SideBar/>
              <Switch>
                <Route path="/rooms/:roomId">
                  <Chat/>
                </Route>
            </Switch>
          </Router>
          
        </div>
      )}
    </div>
  );
}

export default App;
