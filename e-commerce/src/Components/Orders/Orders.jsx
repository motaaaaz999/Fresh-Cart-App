import React, { useEffect } from 'react'
import './orders.css'  // Make sure this file exists with the required CSS
import { useQuery } from 'react-query'
import axios from 'axios'
import { OrbitProgress } from 'react-loading-indicators'
import { ScrollRestoration } from 'react-router-dom'


export default function Orders() {
  const getAllOrders = async () => {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${localStorage.getItem('userId')}`)
  }



  const { data, isLoading, isError, isSuccess } = useQuery('getAllOrders', getAllOrders)
  console.log('allorders', data?.data);
  const allOrders = data?.data;


  if (isError) return <div className="text-center my-5 text-danger">Error loading orders!</div>;


  if (isLoading) {

    return <>


      <div className=' vh-100 d-flex justify-content-center align-items-center'>

        <OrbitProgress color={["#32cd32", "#327fcd", "#cd32cd", "#cd8032"]} />
      </div>


    </>


  }

  if (isSuccess) {

    return (
      <div>
        <ScrollRestoration />
        {allOrders.map((order, idx) => (
          <div className="container " key={idx}>
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="order-container">
                  {/* Multiple Products Section */}
                  <div className="products-section">

                    <h3 className="mb-3">Order Items</h3>
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
                      {/* You can map through order.cartItems here if available */}
                      {order.cartItems.map((orderCard, secIdx) => {
                        return (
                          <div key={secIdx} className="col">
                            <div className="product-card">
                              <img src={orderCard.product.imageCover} alt={orderCard.product.category.name} className="product-image" />
                              <div className="product-info">
                                <h5>{orderCard.product.category.name}</h5>
                                <p className="mt-2 fw-bold">{orderCard.price} EGP </p>
                              </div>
                            </div>
                          </div>
                        )
                      })}



                    </div>
                  </div>

                  {/* Order Details Section */}
                  <div className="row mt-4">
                    <div key={idx} className="col-12">
                      <h3 className="mb-3">Order Details</h3>
                      <div className="detail-row bg-light">
                        <div className="detail-label">Order ID</div>
                        <div className="detail-value">{order.id}</div>
                      </div>
                      <div className="detail-row">
                        <div className="detail-label">Deliver to</div>
                        <div className="detail-value">{order.user.name}</div>
                      </div>
                      <div className="detail-row bg-light">
                        <div className="detail-label">Phone</div>
                        <div className="detail-value">{order.user.phone}</div>
                      </div>
                      <div className="detail-row">
                        <div className="detail-label">Delivery address</div>
                        <div className="detail-value">{order.shippingAddress?.details || "No city specified"}</div>
                      </div>
                      <div className="detail-row bg-light">
                        <div className="detail-label">Paid</div>
                        <div className="detail-value">{order.isPaid == false ? 'No' : 'Yes'}</div>
                      </div>
                      <div className="detail-row">
                        <div className="detail-label">Payment method</div>
                        <div className="detail-value">{order.paymentMethodType}</div>
                      </div>
                      <div className="detail-row bg-light">
                        <div className="detail-label">Shipping price</div>
                        <div className="detail-value">{order.shippingPrice}</div>
                      </div>
                      <div className="detail-row">
                        <div className="detail-label">Taxes</div>
                        <div className="detail-value">{order.taxPrice}</div>
                      </div>
                      <div className="detail-row total-row">
                        <div className="detail-label">Total price</div>
                        <div className="detail-value">{order.totalOrderPrice} EGP</div>
                      </div>
                      <div className="detail-row">
                        <div className="detail-label">Made at</div>
                        <div className="detail-value">
                          {order.createdAt
                            ? new Date(order.updatedAt).toLocaleString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: 'numeric',
                              minute: 'numeric',
                              hour12: true
                            })
                            : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return null; // Fallback return
}