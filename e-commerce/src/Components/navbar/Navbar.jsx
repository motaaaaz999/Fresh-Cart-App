import React, { useContext } from 'react'
import logo from '../../images/freshcart-logo.svg'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'
import { CartContext } from '../../Context/CartContext'
import '../navbar/navbar.css'


export default function Navbar() {

  const navigate = useNavigate();
  const { myToken, setToken } = useContext(AuthContext);
  const { numOfCartItems } = useContext(CartContext);
  function logout() {
    setToken(null);
    localStorage.removeItem('tkn')
    navigate('/login')
  }
  return <>
    <nav className="navbar shadow-sm  fixed-top navbar-expand-lg bg-body-tertiary">
      <div className="container  ">
        <Link className="navbar-brand" to="#">
          <img src={logo} alt="Fresh Cart" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">

          {myToken ? <>    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} aria-current="page" to="/products">
                Home
              </NavLink>

            </li>


            <li className="nav-item">
              <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/productsCategory">
                Products
              </NavLink>

            </li>

            <li className="nav-item">

              <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/categories">Categories</NavLink>
            </li>


            <li className="nav-item">
              <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/wishlist">Wishlist</NavLink>
            </li>


            <li className="nav-item">
              <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/allorders">Orders</NavLink>
            </li>



          </ul> </> : ''}




          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

            <>  <ul className='mt-1 d-flex list-unstyled  align-items-center'>
              <li className="nav-item me-3">
                <i style={{ fontSize: '20px' }} class="fa-brands fa-instagram"> </i>
              </li>
              <li className="nav-item me-3">
                <i style={{ fontSize: '20px' }} class=" fa-brands fa-facebook"></i>
              </li>

              <li className="nav-item me-3">
                <i style={{ fontSize: '20px' }} class="fa-brands fa-x-twitter"></i>
              </li>
              <li className="nav-item me-3">
                <i style={{ fontSize: '20px' }} class="fa-brands fa-linkedin"></i>
              </li>

              {myToken ? <li className="nav-item me-3">
                <Link className="nav-link" to="/cart">







                  <div className="position-relative d-inline-block">
                    <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" style={{ color: '#000' }}>
                      <path fill="currentColor" d="M7.25 9A.75.75 0 0 1 8 8.25h3a.75.75 0 0 1 0 1.5H8A.75.75 0 0 1 7.25 9"></path>
                      <path fill="currentColor" fillRule="evenodd" d="M1.289 2.763a.75.75 0 0 1 .948-.475l.305.102c.626.209 1.155.385 1.572.579c.442.206.826.46 1.117.865c.291.403.412.848.467 1.333l.009.083h10.804c.976 0 1.792 0 2.417.092c.651.097 1.28.318 1.676.92c.396.6.352 1.265.184 1.902c-.16.61-.482 1.36-.867 2.258l-.467 1.089c-.176.412-.332.775-.493 1.062c-.175.31-.388.592-.711.805s-.667.298-1.021.337c-.328.035-.722.035-1.17.035H6.154c.074.134.159.244.255.341c.277.277.666.457 1.4.556c.755.101 1.756.103 3.191.103h8a.75.75 0 0 1 0 1.5h-8.055c-1.367 0-2.47 0-3.337-.116c-.9-.122-1.658-.38-2.26-.982s-.86-1.36-.981-2.26c-.117-.867-.117-1.97-.117-3.337V6.883c0-.713 0-1.185-.042-1.546c-.04-.342-.107-.506-.194-.626c-.086-.12-.221-.237-.533-.382c-.33-.153-.777-.304-1.453-.53l-.265-.087a.75.75 0 0 1-.474-.95m4.518 9.487h10.215c.496 0 .809-.001 1.046-.027c.219-.023.303-.062.356-.097s.122-.097.23-.289c.117-.208.24-.495.436-.95l.429-1c.414-.968.69-1.616.819-2.106c.126-.476.062-.62.014-.694c-.049-.073-.157-.189-.644-.26c-.501-.075-1.205-.077-2.257-.077H5.75V9.5c0 1.172 0 2.054.056 2.75m1.694 9.5a2.25 2.25 0 1 1 0-4.5a2.25 2.25 0 0 1 0 4.5m-.75-2.25a.75.75 0 1 0 1.5 0a.75.75 0 0 0-1.5 0m7.5 0a2.25 2.25 0 1 0 4.5 0a2.25 2.25 0 0 0-4.5 0m2.25.75a.75.75 0 1 1 0-1.5a.75.75 0 0 1 0 1.5" clipRule="evenodd"></path>
                    </svg>

                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-main"
                      style={{ fontSize: '0.7rem' }}>
                      {numOfCartItems ? numOfCartItems : ''}
                    </span>

                  </div>











                </Link>

              </li> : ''}



            </ul>

            </>


            {myToken != null ? <> <li className="nav-item ms-3">
              <span onClick={logout} role='button' className='mt-1 nav-link  btn btn-login  d-flex align-items-center justify-content-center'> <i class="fa-solid fa-arrow-right-from-bracket me-2"></i> Logout</span>
            </li></> : <>  <li className="ms-2 nav-item">


              <Link

                className="nav-link btn btn-login  d-flex align-items-center justify-content-center" to="/login">
                <i className="fa-solid fa-arrow-right-to-bracket me-2"></i> Login
              </Link>
            </li>
            </>}






          </ul>
        </div>
      </div>
    </nav >

  </>


}
