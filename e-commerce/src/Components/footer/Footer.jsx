// import React from 'react'
// import '../footer/footer.css'

// export default function Footer() {
//   return (
//     <footer class="footer-section">
//       <div class="container">
//         <div class="col-12">
//           <h2 class="app-title">Get the FreshCart app</h2>
//           <p class="app-subtitle">We'll send you a link, open it on your phone to download the app.</p>


//           <div class="input-group mb-3">
//             <input type="email" class="form-control" placeholder="Email" />
//             <button class="btn share-btn" type="button">Share App Link</button>
//           </div>

//           <div class="divider"></div>

//           <div class="partners-section">

//             <div class="payment-logos ">
//               <h3 class="partners-title  ">Payment Partners:</h3>

//               <img src="https://www.shutterstock.com/shutterstock/photos/2270561027/display_1500/stock-vector-amazon-logo-icon-logo-sign-art-design-symbol-famous-industry-jeff-bezos-corporate-text-isolated-2270561027.jpg" alt="Amazon Pay" />
//               <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/320px-American_Express_logo_%282018%29.svg.png" alt="American Express" />
//               <img src="https://brand.mastercard.com/content/dam/mccom/brandcenter/thumbnails/mastercard_vrt_pos_92px_2x.png" alt="Mastercard" />
//               <img src="https://www.paypalobjects.com/digitalassets/c/website/marketing/apac/C2/logos-buttons/optimize/44_Grey_PayPal_Pill_Button.png" alt="PayPal" />
//             </div>
//           </div>

//           <div class="app-links">
//             <div class="row align-items-center">
//               <div class="col-lg-4 col-md-5">
//                 <h3>Get Deliveries with FreshCart</h3>
//               </div>

//               <div class="col-lg-8 col-md-7 store-buttons">

//                 <img src="https://developer.apple.com/app-store/marketing/guidelines/images/badge-download-on-the-app-store.svg" alt="App Store" />


//                 <img style={{ height: '90px' }} src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" alt="Google Play" />

//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>

//   )
// }
















import React from 'react'
import '../footer/footer.css'

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="col-12">
          <h2 className="app-title">Get the FreshCart app</h2>
          <p className="app-subtitle">We'll send you a link, open it on your phone to download the app.</p>

          <div className="input-group mb-3">
            <input type="email" className="form-control" placeholder="Email" />
            <button className="btn share-btn" type="button">Share App Link</button>
          </div>

          <div className="divider"></div>

          <div className="partners-section">
            <div className="payment-logos d-flex align-items-center">
              <h3 className="partners-title me-3 mb-0">Payment Partners:</h3>
              <div>
                <img src="https://www.shutterstock.com/shutterstock/photos/2270561027/display_1500/stock-vector-amazon-logo-icon-logo-sign-art-design-symbol-famous-industry-jeff-bezos-corporate-text-isolated-2270561027.jpg" alt="Amazon Pay" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/320px-American_Express_logo_%282018%29.svg.png" alt="American Express" />
                <img src="https://brand.mastercard.com/content/dam/mccom/brandcenter/thumbnails/mastercard_vrt_pos_92px_2x.png" alt="Mastercard" />
                <img src="https://www.paypalobjects.com/digitalassets/c/website/marketing/apac/C2/logos-buttons/optimize/44_Grey_PayPal_Pill_Button.png" alt="PayPal" />
              </div>
            </div>
          </div>

          <div className="app-links">
            <div className="row align-items-center">
              <div style={{ width: '290px' }} className="col-lg-4   col-md-5">
                <h3>Get Deliveries with FreshCart</h3>
              </div>

              <div className="col-lg-8 col-md-7   store-buttons">
                <img src="https://developer.apple.com/app-store/marketing/guidelines/images/badge-download-on-the-app-store.svg" alt="App Store" />
                <img style={{ height: '80px' }} src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" alt="Google Play" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
