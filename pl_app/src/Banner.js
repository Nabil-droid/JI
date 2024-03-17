import React from 'react';
import './Banner.css';
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <section className="banner">
      <div className="container">
        <div className="content">
          <h2> <span className='logo'>CONTROL</span> - Your Gateway to Optimal Control Solutions</h2>
          <p>
            <span className='logo'>CONTROL</span> revolutionizes control optimization by providing a user-friendly interface powered by
            <a href="https://julialang.org/" className="julia" style={{ textDecoration: 'none' }}>
              &nbsp;Julia.&nbsp;
            </a>
            Define, solve, and visualize control problems effortlessly. Experience the future of control engineering with  <span className='logo'>CONTROL</span>.
          </p>
          <div className="buttons">
            <Link
              to="/editor"
              className="get-started"
              style={{ textDecoration: 'none' }}
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
      <img src="assets/img/code.png" alt="..." />
      <div className="container">
  <div className="loader" style={{ top: '423px', left: '812px' }}>
    <div className="loader-cube">
      <div className="face" style={{ backgroundColor: '#cfe0eb' }}></div>
      <div className="face" style={{ backgroundColor: '#cfe0eb' }}></div>
      <div className="face" style={{ backgroundColor: '#cfe0eb' }}></div>
      <div className="face" style={{ backgroundColor: '#cfe0eb' }}></div>
      <div className="face" style={{ backgroundColor: '#cfe0eb' }}></div>
      <div className="face" style={{ backgroundColor: '#cfe0eb' }}></div>
    </div>
  </div>

  <div className="loader" style={{ top: '433px', left: '880px' }}>
    <div className="loader-cube">
      <div className="face" style={{ backgroundColor: '#1a3dae' }}></div>
      <div className="face" style={{ backgroundColor: '#1a3dae' }}></div>
      <div className="face" style={{ backgroundColor: '#1a3dae' }}></div>
      <div className="face" style={{ backgroundColor: '#1a3dae' }}></div>
      <div className="face" style={{ backgroundColor: '#1a3dae' }}></div>
      <div className="face" style={{ backgroundColor: '#1a3dae' }}></div>
    </div>
  </div>

  <div className="loader" style={{ top: '365px', left: '889px' }}>
    <div className="loader-cube">
      <div className="face" style={{ backgroundColor: 'rgb(171,225,226)' }}></div>
      <div className="face" style={{ backgroundColor: 'rgb(171,225,226)' }}></div>
      <div className="face" style={{ backgroundColor: 'rgb(171,225,226)' }}></div>
      <div className="face" style={{ backgroundColor: 'rgb(171,225,226)' }}></div>
      <div className="face" style={{ backgroundColor: 'rgb(171,225,226)' }}></div>
      <div className="face" style={{ backgroundColor: 'rgb(171,225,226)' }}></div>
    </div>
  </div>
</div>
    </section>
  );
}

export default Banner;
