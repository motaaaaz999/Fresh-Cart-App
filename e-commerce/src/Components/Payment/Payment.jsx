import React, { useContext, useState } from 'react'
import '../Payment/payment.css'
import { useFormik } from 'formik'
import { CartContext } from '../../Context/CartContext'
import axios from 'axios';
import toast from 'react-hot-toast';
import { ScrollRestoration } from 'react-router-dom';


export default function Payment() {
  const { cartId, getCart } = useContext(CartContext);
  // Add state for checkbox
  const [payWithCash, setPayWithCash] = useState(false);

  const userData = {
    phoneNumber: '',
    city: '',
    address: ''
  }

  const confirmCashPayment = async () => {
    await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, formFormik.values,
      {
        headers: {
          token: localStorage.getItem('tkn')
        }
      }
    ).then((res) => {
      toast.success('Payment completed successfully', { position: 'top-center' });
      getCart();
    }).catch((err) => {
      toast.error('Something went wrong', { position: 'top-center' });
      console.log(err)
    })
  }

  const confirmOnlinePayment = async () => {
    await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`, formFormik.values,
      {
        headers: {
          token: localStorage.getItem('tkn')
        },
        params: { url: location.origin }
      }
    ).then((res) => {
      window.open(res.data.session.url, '_self');
    }).catch((err) => {
      toast.error('Something went wrong', { position: 'top-center' });
      console.log(err)
    })
  }

  // Handle the continue button click based on checkbox state
  const handleContinue = () => {
    if (payWithCash) {
      confirmCashPayment();
    } else {
      confirmOnlinePayment();
    }
  }

  const formFormik = useFormik(
    {
      initialValues: userData,
      validateOnMount: true,
      validate: function validate(values) {
        const errors = {};
        const regexCity = /^[A-Z]?[a-zA-Z0-9\s]{1,}$/;
        const regexAddress = /^[\w\,\s]{1,}$/;
        const regexPhoneNumber = /^01[0125][0-9]{8}$/

        if (regexCity.test(values.city) != true) {
          errors.city = 'Your city is required';
        }

        if (regexPhoneNumber.test(values.phoneNumber) != true) {
          errors.phoneNumber = 'Your phone is required';
        }

        if (regexAddress.test(values.address) != true) {
          errors.address = 'Your address is required';
        }

        return errors;
      }
    }
  );

  // Check if form is valid and all fields are touched
  const isFormValid = formFormik.isValid &&
    formFormik.touched.phoneNumber &&
    formFormik.touched.city &&
    formFormik.touched.address;

  return <>
    <ScrollRestoration />
    <div className='vh-100 d-flex justify-content-center align-items-center'>
      <div class="form-container-payment mt-5 ">
        <form onSubmit={formFormik.handleSubmit}>
          <div className='mb-3'>
            <div class="input-group">
              <span class="input-group-text"><i class="fas fa-phone"></i></span>
              <input
                value={formFormik.values.phoneNumber}
                onBlur={formFormik.handleBlur}
                onChange={formFormik.handleChange}
                id='phoneNumber'
                type="tel"
                class="form-control"
                placeholder="Phone number"
              />
            </div>
            {formFormik.errors.phoneNumber && formFormik.touched.phoneNumber ?
              <p class="text-danger"> {formFormik.errors.phoneNumber} </p>
              : ''}
          </div>

          <div className="mb-3">
            <div className="input-group">
              <span className="input-group-text"><i className="fas fa-city"></i></span>
              <input
                value={formFormik.values.city}
                onBlur={formFormik.handleBlur}
                onChange={formFormik.handleChange}
                id='city'
                type="text"
                className="form-control"
                placeholder="City"
              />
            </div>
            {formFormik.errors.city && formFormik.touched.city ? (
              <p className="text-danger m-0 mt-1" style={{ fontSize: '14px' }}>{formFormik.errors.city}</p>
            ) : null}
          </div>

          <div class="mb-3">
            <textarea
              value={formFormik.values.address}
              onBlur={formFormik.handleBlur}
              onChange={formFormik.handleChange}
              id='address'
              class="form-control"
              rows="5"
              placeholder="Please provide your address"
            ></textarea>
            {formFormik.errors.address && formFormik.touched.address ?
              <div class="text-danger">{formFormik.errors.address}</div>
              : ''}
          </div>

          <div class="form-check mb-3">
            <input
              class="form-check-input"
              type="checkbox"
              id="cashPayment"
              checked={payWithCash}
              onChange={(e) => setPayWithCash(e.target.checked)}
            />
            <label class="form-check-label" for="cashPayment">
              Pay with cash
            </label>
          </div>

          <button
            onClick={handleContinue}
            type="button"
            class="btn btn-continue bg-main w-100 text-white"
            disabled={!isFormValid}
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  </>
}
