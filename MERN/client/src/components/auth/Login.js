import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { login, register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Login = ({ isAuth, login }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;
  const handleChangeValue = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  if (isAuth) return <Redirect to='/dashboard' />;

  return (
    <>
      <h1 className='large text-primary'>Sign In</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Sign into Your Account
      </p>
      <form
        className='form'
        action='create-profile.html'
        onSubmit={handleSubmit}
      >
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            onChange={(e) => handleChangeValue(e)}
            value={email}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            onChange={(e) => handleChangeValue(e)}
            value={password}
          />
        </div>

        <input type='submit' className='btn btn-primary' value='Login' />
      </form>
      <p className='my-1'>
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
    </>
  );
};
Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuth: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);