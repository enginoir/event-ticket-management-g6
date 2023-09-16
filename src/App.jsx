import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css"
import { connect } from 'react-redux';
import { userKeepLogin, checkStorage } from './redux/actions/user';
import { getCartData } from './redux/actions/cart'

import Home from './pages/Home';
import Search from './pages/Search'
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Navbar from './components/myNavbar';
import Admin from './pages/Admin';
import Cart from './pages/Cart';
import ProductCard from './components/ProductCard';
import ProductDetail from './pages/ProductDetail';
import History from "./pages/History"
import Profile from "./pages/Profile"
import Organizer from "./pages/Organizer"
import Footer from './components/Footer';

function App(props) {
    useEffect(() => {
    const userlocalStorage = localStorage.getItem("userDataEvent");
    if (userlocalStorage) {
      const userData = JSON.parse(userlocalStorage);
      props.userKeepLogin(userData);
      props.getCartData(userData.id);
    } else {
      props.checkStorage()
    }
  }, []);

  if (props.userGlobal.storageIsChecked ){
    return (
      <div className='App'>

        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route Component={Home} path='/' />
            <Route Component={Search} path='/search' />
            <Route path='/admin' element={<Admin />} />
            <Route Component={ProductCard} path='/product-card' />
            <Route Component={Register} path='/register' />
            <Route Component={Login} path='/login' />
            <Route Component={ProductDetail} path='/product-detail/:productId'/>
            <Route Component={Cart} path='/cart'/>
            <Route Component={History} path='/history'/>
            <Route Component={Profile} path='/user-profile'/>
            <Route Component={Organizer} path='/organizer-dashboard'/>

          </Routes>
          <Footer/>
        </BrowserRouter>
      </div>

    );
  }
  return (
    <div>
      Loading . . .
    </div>
  )



}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user,
  }
}


const mapDispatchToProps = {
  userKeepLogin,
  checkStorage,
  getCartData
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
