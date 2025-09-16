import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import '../Forget password/forgetPassword.css'

export default function ForgetPassword() {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFail, setIsFail] = useState(undefined);
  const navigate = useNavigate();

  // Initial values for email form
  const emailFormInitialValues = {
    email: ''
  };

  // Initial values for reset code form
  const resetCodeInitialValues = {
    resetCode: ''
  };

  // Function to handle sending the reset email
  async function sendResetEmail(values) {
    try {
      const response = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
        values
      );

      if (response.data.statusMsg === 'success') {
        setIsSuccess(true);
        setIsFail(undefined);
        setIsEmailSent(true); // Change form to reset code verification
        setTimeout(() => {
          setIsSuccess(false);
        }, 3000);
      }
    } catch (error) {
      console.log('error', error);
      setIsFail(error.response?.data?.message || 'Something went wrong');
      setIsSuccess(false);
    }
  }

  // Function to handle verifying reset code
  async function verifyResetCode(values) {
    try {
      const response = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',
        values
      );

      if (response.data.status === 'Success') {
        setIsSuccess(true);
        setIsFail(undefined);
        setTimeout(() => {
          setIsSuccess(false);
          // Navigate to reset password component after verification
          navigate('/resetPassword');
        }, 2000);
      }
    } catch (error) {
      console.log('error', error);
      setIsFail(error.response?.data?.message || 'Invalid reset code');
      setIsSuccess(false);
    }
  }

  // Email form validation and handling
  const emailFormik = useFormik({
    initialValues: emailFormInitialValues,
    onSubmit: sendResetEmail,
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required')
    })
  });

  // Reset code form validation and handling
  const resetCodeFormik = useFormik({
    initialValues: resetCodeInitialValues,
    onSubmit: verifyResetCode,
    validationSchema: Yup.object({
      resetCode: Yup.string()
        .required('Reset code is required')
    })
  });

  return (
    <div className='vh-100 d-flex justify-content-center align-items-center'>


      <div className="container forget-container d-flex justify-content-center">
        <div className="forgot-card">
          <h2 className="card-title">Forgot password</h2>

          <div className="divider"></div>

          {isSuccess && <div className="alert alert-success text-center">Success</div>}
          {isFail && <div className="alert alert-danger text-center">{isFail}</div>}

          {!isEmailSent ? (
            // Email Form
            <form onSubmit={emailFormik.handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="form-label">Please enter your email:</label>
                <input
                  id="email"
                  name="email"
                  className="form-control email-input"
                  type="email"
                  placeholder="Email"
                  value={emailFormik.values.email}
                  onChange={emailFormik.handleChange}
                  onBlur={emailFormik.handleBlur}
                />
                {emailFormik.errors.email && emailFormik.touched.email && (
                  <div className="text-danger mt-2" role="alert">
                    {emailFormik.errors.email}
                  </div>
                )}
              </div>

              <div className="text-center">
                <button type="submit" className="btn text-white confirm-btn">
                  Confirm
                </button>
              </div>
            </form>
          ) : (
            // Reset Code Form
            <form onSubmit={resetCodeFormik.handleSubmit}>
              <div className="alert alert-success text-center mb-4">
                Reset code sent to your email
              </div>

              <div className="mb-4">
                <label htmlFor="resetCode" className="form-label">
                  Please enter the code you've received:
                </label>
                <input
                  id="resetCode"
                  name="resetCode"
                  className="form-control email-input"
                  type="text"
                  placeholder="Reset Code"
                  value={resetCodeFormik.values.resetCode}
                  onChange={resetCodeFormik.handleChange}
                  onBlur={resetCodeFormik.handleBlur}
                />
                {resetCodeFormik.errors.resetCode && resetCodeFormik.touched.resetCode && (
                  <div className="text-danger mt-2" role="alert">
                    {resetCodeFormik.errors.resetCode}
                  </div>
                )}
              </div>

              <div className="text-center">
                <button type="submit" className="btn btn-success confirm-btn">
                  Confirm
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

    </div>

  );
}

