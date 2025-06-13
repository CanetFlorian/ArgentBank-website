import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/userSlice';
import { Link } from 'react-router-dom';


export default function Navbar() {
  
  const { userName, isAuthenticated } = useSelector((state) => state.user);
 
  const dispatch = useDispatch();

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src="/img/argentBankLogo.webp"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {isAuthenticated ? (
          <>
          <Link className='main-nav-item' to="/profile">
          <i className='fa fa-user-circle'></i> {userName}
          </Link>
          <button 
          className='main-nav-item'
          onClick={() => dispatch(logout())}
          style={{cursor:'pointer'}}
          >
            <i className='fa fa-sign-out'></i> Sign Out
          </button>
          </>
        ) : (

        <Link className="main-nav-item" to="/login">
          <i className="fa fa-user-circle"></i>
          Sign In
        </Link>
        
        )}

      </div>
    </nav>
  );
}
