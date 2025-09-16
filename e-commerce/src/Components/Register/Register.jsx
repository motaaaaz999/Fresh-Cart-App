// 





import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import '../Register/register.css'

export default function Register() {

  const userData = {
    name: '',
    email: '',
    password: '',
    rePassword: '',
    phone: ''
  }

  const [isSuccess, setisSuccess] = useState(false);
  const [isFail, setisFail] = useState(false);
  const navigate = useNavigate();

  async function sendUserData(userData) {
    try {
      const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', userData)

      setisSuccess(true);
      setisFail(false);
      setTimeout(function () {
        setisSuccess(false);
        navigate('/login');
      }, 2000);
    }
    catch (error) {
      setisFail(true);
      setisSuccess(false);
    }
  }

  const formFormik = useFormik(
    {
      initialValues: userData,
      onSubmit: function (values) {
        sendUserData(values);
      },

      validate: function validate(values) {
        const errors = {};
        const regexName = /^[A-Z][a-z]{2,9}(\s?){0,}$/;
        const regexEmail = /^[a-zA-Z0-9_]{2,}@[a-z]{4,10}\.[a-z]{3}$/;
        const regexPassword = /^[A-Za-z0-9]{6,}$/;
        const regexPhoneNumber = /^01[0125][0-9]{8}$/
        if (regexName.test(values.name) != true) {
          errors.name = 'Name must be from 2 to 9 characters starts with capital letter';
        }
        if (regexEmail.test(values.email) != true) {
          errors.email = 'Email must be in format';
        }
        if (regexPassword.test(values.password) != true) {
          errors.password = 'Password must be from 6 to 12 character';
        }
        if (values.password != values.rePassword) {
          errors.rePassword = 'Confirm password does not match with password';
        }
        if (regexPhoneNumber.test(values.phone) != true) {
          errors.phone = 'Phone must be an Egyptian number';
        }

        return errors;
      }
    }
  );

  return <>

    <div className='form-container-wrapper'>



      <div className='form-container'>
        {isSuccess == true ? <div className="alert alert-success text-center">Your account has been created successfully</div> : ''}
        {isFail == true ? <div className="alert alert-danger text-center">Email Already Exists</div> : ''}

        <h2 className='form-title'>Create an account</h2>
        <div className="form-divider"></div>

        <form onSubmit={formFormik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label fs-6">Name:</label>
            <input
              type="text"
              className="form-control"
              id="name"
              onBlur={formFormik.handleBlur}
              onChange={formFormik.handleChange}
              value={formFormik.values.name}
              placeholder='Name'
            />
            {formFormik.errors.name && formFormik.touched.name ?
              <div className="text-danger fs-alert" role="alert"> {formFormik.errors.name} </div> : ''}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label fs-6">Email:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              onBlur={formFormik.handleBlur}
              onChange={formFormik.handleChange}
              value={formFormik.values.email}
              placeholder='Email'
            />
            {formFormik.errors.email && formFormik.touched.email ?
              <div className="text-danger fs-alert" role="alert"> {formFormik.errors.email} </div> : ''}
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="form-label fs-6">Phone number:</label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              onBlur={formFormik.handleBlur}
              onChange={formFormik.handleChange}
              value={formFormik.values.phone}
              placeholder='Phone Number'
            />
            {formFormik.errors.phone && formFormik.touched.phone ?
              <div className="text-danger fs-alert" role="alert"> {formFormik.errors.phone} </div> : ''}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label fs-6">Password:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              onBlur={formFormik.handleBlur}
              onChange={formFormik.handleChange}
              value={formFormik.values.password}
              placeholder='Password'
            />
            {formFormik.errors.password && formFormik.touched.password ?
              <div className="text-danger fs-alert" role="alert"> {formFormik.errors.password} </div> : ''}
          </div>

          <div className="mb-3">
            <label htmlFor="rePassword" className="form-label fs-6">Password confirmation:</label>
            <input
              type="password"
              className="form-control"
              id="rePassword"
              onBlur={formFormik.handleBlur}
              onChange={formFormik.handleChange}
              value={formFormik.values.rePassword}
              placeholder='Confirm Password'
            />
            {formFormik.errors.rePassword && formFormik.touched.rePassword ?
              <div className="text-danger fs-alert" role="alert"> {formFormik.errors.rePassword} </div> : ''}
          </div>

          <div className="d-flex justify-content-center gap-2 mt-4">
            <button type="submit" className="btn btn-create">Create</button>
            <button type="reset" className="btn btn-clear" onClick={() => formFormik.resetForm()}>Clear</button>
          </div>
        </form>

        <div className='w-100 mt-3 d-flex justify-content-center align-items-center gap-1'>

          <span className="login-text  ">Already have an account?</span>


          <Link to={'/login'}>
            <p className="m-0 p-0 login-link   fw-semibold ">  Login</p>
          </Link>

        </div>




      </div>

    </div>

  </>
}