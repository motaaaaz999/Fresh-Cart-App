import React, { Children } from "react";
import axios from "axios";
import { useQuery } from "react-query";
//import Swiper component
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import '../CategorySlider/CategorySlider.css'
import { Autoplay, Pagination } from 'swiper/modules';
import { OrbitProgress } from "react-loading-indicators";
import { Link } from "react-router-dom";




export default function CategorySlider() {
  const getCategory = async () => {
    return await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
  }
  const { data, isLoading } = useQuery('getCategory', getCategory)


  if (isLoading) {

    return <>


      <div className=' vh-100 d-flex justify-content-center align-items-center'>

        <OrbitProgress color={["#32cd32", "#327fcd", "#cd32cd", "#cd8032"]} />
      </div>

    </>

  }
  if (data.data.data) {


    return <>

      <div className="container mt-5 py-5">

        <h2 className="h4 fw-bold mb-3">Shop popular categories</h2>
        <hr />


        <Swiper
          slidesPerView={2}
          spaceBetween={0}
          pagination={{ dynamicBullets: true }}
          breakpoints={{
            576: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            992: { slidesPerView: 4 }
          }}
          autoplay={{
            delay: 3000, // 3 seconds between slides
            disableOnInteraction: false, // Continue autoplay after user interactions
            pauseOnMouseEnter: true, // Pause when mouse hovers
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"

        >


          {data.data.data.map((category) => {
            return (
              <SwiperSlide key={category._id} >
                <Link to={`/category/${category._id}`}>
                  <div className="category-Card  text-center rounded-3 shadow-sm border"  >
                    <img style={{ height: '300px', width: '300px' }} className="  rounded-3 w-100" src={category.image} alt={category.name} />



                  </div>
                </Link>

                <h6 className=" category-name pb-3   ">{category.name}</h6>




              </SwiperSlide>

            )




          })}


        </Swiper>


      </div>
    </>

  }


}






























