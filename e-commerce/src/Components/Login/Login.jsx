import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import { Link, ScrollRestoration, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import '../Login/login.css'

//hooks are only used inside function component 
//uncontrolled form/input(value of input)
export default function Login() {

  const userData = {
    email: '',
    password: ''
  } //object to rcieve Form input values 

  const { setToken, myToken } = useContext(AuthContext)
  const [isSuccess, setisSuccess] = useState(false);
  const [isFail, setisFail] = useState(undefined);
  const navigate = useNavigate(); //return function that navigate to path you want to go


  async function sendUserData(userData) {
    try {
      const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', userData)
      if (response.data.message == 'success') {
        console.log('token:', response.data.token);
        setToken(response.data.token);
        localStorage.setItem('tkn', response.data.token)
        setisSuccess(true);
        setisFail(undefined);
        setTimeout(function () {
          setisSuccess(false);
          navigate('/products'); //navigate to product component after 2s 
        }, 2000);
      }
    }
    catch (error) {
      console.log('error', error);
      setisFail(error.response.data.message);
      setisSuccess(false);
    }
    //we use try and catch to handle errors (try when it success) (catch if there is error in your code)
  }


  const formFormik = useFormik(
    {
      initialValues: userData,
      onSubmit: function (values) {
        sendUserData(values);
      },

      validate: function validate(values) {
        const errors = {};
        const regexEmail = /^[a-zA-Z0-9_]{2,}@[a-z]{4,10}\.[a-z]{3}$/;
        const regexPassword = /^[A-Za-z0-9]{6,}$/;

        if (regexEmail.test(values.email) != true) {
          errors.email = 'Email must be in format';
        }
        if (regexPassword.test(values.password) != true) {
          errors.password = 'Password must be from 6 to 12 character';
        }

        return errors;
      }
    }
  );

  return <>
    <ScrollRestoration />


    <div className='vh-100 d-flex justify-content-center align-items-center'>

      <div className="  login-container">
        <h2 className="login-title">Login</h2>
        <hr />

        {isSuccess == true ? <div className="alert alert-success text-center">Welcome Back!</div> : ''}
        {isFail ? <div className="alert alert-danger text-center">{isFail}</div> : ''}

        <form onSubmit={formFormik.handleSubmit}>
          <div className="form-group">
            <div className="input-group">
              <span className="input-group-text">
                <i class="fa-solid fa-at fw-medium"></i>
              </span>
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                id="email"
                onBlur={formFormik.handleBlur}
                onChange={formFormik.handleChange}
                value={formFormik.values.email}
              />
            </div>
            {formFormik.errors.email && formFormik.touched.email ?
              <div className="text-danger mt-2" role="alert"> {formFormik.errors.email} </div> : ''}
          </div>

          <div className="form-group mb-4">
            <div className="input-group">
              <span className=" input-group-text">
                <i className="fas fa-lock"></i>
              </span>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                id="password"
                onBlur={formFormik.handleBlur}
                onChange={formFormik.handleChange}
                value={formFormik.values.password}
              />
            </div>
            {formFormik.errors.password && formFormik.touched.password ?
              <div className="text-danger mt-2" role="alert"> {formFormik.errors.password} </div> : ''}
          </div>

          <button type="submit" className="btn  btn-primary login-btn">Login</button>

          <div className="fw-semibold  forgot-password">
            <Link to={'/forgetPassword'}>
              <p>Forgot my password</p>
            </Link>



          </div>

          <div className="create-account">
            <span className='fw-medium'>Don't have an account? </span>
            <Link to={'/register'}>
              <p className=' fw-semibold d-inline-block'> Create an account</p>
            </Link>

          </div>
        </form>
      </div>
    </div>

  </>
}