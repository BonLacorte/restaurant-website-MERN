// import { Badge } from "@material-ui/core";
// import { Badge} from 'reactstrap'
import { Badge } from 'antd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartShopping } from "@fortawesome/free-solid-svg-icons"
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";

const DashHeader = () => {
  const categories = ['Burger', 'Pasta', 'Hungarian', 'FriesAndNacho', 'RiceMeals'];
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const quantity = useSelector(state => state.cart.quantity)

  const handleDropdownOpen = () => {
    setIsDropdownOpen(true);
  };

  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
  };

  const renderCategories = () => {
    return categories.map((category, index) => (
      <Link key={index} to={`/menu/${category.replace(' ', '-')}`}>
        <p className="dropdown-item">{category}</p>
      </Link>
    ));
  };

  const content = (
    <header className="mx-auto w-3/5">
      <div>
        <div className="w-full container mx-auto flex items-center justify-between mt-0 py-2">
          <div className="pl-4 flex items-center">
            <Link to="/">
              <h1 className="text-3xl font-serif text-red-700">Costa's</h1>
            </Link>
          </div>
          <div className="nav-menu-wrapper flex flex-row space-x-20">
            <div className="nav-menu-wrapper  flex flex-row space-x-4 relative">
              <div
                className="relative"
                onMouseEnter={handleDropdownOpen}
                onMouseLeave={handleDropdownClose}
              >
                <p className="menu-link">Menu</p>
                <div
                  className={`absolute top-full left-0 w-full bg-white shadow-lg rounded-md py-2 transition-opacity duration-300 ${
                    isDropdownOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  {renderCategories()}
                </div>
              </div>
              <p className="menu-link">
                <Link to="/about">About</Link>
              </p>
              <p className="menu-link">
                <Link to="/gallery">Gallery</Link>
              </p>
              <p className="menu-link">
                <Link to="/contact">Contact</Link>
              </p>
                {/* <img alt="cart"> */}
                    <Link to="/cart">
                        <Badge count={quantity} color="primary">
                            <FontAwesomeIcon icon={faCartShopping} />
                        </Badge>
                        
                    </Link>
                {/* </img> */}
              {/* <p className="menu-link">

                <Link to="/cart">Cart</Link>
              </p> */}
              <p className="menu-link">
                <Link to="/register">Register</Link>
              </p>
              <p className="menu-link">
                <Link to="/login">Login</Link>
              </p>
              <p className="menu-link">
                <Link to="/dash/users">User</Link>
              </p>
              <p className="menu-link">
                <Link to="/admin/dash">Admin</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );

  return content;
};

export default DashHeader;
