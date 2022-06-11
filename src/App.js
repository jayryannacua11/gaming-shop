import { useState } from 'react';
import './App.css';
import AppNavbar from './components/AppNavbar';
import Register from './pages/SignUp';
import Login from './pages/SignIn';
import Logout from './pages/Logout';
import Home from './pages/Home';
import Product from './pages/Product'
import Mice from './pages/Mice'
import Keyboard from './pages/Keyboard'
import Headset from './pages/Headset'
import SpecificProduct from './pages/SpecificProduct';
import Cart from './pages/Cart'
import History from './pages/History'
import AllOrder from './pages/AllOrder'
import Footer from './components/Footer'
import ErrorPage from './pages/Error'

import { UserProvider } from './UserContext';

import { Container } from 'react-bootstrap'

//Router
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {

  const [user, setUser] = useState({
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
          <div style={{minHeight: '100vh'}}>
          <AppNavbar />
            <div>
              <Routes>
                <Route path="/" element = { <Home /> } />
                <Route path="/login" element = { <Login /> } />
                <Route path="/register" element = { <Register /> } />
                <Route path="/logout" element = { <Logout /> } />
                <Route path="/products" element = { <Product /> } />
                <Route path="/products/mice" element = { <Mice /> } />
                <Route path="/products/keyboard" element = { <Keyboard /> } />
                <Route path="/products/headset" element = { <Headset /> } />
                <Route path="/cart" element = { <Cart /> } />
                <Route path="/products/:productId" element = { <SpecificProduct /> } />               
                <Route path="/myOrders" element = { <History /> } />
                <Route path="/allOrders" element = { <AllOrder /> } />
                <Route path="*" element = { <ErrorPage /> } />
              </Routes>
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </UserProvider>
    
    </>
  );
}

export default App;
