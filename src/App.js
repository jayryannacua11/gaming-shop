import { useState } from 'react';
import './App.css';
import AppNavbar from './components/AppNavbar';
import Register from './pages/SignUp';
import Login from './pages/SignIn';
import Logout from './pages/Logout';
import Home from './pages/Home';


import { UserProvider } from './UserContext';

import { Container } from 'react-bootstrap'

//Router
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {

  const [user, setUser] =useState({
    accessToken: localStorage.getItem('accessToken'),
    isAdmin: localStorage.getItem('isAdmin') === 'true'

  })

  //Function for clearing localStorage on logout
  const unsetUser = () => {
    localStorage.clear();
  }

  return (
    <>
      <UserProvider value = { {user, setUser, unsetUser} }>
        <BrowserRouter>
          <AppNavbar />
            <Container>
              <Routes>
                <Route path="/login" element = { <Login /> } />
                <Route path="/register" element = { <Register /> } />
                <Route path="/logout" element = { <Logout /> } />
                <Route path="/" element = { <Home /> } />
              </Routes>
            </Container>
        </BrowserRouter>
      </UserProvider>
    
    </>
  );
}

export default App;
