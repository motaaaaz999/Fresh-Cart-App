import axios from 'axios'
import React, { Fragment, useContext, useEffect } from 'react'
import '../Cart/cart.css'
import { OrbitProgress } from 'react-loading-indicators';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { Link, ScrollRestoration } from 'react-router-dom';





export default function Cart() {
  const { totalCartPrice, allProducts, updateCount, deleteProduct, clearCart } = useContext(CartContext);


  const updateProductCount = async (id, count) => {
    const response = await updateCount(id, count);
    console.log('update count res', response)
    if (response) {
      if (count == 0) {
        return toast.success('Cart has been removed succesfully', { position: 'top-center' });

      }
      toast.success('Cart has been updated succesfully', { position: 'top-center' });
    }

    else {

      toast.error('Something went wrong', { position: 'top-center' });

    }



  }


  const deleteProductFromCart = async (id) => {
    const response = await deleteProduct(id);
    console.log('delete res', response)
    if (response) {
      toast.success('Cart has been removed succesfully', { position: 'top-center' });

    }
    else {
      toast.error('Something went wrong', { position: 'top-center' });
    }

  }

  const emptyCart = async () => {
    const response = await clearCart();
    if (response) {
      toast.success('Cart has been removed succesfully', { position: 'top-center' });

    }
    else {
      toast.error('Something went wrong', { position: 'top-center' });

    }


  }


  if (!allProducts) {
    return (<>
      <div className=' vh-100 d-flex justify-content-center align-items-center'>

        <OrbitProgress color={["#32cd32", "#327fcd", "#cd32cd", "#cd8032"]} />
      </div>



    </>


    )
  }

  if (allProducts) {



    return <>
      <ScrollRestoration />

      <div class="container mt-5 py-4 py-md-5">

        <div class="row justify-content-center">
          <div class="col-12  col-xxl-8">

            <section class="shopping-card p-3 p-sm-4 p-lg-5">


              <header class="mb-4">

                <h2 class="fw-bold mb-1">Shopping Cart</h2>
                <h6 class="text-secondary fw-normal">
                  Total cart price:
                  <span class="text-success fw-semibold"> {totalCartPrice} EGP</span>
                </h6>
              </header>

              {allProducts.map((product, idx) => {
                return (

                  <Fragment key={idx}>

                    <div class="row g-4 align-items-center mb-4">

                      <div class="col-12 col-sm-3 col-md-2 col-lg-2">
                        <img class="item-thumb img-fluid"
                          src={product.product.imageCover}
                          alt={product.product.title} />

                      </div>


                      <div class="col-12 col-sm-5 col-md-6 col-lg-6">
                        <h5 class="fw-bold mb-1">{product.product.title}</h5>

                        <p class="mb-2 fw-semibold">{product.price} EGP</p>
                        <button onClick={() => { deleteProductFromCart(product.product.id) }} class="btn btn-danger btn-sm px-3">
                          <i class="text-white fa-solid fa-trash"></i> Remove
                        </button>
                      </div>


                      <div class="col-12 col-sm-4 col-md-4 col-lg-4
                    d-flex align-items-center justify-content-start justify-content-sm-end gap-2">

                        <button onClick={() => { updateProductCount(product.product.id, product.count + 1) }} class=" border-0 qty-btn"><i class="text-white fa-solid fa-circle-plus"></i></button>

                        <span class="qty-number">{product.count}</span>

                        <button onClick={() => { updateProductCount(product.product.id, product.count - 1) }} class=" border-0 qty-btn"><i class="text-white fa-solid fa-circle-minus"></i>
                        </button>
                      </div>
                    </div>

                    <div class="divider mb-4"></div>

                  </Fragment>



                )









              })}




              {allProducts.length ?
                <>

                  <div class="row gy-3">
                    <div class="col-12 col-md-6">
                      <button onClick={() => { emptyCart() }} class="btn btn-danger w-100 py-2">
                        <i class="text-white fa-solid fa-trash"></i> Clear cart
                      </button>
                    </div>
                    <div class="col-12 col-md-6 text-md-end">
                      <Link to='/payment'>
                        <button class="btn btn-success w-100 w-md-auto px-4 py-2">
                          <i class="text-white  fa-solid fa-bag-shopping"></i> Checkout
                        </button>
                      </Link>

                    </div>
                  </div>
                </> : ''}



            </section>

          </div>
        </div>
      </div>



    </>




  }




}
