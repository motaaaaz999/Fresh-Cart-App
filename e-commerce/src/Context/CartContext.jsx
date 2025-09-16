import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
export const CartContext = createContext();


export default function CartContextProvider({ children }) {
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [allProducts, setProducts] = useState(0);
  const [cartId, setCartId] = useState(0);


  const { myToken } = useContext(AuthContext);



  const addProductToCart = async (id) => {

    const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/cart',
      {
        "productId": id,
      },
      {
        headers: { token: localStorage.getItem('tkn') }
      }).then((response) => {
        getCart();

        return response
      }).catch((error) => {
        return error
      })


    return data




  }




  const getCart = async () => {
    await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
      headers: { token: localStorage.getItem('tkn') }
    })
      .then((res) => {
        localStorage.setItem('userId', res.data.data.cartOwner)
        setNumOfCartItems(res.data.numOfCartItems);
        setTotalCartPrice(res.data.data.totalCartPrice);
        setProducts(res.data.data.products);
        setCartId(res.data.data._id);

        // console.log(numOfCartItems);
      }).catch((err) => {
        console.log(err);
      })

  }



  useEffect(() => {
    getCart(); //every time token is changed , i will call getCart again 
    //component did update
  }, [myToken])

  const updateCount = async (id, count) => {
    const booleanFlag = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      {
        "count": count
      }, {
      headers: { token: localStorage.getItem('tkn') }
    }

    ).then((response) => {
      setNumOfCartItems(response.data.numOfCartItems);
      setProducts(response.data.data.products);
      setTotalCartPrice(response.data.data.totalCartPrice);
      return (response.data)
    }).catch((err) => {
      return err
    })

    return booleanFlag;

  }

  // updateCount('6428e7ecdc1175abc65ca090', 5);

  const deleteProduct = async (id) => {
    const response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      {
        headers: { token: localStorage.getItem('tkn') }
      }
    ).then((response) => {
      setNumOfCartItems(response.data.numOfCartItems);
      setProducts(response.data.data.products);
      setTotalCartPrice(response.data.data.totalCartPrice);
      return true;

    }).catch((err) => {
      return false;
    })
    return response;

  }

  const clearCart = async () => {
    const response = await axios.delete('https://ecommerce.routemisr.com/api/v1/cart', {
      headers: { token: localStorage.getItem('tkn') }
    }).then(() => {
      setNumOfCartItems(0);
      setProducts([]);
      setTotalCartPrice(0);
      return true;

    }).catch(() => {
      return false;
    })
    return response;
  }




  return <>

    <CartContext.Provider value={{ addProductToCart, getCart, updateCount, deleteProduct, clearCart, numOfCartItems, totalCartPrice, allProducts, cartId }}>
      {children}
    </CartContext.Provider>




  </>




}
