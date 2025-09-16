import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import '../ResetPassword/resetPassword.css'

export default function ResetPassword() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFail, setIsFail] = useState(undefined);
  const navigate = useNavigate();
  // We can use the location state to get the email from the previous step
  const location = useLocation();
  const [userEmail, setUserEmail] = useState('');

  // Try to get email from the previous step if available
  useEffect(() => {
    if (location.state && location.state.email) {
      setUserEmail(location.state.email);
    }
  }, [location]);

  const initialValues = {
    email: userEmail,
    newPassword: ''
  };

  // Reset password function
  async function resetPassword(values) {
    try {
      // Get the token in case it's needed for headers
      const token = localStorage.getItem('tkn');

      const response = await axios.put(
        'https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
        values,
        {
          headers: {
            token: token // Include token in case it's required
          }
        }
      );

      if (response.data.token) {
        // If response contains a new token, store it
        localStorage.setItem('tkn', response.data.token);
      }

      setIsSuccess(true);
      setIsFail(undefined);

      setTimeout(() => {
        setIsSuccess(false);
        navigate('/login'); // Navigate to login page after reset
      }, 2000);
    } catch (error) {
      console.log('error', error);
      setIsFail(error.response?.data?.message || 'Failed to reset password');
      setIsSuccess(false);
    }
  }

  // Form validation and handling
  const formik = useFormik({
    initialValues,
    enableReinitialize: true, // Re-initialize when userEmail changes
    onSubmit: resetPassword,
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      newPassword: Yup.string()
        .matches(/^[A-Za-z0-9]{6,}$/, 'Password must be at least 6 characters, containing only letters and numbers')
        .required('New password is required')
    })
  });

  return (
    <div className="container reset-container  d-flex justify-content-center align-items-center">
      <div className="forgot-card">
        <h2 className="card-title">Reset Password</h2>

        <div className="divider"></div>

        {isSuccess && <div className="alert alert-success text-center">Password has been reset successfully!</div>}
        {isFail && <div className="alert alert-danger text-center">{isFail}</div>}

        <form onSubmit={formik.handleSubmit}>
          {/* Email field (can be hidden if we already have the email) */}
          {!userEmail && (
            <div className="mb-4">
              <label htmlFor="email" className="form-label">Your email:</label>
              <input
                id="email"
                name="email"
                className="form-control email-input"
                type="email"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.email && formik.touched.email && (
                <div className="text-danger mt-2" role="alert">
                  {formik.errors.email}
                </div>
              )}
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="newPassword" className="form-label">Enter your new password:</label>
            <input
              id="newPassword"
              name="newPassword"
              className="form-control email-input"
              type="password"
              placeholder="New Password"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.newPassword && formik.touched.newPassword && (
              <div className="text-danger mt-2" role="alert">
                {formik.errors.newPassword}
              </div>
            )}
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-success confirm-btn">
              Reset password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}