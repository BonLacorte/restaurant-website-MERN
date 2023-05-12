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
import UsersList from './features/user/UsersLists';
import Admin from './Admin/Admin';
import AdminDashLayout from './Admin/components/AdminDashLayout';
import AdminDash from './Admin/features/auth/AdminDash';
import AdminMenu from './Admin/features/menu/AdminMenu';
import AdminRegister from './Admin/features/auth/AdminRegister';
import AdminLogin from './Admin/features/auth/AdminLogin';
import AdminEditUser from './Admin/features/user/AdminEditUser';
import AdminNewUserForm from './Admin/features/user/AdminNewUserForm';
import AdminPrefetch from './Admin/features/auth/AdminPrefetch';
import Prefetch from './features/auth/Prefetch';
import AdminOrdersLists from './Admin/features/orders/AdminOrdersLists';
import AdminEditOrder from './Admin/features/orders/AdminEditOrder';
import AdminNewOrderForm from './Admin/features/orders/AdminNewOrderForm';
import AdminUsersList from './Admin/features/user/AdminUsersLists';

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
              <Route index element={<UsersList />} />
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

            <Route path="menu"> 
              <Route index element={<AdminMenu />} />
            </Route>

            <Route path="orders"> 
              <Route index element={<AdminOrdersLists />} />
              <Route path=":id" element={<AdminEditOrder />}/>
              <Route path="new" element={<AdminNewOrderForm />}/>
            </Route>

            <Route path="users"> 
              <Route index element={<AdminUsersList />} />
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
