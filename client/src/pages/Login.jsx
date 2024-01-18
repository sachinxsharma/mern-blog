import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [userData, setUserData] = useState({
    email:'',
    password:'',
  })

  const changeInputHandler = (e) => {
    setUserData(preState => {
      return{...preState, [e.target.name]:e.target.value}
    })
  }

  return (
    <section className="login">
      <div className="container">
        <h2>Sign In</h2>
        <form className="form login__form">
          <p className="form__error-message">This is an error Message</p>
          <input type="text" placeholder="Email "  name='email' value={userData.email} 
          onChange={changeInputHandler} autoFocus/>
          <input type="text" placeholder="Password"  name='password' value={userData.password} 
          onChange={changeInputHandler} />
          <button type='Submit' className="btn primary">Login</button>
        </form>
        <small>Don't have an account?<Link to="/register">sign un </Link></small>
      </div>
    </section>
  )
}

export default Login