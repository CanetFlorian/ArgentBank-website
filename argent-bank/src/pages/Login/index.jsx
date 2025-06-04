import React, { useState } from 'react';
import { useLoginUserMutation } from '../../store/apiSlice';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../store/userSlice';
import { useDispatch } from 'react-redux';



export default function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [ loginUser, { isLoading, isError, error }] = useLoginUserMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const result = await loginUser({ email: username, password }).unwrap();

      dispatch(setUser({
        token: result.body.token,
        firstName: result.body.firstName,
        lastName: result.body.lastName,
      }))
      
      navigate('/profile');

    } catch (err) {
      console.error("Erreur d'authentification :", err);
    }
  };

  return (
    <>
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle "></i>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" name="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button type="submit" className="sign-in-button" disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Sign In'}
            </button>
            {isError && (
              <p style={{ color : 'red'}}>
                {error?.data?.message || 'Erreur de connexion, veuillez ressayer'}
              </p>
            )}
          </form>
        </section>
      </main>
 

    </>
  );
}
