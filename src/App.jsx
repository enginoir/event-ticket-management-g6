import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css"

import Home from './pages/Home';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Navbar from './components/myNavbar';

import { connect } from 'react-redux';
import { userKeepLogin, checkStorage } from './redux/actions/user';

function App(props) {

    useEffect(() => {
    const userlocalStorage = localStorage.getItem("userDataEvent");
    
    if (userlocalStorage) {
      const userData = JSON.parse(userlocalStorage)
      props.userKeepLogin(userData)
    }else {
      props.checkStorage()
    }
  }, []);

  if (props.userGlobal.storageIsChecked ){
    return (
      <div className='App'>
        {/* <a href="/home"> Home </a> |
        <a href="/register"> Register </a> |
        <a href="/login"> Login </a> | */}
  
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route Component={Home} path='/' />
            <Route Component={Register} path='/register' />
            <Route Component={Login} path='/login' />
  
  
          </Routes>
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
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
