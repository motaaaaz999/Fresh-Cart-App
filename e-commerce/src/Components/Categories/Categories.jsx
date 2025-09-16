import React, { useEffect } from 'react'
import '../Categories/category.css'
import { useQuery } from 'react-query'
import axios from 'axios'
import { OrbitProgress } from 'react-loading-indicators'
import { Link, ScrollRestoration } from 'react-router-dom'


export default function Categories() {
  const getCategories = async () => {
    return await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
  }
  const { data, isError, isLoading, isSuccess } = useQuery('getCategories', getCategories);
  console.log(data?.data.data);
  const allCategories = data?.data.data;




  if (isLoading) {

    return <>


      <div className=' vh-100 d-flex justify-content-center align-items-center'>

        <OrbitProgress color={["#32cd32", "#327fcd", "#cd32cd", "#cd8032"]} />
      </div>


    </>


  }


  if (isSuccess) {

    return (

      <>
        <div class="category-container container ">
          <ScrollRestoration />
          <div class="category-wrapper">

            <h2 className='fw-medium'>Categories</h2>
            <hr />

            <div class="row g-4">
              {allCategories.map((category) => {
                return (

                  <div key={category._id} class="col-12 col-sm-6 col-md-4">
                    <Link to={`/category/${category._id}`}>
                      <div class="Category-card border-0">
                        <div class="thumb">
                          <img
                            src={category.image}
                            alt={category.name} />
                        </div>
                        <div class="caption">{category.name}</div>
                      </div>

                    </Link>

                  </div>


                )


              })}



            </div>






          </div>
        </div>







      </>
    )

  }

}
