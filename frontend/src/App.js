import { Route, Router, Navigate, Switch, Routes, Redirect } from 'react-router-dom';
import Layout from './components/Layout';
import Public from './components/Public';
import Login from './features/auth/Login';
import Welcome from './features/auth/Welcome';
import DashLayout from './components/DashLayout';
import Menu from './features/menu/Menu';
import About from './features/about/About';
import Gallery from './features/gallery/Gallery';
import Contact from './features/contact/Contact';
import Register from './features/auth/Register';
import Cart from './features/cart/Cart';
import ProductPage from './features/menu/ProductPage';
import Success from './features/auth/Success';
import Pay from './features/payment/Pay';
import { useSelector } from 'react-redux';
import React from 'react';
// import Users from './features/user/User';


function App() {
  const user = useSelector((state) => state.user.currentUser);
  return (
      <Routes>
        <Route exact path="/" element={<DashLayout/>}>
          <Route index element={<Welcome />}/>
          <Route path="menu/:category" element={<Menu />}/>
          <Route path="product/:id" element={<ProductPage />}/>
          <Route path="about" element={<About />}/>
          <Route path="gallery" element={<Gallery />}/>
          <Route path="contact" element={<Contact />}/>
          <Route path="cart" element={<Cart />}/>
          <Route path="payment" element={<Pay />}/>
          <Route path="success" element={<Success />}/>
          <Route path="/login" element={<Login />}>
            {user ? Navigate("/") : <Route path="/login" element={<Login />}/>}
          </Route>
          <Route path="/register" element={<Register />}>
            {user ? Navigate("/") : <Route path="/register" element={<Register />} />}
          </Route>
        </Route>
      </Routes>
  )
}
export default App;
