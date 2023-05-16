import { Routes, Route } from 'react-router-dom';
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
import Admin from './Admin/Admin';
import AdminDashLayout from './Admin/components/AdminDashLayout';
import AdminDash from './Admin/features/auth/AdminDash';
import AdminRegister from './Admin/features/auth/AdminRegister';
import AdminLogin from './Admin/features/auth/AdminLogin';
import AdminEditUser from './Admin/features/user/AdminEditUser';
import AdminNewUserForm from './Admin/features/user/AdminNewUserForm';
import AdminPrefetch from './Admin/features/auth/AdminPrefetch';
import Prefetch from './features/auth/Prefetch';
import AdminOrdersLists from './Admin/features/orders/AdminOrdersLists';
import AdminEditOrder from './Admin/features/orders/AdminEditOrder';
import AdminNewOrderForm from './Admin/features/orders/AdminNewOrderForm';
import AdminUsersLists from './Admin/features/user/AdminUsersLists';
import Users from './features/user/User';
// import AdminEditProduct from './Admin/features/products/AdminEditProduct';
import AdminNewProductForm from './Admin/features/products/AdminNewProductForm';
import AdminProductsLists from './Admin/features/products/AdminProductsLists';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Public />} />
        {/* <Route index element={<LandingPage />} /> */}
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route element={<Prefetch />}> 
          <Route path="dash" element={<DashLayout />}>

            <Route index element={<Welcome />} />

            <Route path="menu">
              <Route index element={<Menu />} />
            </Route>

            <Route path="about">
              <Route index element={<About />} />
            </Route>

            <Route path="gallery">
              <Route index element={<Gallery />} />
            </Route>

            <Route path="contact">
              <Route index element={<Contact />} />
            </Route>

            <Route path="cart">
              <Route index element={<Cart />} />
            </Route>

            <Route path="users">
              <Route index element={<Users />} />
            </Route>

          </Route>{/* End Dash */}
        </Route>{/* End Prefetch */}
      </Route>
      <Route path="admin" element={<Layout/>}>
        <Route index element={<Admin />} />
        <Route path="register" element={<AdminRegister />} />
        <Route path="login" element={<AdminLogin />} />

        <Route element={<AdminPrefetch />}> 
          <Route path="dash" element={<AdminDashLayout/>}>
          
            <Route index element={<AdminDash />} />

            <Route path="products"> 
              <Route index element={<AdminProductsLists />} />
              {/* <Route path=":id" element={<AdminEditProduct />}/> */}
              <Route path="new" element={<AdminNewProductForm />}/>
            </Route>

            <Route path="orders"> 
              <Route index element={<AdminOrdersLists />} />
              <Route path=":id" element={<AdminEditOrder />}/>
              <Route path="new" element={<AdminNewOrderForm />}/>
            </Route>

            <Route path="users"> 
              <Route index element={<AdminUsersLists />} />
              <Route path=":id" element={<AdminEditUser />}/>
              <Route path="new" element={<AdminNewUserForm />}/>
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
