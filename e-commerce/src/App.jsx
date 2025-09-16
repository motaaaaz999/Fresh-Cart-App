import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Product from './Components/Product/Product'
import ErrorPage from './Components/ErrorPage/ErrorPage'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import AuthProvider from './Context/AuthProvider'
import Cart from './Components/Cart/Cart'
import Categories from './Components/Categories/Categories'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import ProtectedRoute from './Components/Guard/Guard'
import { QueryClient, QueryClientProvider } from 'react-query'
import CartContextProvider from './Context/CartContext.jsx'
import { Toaster } from 'react-hot-toast'
import Payment from './Components/Payment/Payment.jsx'
import ProductCategory from './Components/ProductCategory/ProductCategory.jsx'
import Orders from './Components/Orders/Orders.jsx'
import ProductsCategory from './Components/ProductsCategory/ProductsCategory.jsx'
import ForgetPassword from './Components/Forget password/ForgetPassword.jsx'
import ResetPassword from './Components/ResetPassword/ResetPassword.jsx'
import WishlistContextProvider from './Context/WishlistContext.jsx'
import Wishlist from './Components/Wishlist/Wishlist.jsx'








const router = createBrowserRouter([
  {
    element: <Layout />, path: '/', children: [
      { element: <Login />, index: true, },
      { element: <ForgetPassword />, path: '/forgetPassword' },
      { element: <ResetPassword />, path: '/resetPassword' },
      {
        element: <ProtectedRoute>
          <Product />
        </ProtectedRoute>, path: '/products',
      },
      {
        element: <ProtectedRoute>
          <ProductCategory />
        </ProtectedRoute>, path: '/productsCategory',
      },
      {
        element: <ProtectedRoute>
          <ProductDetails />
          {/* :id => means a parameter like when you send arguement on the <Link> here we receive it as a parameter exacatly like function parameter */}
        </ProtectedRoute>, path: '/details/:id',
      },

      {
        element: <ProtectedRoute>
          <ProductsCategory />

        </ProtectedRoute>, path: '/category/:id',
      },
      {
        element: <ProtectedRoute>
          <Payment />

        </ProtectedRoute>, path: '/payment',
      },

      {
        element: <ProtectedRoute>
          <Cart />
        </ProtectedRoute>, path: '/cart',
      },
      {
        element: <ProtectedRoute>
          <Wishlist />
        </ProtectedRoute>, path: '/wishlist',
      },
      {
        element: <ProtectedRoute>
          <Orders />
        </ProtectedRoute>, path: '/allorders',
      },
      {
        element: <ProtectedRoute>
          <Categories />
        </ProtectedRoute>, path: '/categories',
      },

      { element: <Register />, path: '/register' },
      { element: <Login />, path: '/login' },
      { element: <ErrorPage />, path: '*' },

    ]
  }
])



export default function App() {
  //react query => handle async states
  const myClient = new QueryClient();


  return <>




    <QueryClientProvider client={myClient}>

      <AuthProvider>

        <CartContextProvider>
          <WishlistContextProvider>

            <RouterProvider router={router} />

          </WishlistContextProvider>

        </CartContextProvider>

      </AuthProvider>
    </QueryClientProvider>





    <Toaster></Toaster>







  </>

}

