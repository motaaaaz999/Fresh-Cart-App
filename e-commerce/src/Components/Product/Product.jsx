
import { useContext, useState } from 'react'
import axios from 'axios'
import { useQuery } from 'react-query';
import CategorySlider from '../CategorySlider/CategorySlider';
import { Link, ScrollRestoration } from 'react-router-dom';
import '../Product/product.css'
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { OrbitProgress } from 'react-loading-indicators';
import { wishContext } from '../../Context/WishlistContext';

export default function Product() {
  const { addProductToCart } = useContext(CartContext);
  const { addToWishlist, deleteFromWishlist, getWishlist, wishlistId } = useContext(wishContext);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 20;




  // Function to check if product is in wishlist

  const isProductInWishlist = (productId) => {
    return wishlistId.some((id) => id == productId);
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
    if (response.status === 'success') {
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

  // Get products
  const getProduct = async () => {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${currentPage}&limit=${limit}`);
  };

  const { data, isLoading, isSuccess } = useQuery(
    ['getAllProducts', currentPage, limit],
    getProduct
  );

  const totalPages = 3;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
    window.scrollTo(0, 0);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    window.scrollTo(0, 0);
  };

  if (isLoading) {
    return (
      <div className='vh-100 d-flex justify-content-center align-items-center'>
        <OrbitProgress color={["#32cd32", "#327fcd", "#cd32cd", "#cd8032"]} />
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="container">
        <ScrollRestoration />
        <CategorySlider />
        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-4 g-4 py-4">
          {data.data.data.map((product) => (
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
                      <i className="fa-solid text-white fa-heart-circle-check "></i>
                    ) : (
                      <i className="fa-solid text-danger fa-heart-circle-plus "></i>
                    )}
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <nav aria-label="Page navigation" className="my-4">
          <ul className="pagination justify-content-center">
            <li className={`page - item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link text-muted" onClick={handlePrevious}>Previous</button>
            </li>

            {[1, 2, 3].map(pageNumber => (
              <li key={pageNumber} className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </button>
              </li>
            ))}

            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link text-muted" onClick={handleNext}>Next</button>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}


