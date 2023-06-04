import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Products from './Products';
import { useLocation } from "react-router";

const Menu = () => {
  const location = useLocation();
  const category = location.pathname.split("/")[2];
  const [sort, setSort] = useState("newest");

  // console.log(category);
  return (
    <div>
      <div id='container' className='mx-auto w-3/5'>
        <div id='filter-container' className='flex justify-between'>
          <div id='filter' className='m-20 sm:w-[0px_20px] flex flex-col'>
            <label id='filter-text' className='text-lg font-semibold'>{category}</label>
          </div>
          <div id='filter' className='m-20 sm:w-[0px_20px] flex flex-col'>
            <label id='filter-text' className='text-lg font-semibold'>Sort Products:</label>
            <select defaultValue={'All'} className='mr-5 p-2.5 border sm:mr-0 sm:my-4' onChange={(e) => setSort(e.target.value)}>
              <option value='Newest'>Newest</option>
              <option value='Price (asc)'>Price (asc)</option>
              <option value='Price (desc)'>Price (desc)</option>
            </select>
          </div>
        </div>
        <Products category={category} sort={sort} />
      </div>
    </div>
  );
};

export default Menu;
