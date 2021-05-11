import './App.css';
// import './mycss.css';
import React from 'react';
import {BrowserRouter, Link,Route} from'react-router-dom';
import HomeScreen from './screens/HomeScreen'
import ProductsScreen from './screens/ProductsScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import {useSelector,useDispatch} from 'react-redux';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import {signout} from './Actions'
import ProfileScreen from './screens/ProfileScreen';
import OrderScreen from './screens/OrderScreen';
import OrdersScreen from './screens/OrdersScreen';

function  App(props){
  const userSignin = useSelector(state=>state.userSignin)
  const {userInfo} = userSignin;

  // const userSignout = useSelector(state=>state.userSignout)
  // const {log} = userSignout; 
  
  const openMenu = () =>{
    document.querySelector(".sidebar").classList.add("open")
  }
  const closeMenu = ()=> {
    document.querySelector(".sidebar").classList.remove("open")
  }
  const dispatch = useDispatch()

  const handleLogout = () =>{
    dispatch(signout())
    // props.history.push('/signin');
  }
    return(
    <BrowserRouter>
    <div>
    <div>
    <section class="menu menu1 cid-skRQMSCRF3" once="menu" id="menu1-0">
    

    <nav class="navbar navbar-dropdown navbar-fixed-top navbar-expand-lg">
        <div class="container">
            <div class="navbar-brand">
                <span class="navbar-caption-wrap">
                {/* <button  onClick={openMenu}>
                  &#9776;
              </button> */}
              <a><Link class="navbar-caption text-black display-7" id="font" to="/">Shoppy</Link></a></span>
            </div>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <div class="hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav nav-dropdown nav-right" data-app-modern-menu="true">
                    <li class="nav-item"><Link class="nav-link link text-black display-4 font2" to="cart">
                            Cart</Link></li>
                    {userInfo && userInfo.isAdmin && (<div class="navbar-nav nav-dropdown nav-right" data-app-modern-menu="true">
                    
                      <li class="nav-item"><Link class="nav-link link text-black display-4 font2" to="/products">
                      Products</Link></li></div>
                      )}
                    {userInfo ? ( <div class="navbar-nav nav-dropdown nav-right" data-app-modern-menu="true">
                    <li class="nav-item"><Link class="nav-link link text-black display-4 font2" to="/profile">
                            {userInfo.name}</Link></li>
                    <li class="nav-item"><Link class="nav-link link text-black display-4 font2" to="/orders">
                      Orders</Link></li>
                    <li class="nav-item"><Link class="nav-link link text-black display-4 font2" to="/" onClick={handleLogout}>Logout</Link>
                    </li>
                    </div>
                    ) : (
                      <li class="nav-item"><Link class="nav-link link text-black display-4 font2" to="/signin">
                            Sign In</Link></li>
                    )}
                    
                </ul>
                
                
            </div>
        </div>
    </nav>
    {/* <aside className="sidebar"><br/><br/><br/><br/>
          <h3>Shopping Categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>x</button>
          <ul>
              <li>
                  <Link to ="index.html">Pants</Link> 
              </li>
              <li>
                <Link to ="index.html">Shirts</Link> 
            </li>
          </ul>
      </aside> */}
</section>
</div><br/>
<main className="main" id="hh2">
        <div className="content">
        <Route path="/products" component={ProductsScreen} />
        <Route path="/signin" component={SigninScreen} />
        <Route path="/profile" component={ProfileScreen} />
        <Route path="/order/:id" component={OrderScreen}/>
        <Route path="/orders" component={OrdersScreen}/>
        <Route path="/shipping" component={ShippingScreen} />
        <Route path="/payment" component={PaymentScreen} />
        <Route path="/placeorder" component={PlaceOrderScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/product/:id" component={ProductScreen} />
        <Route path="/cart/:id?" component={CartScreen} />
        <Route path="/category/:id" component={HomeScreen} />
        <Route exact={true} path="/" component={HomeScreen} />
        </div>
      </main><br/><br/>
      <div id="footer">
<section class="footer3 cid-skRSeMCY4p" once="footers" id="footer3-5">
<div class="container">
        <div class="media-container-row align-center mbr-white">
            <div class="row row-links">
                
            </div>
            <div class="row social-row">
                <div class="social-list align-right pb-2">
         <div class="soc-item">
                        <a href="https://twitter.com/mobirise" target="_blank">
                            <span class="socicon-twitter socicon mbr-iconfont mbr-iconfont-social"></span>
                        </a>
                    </div><div class="soc-item">
                        <a href="https://www.facebook.com/pages/Mobirise/1616226671953247" target="_blank">
                            <span class="socicon-facebook socicon mbr-iconfont mbr-iconfont-social"></span>
                        </a>
                    </div><div class="soc-item">
                        <a href="https://www.youtube.com/c/mobirise" target="_blank">
                            <span class="socicon-youtube socicon mbr-iconfont mbr-iconfont-social"></span>
                        </a>
                    </div><div class="soc-item">
                        <a href="https://instagram.com/mobirise" target="_blank">
                            <span class="socicon-instagram socicon mbr-iconfont mbr-iconfont-social"></span>
                        </a>
                    </div><div class="soc-item">
                        <a href="https://plus.google.com/u/0/+Mobirise" target="_blank">
                            <span class="socicon-googleplus socicon mbr-iconfont mbr-iconfont-social"></span>
                        </a>
                    </div><div class="soc-item">
                        <a href="https://www.behance.net/Mobirise" target="_blank">
                            <span class="socicon-behance socicon mbr-iconfont mbr-iconfont-social"></span>
                        </a>
                    </div></div>
            </div>
            <div class="row row-copirayt">
                <p class="mbr-text mb-0 mbr-fonts-style mbr-white align-center display-7">
                    © Copyright 2025 Mobirise. All Rights Reserved.
                </p>
            </div>
        </div>
    </div>
</section>   
    </div>


  {/* <div className="grid-container">
      <header className="header">
          <div className="brand">
              <button  onClick={openMenu}>
                  &#9776;
              </button>
              <Link to="/">E-Commerce</Link>
          </div>
          <div className="header-links">
              <Link to="cart">Cart</Link>
              {userInfo ? ( <div>
              <Link to="/profile">{userInfo.name}</Link>
              <button type="button" onClick={handleLogout}>Logout</button>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <a href="#">Admin</a>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/orders">Orders</Link>
                    <Link to="/products">Products</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
      </header> */}
      
      {/* <div className="w3-container" id="bb">
      <div className="w3-bar w3-light-grey">
        <Link to="ggethnic.html" className="w3-bar-item w3-button">Ethnic</Link>
        <Link to="ggwestern.html" className="w3-bar-item w3-button">Western</Link>
        <Link to="ggcasual.html" className="w3-bar-item w3-button">Offline Stores</Link>
      </div>
    </div> */}
      
      {/* <footer className="footer">
          All right reserved.
      </footer>
  </div> */}
 </div>
  </BrowserRouter>
    );
}

export default App;
