import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useQuery } from 'react-query';
import { Link, ScrollRestoration } from 'react-router-dom';
import '../ProductCategory/productCategory.css'
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { OrbitProgress } from 'react-loading-indicators';
import { wishContext } from '../../Context/WishlistContext'; // Add this import

export default function ProductCategory() {
  // Add search state
  const [searchTerm, setSearchTerm] = useState('');

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

  const addProduct = async (id) => {
    const loadingToastId = toast.loading('Adding product to cart...', {
      position: 'top-center'
    });
    const response = await addProductToCart(id);

    toast.dismiss(loadingToastId);
    if (response) {
      toast.success('Product has been added to your cart', {
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

  const getProduct = async () => {
    return await axios.get('https://ecommerce.routemisr.com/api/v1/products');
  };

  const { data, isLoading, isSuccess } = useQuery('getAllProducts', getProduct);

  if (isLoading) {
    return (
      <div className='vh-100 d-flex justify-content-center align-items-center'>
        <OrbitProgress color={["#32cd32", "#327fcd", "#cd32cd", "#cd8032"]} />
      </div>
    );
  }

  if (isSuccess) {
    // Filter products based on search term
    const filteredProducts = data.data.data.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="container mt-5 pt-5">
        <ScrollRestoration />
        {/* Search Input */}
        <div className="row mb-4">
          <div className="col-md-6 mx-auto">
            <div className="input-group">
              <span className="input-group-text bg-main text-white">
                <i className="fa fa-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search products by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                dir="ltr"
              />
            </div>
          </div>
        </div>

        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-4 g-4 py-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="col">
                <div className="position-relative product rounded-2 productCard">
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
            ))
          ) : (
            <div className="col-12 w-100 text-center d-flex justify-content-center">
              <h4 className="text-muted py-5">No products match your search</h4>
            </div>
          )}
        </div>
      </div>
    );
  }
}


























// }