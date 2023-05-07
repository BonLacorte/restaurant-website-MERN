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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
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

        </Route>{/* End Dash */}
      </Route>
    </Routes>
  );
}

export default App;
