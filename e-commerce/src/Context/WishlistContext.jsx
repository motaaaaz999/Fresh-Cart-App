import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
export const wishContext = createContext();

export default function WishlistContextProvider({ children }) {

  const [wishlistId, setWishlistId] = useState([]);
  const [allProducts, setAllProducts] = useState(0)

  const getWishlist = async () => {
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
        headers: { token: localStorage.getItem('tkn') }
      });
      setAllProducts(data.data);
      const ids = data.data.map((item) => {
        return item.id

      })
      setWishlistId(ids); //array of wish ids to compare it with

      return data.data;
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      return [];
    }
  };


  // Add useEffect to fetch wishlist on component mount
  useEffect(() => {
    getWishlist();
  }, [localStorage.getItem('tkn')]);

  const addToWishlist = async (id) => {
    const response = await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist',
      {
        "productId": id
      },
      {
        headers: { token: localStorage.getItem('tkn') }
      }
    ).then((res) => {

      return res.data;

    }).catch((err) => {

      return err;

    })
    return response

  }

  const deleteFromWishlist = async (id) => {
    const response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
      headers: { token: localStorage.getItem('tkn') }
    }).then((res) => {
      getWishlist()

      return res;
    }).catch((err) => {

      return err;
    })
    return response
  }

  return (
    <wishContext.Provider value={{ addToWishlist, deleteFromWishlist, getWishlist, wishlistId, allProducts }}>

      {children}


    </wishContext.Provider>
  )
}
