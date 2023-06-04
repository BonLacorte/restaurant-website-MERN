import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";
import Product from './Product'
import axios from "axios";
import { popularProducts } from '../../data'

// import { useSelector } from 'react-redux'
// import { selectProductById } from './productsApiSlice'

const Products = ({category, sort }) => {

  const [products, setProducts] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          category 
          ? `http://localhost:3500/products?category=${category}`
          : "http://localhost:3500/products" 
        );
        console.log('hello',res)
        setProducts(res.data);
      } catch (err) {
        console.log(err)
      }
    };
    getProducts();
  }, [category]);

  useEffect(() => {
    if (category) { 
    setCategoryProducts(
        products.filter((item) =>
          item.category === category
        )
      );
    }
  }, [products, category]);

  useEffect(() => {
    if (sort === "newest") {
      setCategoryProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setCategoryProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setCategoryProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  useEffect(() => {
    console.log(categoryProducts);
  }, [categoryProducts]);

  return (
        <div className='flex flex-wrap justify-between p-5'>
          {category
            ? categoryProducts.map((item) => 
            <Product item={item} key={item.id} />)
            : products
            .slice(0, 8)
            .map((item) => <Product item={item} key={item.id} />)
          }
        </div>
  )
} 

export default Products