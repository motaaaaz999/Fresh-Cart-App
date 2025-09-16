import React, { useContext } from 'react'
import '../Wishlist/wishlist.css'
import { wishContext } from '../../Context/WishlistContext'
import { OrbitProgress } from 'react-loading-indicators';
import toast from 'react-hot-toast';
import { Link, ScrollRestoration } from 'react-router-dom';


export default function Wishlist() {
  const { deleteFromWishlist, allProducts } = useContext(wishContext);
  const products = allProducts;


  const deleteFromWish = async (id) => {
    const loadingToastId = toast.loading('Removing from wishlist...', {
      position: 'top-center'
    });

    const response = await deleteFromWishlist(id);

    toast.dismiss(loadingToastId);
    if (response && response.data && response.data.status === 'success') {
      toast.success('Product removed from wishlist', {
        duration: 5000,
        position: 'top-center'
      });
    } else {
      toast.error('Something went wrong', {
        duration: 5000,
        position: 'top-center'
      });
    }
  };
  if (!allProducts) {

    return (
      <>

        <div className='vh-100 d-flex justify-content-center align-items-center'>
          <OrbitProgress color={["#32cd32", "#327fcd", "#cd32cd", "#cd8032"]} />
        </div>
      </>

    );

  }

  if (allProducts) {


    return (
      <>
        <ScrollRestoration />

        <div class="container wishlist-container ">
          <h1 class="wishlist-heading">My Wishlist</h1>


          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 product-grid">

            {products.map((product, idx) => {
              return (

                <div key={idx} class="col">
                  <div class="wishlist-card">
                    <Link to={`/details/${product.id}`}>
                      <div class="product-img-container">
                        <img src={product.imageCover} alt={product.title} class="product-img" />
                      </div>


                      <div class="product-info-top">
                        <h3 class="product-title">{product.title.split(' ').slice(0, 2).join(' ')}</h3>

                        <p className="product-details">
                          {product.description.split(' ').slice(0, 6).join(' ')}
                          {product.description.split(' ').length > 6 ? '...' : ''}
                        </p>

                      </div>
                    </Link>


                    <div className="product-info-bottom">
                      <button
                        onClick={() => deleteFromWish(product.id)}
                        className="btn btn-remove">
                        <i className="fas fa-trash"></i>  Remove
                      </button>
                    </div>

                  </div>
                </div>




              )
            })}



          </div>
        </div>

      </>
    )

  }

}
