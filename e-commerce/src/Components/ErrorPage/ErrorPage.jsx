import React, { useEffect, useRef } from 'react'
import '../ErrorPage/error.css'
import { Link } from 'react-router-dom'
import Lottie from 'lottie-web'

export default function ErrorPage() {
  // Create a ref to store the animation container
  const lottieContainer = useRef(null);
  // Create a ref to store the animation instance
  const animationInstance = useRef(null);

  useEffect(() => {
    // Initialize the animation when the component mounts
    if (lottieContainer.current) {
      animationInstance.current = Lottie.loadAnimation({
        container: lottieContainer.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'https://lottie.host/d987597c-7676-4424-8817-7fca6dc1a33e/BVrFXsaeui.json'
      });
    }

    // Clean up the animation when the component unmounts
    return () => {
      if (animationInstance.current) {
        animationInstance.current.destroy();
      }
    };
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="error-container mt-3">
      {/* Use the ref to reference this element */}
      <div className="lottie-animation m-0 p-0" ref={lottieContainer} />

      <div className="error-content m-0 p-0">
        <h1 className='m-0 p-0'>404</h1>
        <p>Oops! The page you're looking for doesn't exist.</p>
        <Link to="/products" className="btn-err btn text-white">
          Go Home
        </Link>
      </div>
    </div>
  );
}
