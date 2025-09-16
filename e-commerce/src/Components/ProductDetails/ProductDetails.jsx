import React, { useContext, useEffect } from 'react'
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import '../ProductDetails/productDetails.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { OrbitProgress } from 'react-loading-indicators';



export default function ProductDetails() {
  const { id } = useParams();
  const { addProductToCart } = useContext(CartContext);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  const addProduct = async (id) => {
    const response = await addProductToCart(id);
    if (response) {
      console.log('response', response);
      toast.success('Product has been added to your cart', { duration: 5000, position: 'top-center' })

    }
    else {
      toast.error('Something went wrong', { duration: 5000, position: 'top-center' })
    }

  }
  const getDetails = async () => {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }
  const { data, isLoading, isError } = useQuery(`getDetails${id}`, getDetails);
  const productDetails = data?.data.data;

  if (isLoading) {


    return (

      <>


        <div className=' vh-100 d-flex justify-content-center align-items-center'>

          <OrbitProgress color={["#32cd32", "#327fcd", "#cd32cd", "#cd8032"]} />
        </div>


      </>




    )


  }

  if (productDetails) {


    return <>


      <div className=" container mt-5 ">
        <div className="row py-5 ">


          <>


            <div className="col-md-4 mt-3">


              <Swiper
                pagination={{
                  dynamicBullets: true,
                }}
                spaceBetween={1}
                modules={[Pagination, Autoplay]}
                className="mySwiper"


                autoplay={{
                  delay: 3000, // 3 seconds between slides
                  disableOnInteraction: false, // Continue autoplay after user interactions
                  pauseOnMouseEnter: true, // Pause when mouse hovers
                }}

              >


                {productDetails.images.map((productImg, idx) => {
                  return (

                    <SwiperSlide key={idx}>
                      <div className='product-Card  rounded-3'>
                        <img className=' rounded-3 w-100' src={productImg} alt={productDetails.title} />

                      </div>

                    </SwiperSlide>
                  )
                })}





              </Swiper>

            </div>

            <div className=" d-flex flex-column  justify-content-between  mt-3 col-md-8">
              <div>
                <h3 className='fw-semibold'>{productDetails.title}</h3>
                <p className='text-secondary'>{productDetails.description}</p>
                <h6>Category:<span className='fw-normal'> {productDetails.category.name} </span></h6>
                <h6>Sub-Category: <span className='fw-normal'> {productDetails.subcategory[0].name} </span> </h6>
              </div>


              <div>


                <div className=' d-flex  justify-content-between'>
                  {productDetails.priceAfterDiscount ? <h3> <span className=' h3  text-opacity-75 fw-normal me-2 text-danger text-decoration-line-through'> {productDetails.price} </span>   {productDetails.priceAfterDiscount} EGP </h3> : <h3>{productDetails.price} EGP</h3>}


                  <h4> <i style={{ color: '#daa520' }} className=' fa-solid fa-star'></i> {productDetails.ratingsAverage}
                    <span className='text-secondary'>{` (${productDetails.ratingsQuantity})`}</span> </h4>


                </div>

                <button onClick={() => { addProduct(productDetails.id) }} className=' mt-3 cart-btn btn text-white w-100'> <i class="fa-solid fa-cart-plus"></i> Add to cart</button>

              </div>








            </div>




          </>




        </div>
      </div>




    </>

  }

}
