import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useQuery } from 'react-query';
import { Link, ScrollRestoration, useParams } from 'react-router-dom'
import '../ProductsCategory/productsCategory.css'
import { CartContext } from '../../Context/CartContext';
import { OrbitProgress } from 'react-loading-indicators';
import toast from 'react-hot-toast';
import ErrorPage from '../ErrorPage/ErrorPage';
import { wishContext } from '../../Context/WishlistContext'; // Add this import

export default function ProductsCategory() {
  const { id } = useParams();
  const { addProductToCart } = useContext(CartContext);
  // Add wishlist context
  const { addToWishlist, deleteFromWishlist, wishlistId, getWishlist } = useContext(wishContext);

  // Fetch wishlist when component mounts
  useEffect(() => {
    getWishlist();
  }, []);

  // Function to check if product is in wishlist
  const isProductInWishlist = (productId) => {
    return wishlistId.some((id) => id === productId);
  };

  // Toggle wishlist function
  const toggleWishlist = async (productId) => {
    if (isProductInWishlist(productId)) {
      // If product is in wishlist, remove it
      await deleteFromWish(productId);
    } else {
      // If product is not in wishlist, add it
      await addToWish(productId);
    }
    // Refresh wishlist after operation
    getWishlist();
  };

  // Add to wishlist function
  const addToWish = async (id) => {
    const loadingToastId = toast.loading('Adding product to wishlist...', {
      position: 'top-center'
    });

    const response = await addToWishlist(id);

    toast.dismiss(loadingToastId);
    if (response.status === 'success') {
      toast.success(`${response.message}`, {
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

  // Delete from wishlist function
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

  const getProductsCategory = async () => {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`)
  }

  const { data, isLoading, isSuccess, isError, isLoadingError } = useQuery(`productsCategory${id}`, getProductsCategory)

  const productCategory = data?.data.data

  const addProduct = async (id) => {
    const loadingToastId = toast.loading('Adding product to cart...', {
      position: 'top-center'
    });
    const response = await addProductToCart(id);
    toast.dismiss(loadingToastId);
    if (response) {
      toast.success('Product has been added to your cart', { duration: 5000, position: 'top-center' });
    } else {
      toast.error('Something went wrong', { duration: 5000, position: 'top-center' });
    }
  }

  if (isLoading) {
    return (
      <div className='vh-100 d-flex justify-content-center align-items-center'>
        <OrbitProgress color={["#32cd32", "#327fcd", "#cd32cd", "#cd8032"]} />
      </div>
    );
  }

  if (productCategory && productCategory.length === 0) {
    return (
      <div className="category-container container">
        <ScrollRestoration />
        <div className="category-wrapper">
          <p>
            <Link to={'/products'}>
              <span className='fw-medium homeLink'>Home </span>
            </Link> /
            <Link to={'/categories'}>
              <span className='fw-medium categoriesLink'> Categories </span>  /
            </Link>
            <span className='categoryName fw-medium'> {productCategory[0]?.category.name}</span>
          </p>
          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-4 g-4 py-4">
            <h6 className='w-100 text-center fw-medium'>No products found for this category.</h6>
          </div>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="category-container container">
        <ScrollRestoration />
        <div className="category-wrapper">
          <p>
            <Link to={'/products'}>
              <span className='fw-medium homeLink'>Home </span>
            </Link> /
            <Link to={'/categories'}>
              <span className='fw-medium categoriesLink'> Categories </span>  /
            </Link>
            <span className='categoryName fw-medium'> {productCategory[0]?.category.name}</span>
          </p>
          <Link to={'/categories'}>
            <button className='btn back-btn'> <i className="fa-solid me-1 fa-arrow-left"></i>  Go Back </button>
          </Link>

          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-4 g-4 py-4">
            {productCategory.map((product) => (
              <div key={product.id} className="col">
                <div className="position-relative product rounded-2 bg-white productCard">
                  <Link to={`/details/${product.id}`}>
                    <img className='w-100' src={product.imageCover} alt="product image" />
                    <div className='ms-3 p-0 d-inline-block category-name'>
                      <p className='fw-normal h6 text-main'>{product.subcategory[0].name}</p>
                    </div>
                    <div className='ms-3 mb-4 title-name'>
                      <h6 className='fw-medium'>{product.title.split(' ').slice(0, 2).join(' ')}</h6>
                    </div>
                    <div className='ms-3 d-flex justify-content-between'>
                      <h6 className='fw-semibold'>{product.price} EGP</h6>
                      <h6 className='me-1'><i style={{ color: '#daa520' }} className='fa-solid fa-star'></i> {product.ratingsAverage}</h6>
                    </div>
                  </Link>
                  <button
                    onClick={() => addProduct(product.id)}
                    className='d-flex justify-content-center align-items-center add-btn btn shadow'
                  >
                    <div>
                      <i className="fa-solid fa-cart-plus"></i>
                    </div>
                  </button>
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`wish-btn btn shadow d-flex align-items-center ${isProductInWishlist(product.id) ? 'bg-danger' : ''}`}
                  >
                    <div>
                      {isProductInWishlist(product.id) ? (
                        <i className="fa-solid text-white fa-heart-circle-check"></i>
                      ) : (
                        <i className="fa-solid text-danger fa-heart-circle-plus"></i>
                      )}
                    </div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
