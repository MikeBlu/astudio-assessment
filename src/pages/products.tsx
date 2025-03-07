import React, { useEffect, useState } from 'react';
import { DownArrowIcon, UpArrowIcon } from '../static/arrows';
import { toTitleCase } from '../static/util';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {set} from "../app/recordCount";
import { useSelector } from 'react-redux';

const fancyButtonStyle = "cursor-pointer inline-flex items-center justify-between bg-transparent focus:ring-2 focus:outline-none focus:ring-grey rounded-lg px-2";

enum SortType {
  ascending = "asc",
  descending = "desc"
}

function Products() {

  let dispatch = useDispatch();

  const pageSize = useSelector((state: { recordCount: { value: number } }) => state.recordCount.value);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState(["",""]);
  const [data,setData] = useState({"products": []});
  const [searchTerm, setSearchTerm] = useState("*");

  useEffect(() => {
    var query = `?limit=${pageSize}&skip=${pageSize*(currentPage-1)}`;
    query += (filter[0] !== "")?(`&sortBy=${filter[0]}`):("");
    query += (filter[1] !== "")?(`&order=${filter[1]}`):("");

    const getProducts = async () => {
      axios.get(`https://dummyjson.com/products/${query}`)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => console.log("ERROR fetching product data",err));
    };

    getProducts();
  }, [pageSize, currentPage, filter]);

  const initRows = () => {
    var rows = [];
    if ('products' in data) {
      if (data.products.length === 0) {
        return (
          <tr>
            <td>
              <h3 className='m-30 place-self-center text-center text-grey'>END OF THE DATA REACHED</h3>
            </td>
          </tr>
        )
      }
      for (var product of data.products) {
        if (searchTerm !== "*" && !matchesRow(product, searchTerm)) continue;
         rows.push(
          <tr key={product['id']} className='[&>td]:border-2 [&>td]:border-grey [&>td]:py-2 [&>td]:px-3 content-center hover:bg-grey'>
            <td>{product['title']}</td>
            <td>{product['description']}</td>
            <td>{product['category'] || "N/A"}</td>
            <td>{product['price']}</td>
            <td>{product['discountPercentage']+"%"}</td>
            <td>{product['rating']}</td>
            <td>{product['stock']}</td>
            <td>{product['brand']}</td>
            <td>{product['sku']}</td>
            <td>{product['weight']}</td>
            <td>{product['warrantyInformation']}</td>
            <td>{product['availabilityStatus']}</td>
          </tr>
        )
      }
    }
    return rows;
  };

  const toggleDropDown = (id : string, val: string = "") => {
    if (!val) document.getElementById(id)?.classList.toggle('hidden');
    else if (val === "hide") document.getElementById(id)?.classList.add('hidden');
    else if (val === "show") document.getElementById(id)?.classList.remove('hidden');
  }

  const toggleFilter = (attr: string) => {
    if (filter[0] === attr) {
      setFilter([attr, (filter[1] === SortType.ascending)?SortType.descending:SortType.ascending]);
    } else {
      setFilter([attr, SortType.ascending]);
    }
  }

  const matchesRow = (row: any, term: string) => {
    const keysToCheck = ['title', 'description', 'category', 'price', 'discountPercentage', 'rating', 'stock', 'brand', 'sku', 'weight', 'warrantyInformation', 'availabilityStatus'];

    for (let key of keysToCheck) {
      if (row[key]) {
        row[key] = row[key].toString();
        if (row[key].toLowerCase().includes(term.toLowerCase())) return true;
      }
    }
    return false
  }

  return (
    <div className='flex flex-col mt-6 w-full'>
      <div className='flex relative mb-6 w-full max-w-6/10 gap-5'>
        <div className='flex items-center justify-between text-center'>
          <button id="pageLenButton" className={fancyButtonStyle} type="button" onClick={() => toggleDropDown("sizeOptions")}>
            <span className='text-center align-middle'>{pageSize}</span>
            <DownArrowIcon className="w-1.5 h-1.5 ms-3"/>
          </button>
          <div className='inline-flex items-center ms-2'>
            <span className='cursor-default text-center align-middle mt-0.5'>Entries</span>
          </div>
        </div>
        <div id="sizeOptions" className='z-1 block absolute left-0 top-10 w-10 border-2 border-black rounded bg-white hidden'>
          {(() => {
            const sizeOptions = [];
            const sizes = [5, 10, 20, 50];
            for (const size of sizes) {
              sizeOptions.push(
                <div key={size} className='hoverButton cursor-pointer p-2 w-1/1 hover:bg-grey' onClick={() => {dispatch(set(size)); toggleDropDown("sizeOptions");}}>
                  <span className='text-center align-middle'>{size}</span>
                </div>
              );
            }
            return sizeOptions;
          })()}
        </div>
        <div className='relative text-center inline-flex items-center border-x-3 border-grey'>
          <svg className="cursor-pointer w-5.5 h-5.5 mx-5 m-auto stroke-black" viewBox="0 0 22 22" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"
          onClick={() => toggleDropDown("searchBar")}>
            <circle fill="none" strokeMiterlimit="10" strokeWidth="1.91px" cx="9.14" cy="9.14" r="7.64"/>
            <line fill="none" strokeMiterlimit="10" strokeWidth="1.91px" x1="20.5" y1="20.5" x2="14.39" y2="14.39"/>
          </svg>
          <div id="searchBar" className='z-1 block absolute left-0 top-10 w-3/1 border-2 border-black rounded bg-white hidden'>
            <div className='hoverButton p-2 w-1/1'>
              <textarea className='text-center align-middle resize-none px-0.5' maxLength={35} onInput={(e) => setSearchTerm(e.currentTarget.value)}></textarea>
            </div>
          </div>
        </div>
        <div className='flex items-center justify-between text-center'>
          {(() => {
            const attrs = [["Title","title"], ["Category","category"],["Price","price"],["Weight","weight"]];
            const filterButtons = [];

            for (let attr of attrs) {
              filterButtons.push(
                <button key={attr[1]} data-dropdown-toggle="pageLen" className={"filterButton "+fancyButtonStyle} type="button" 
                onClick={() => toggleFilter(attr[1])}>
                  <span className='text-center align-middle'>{toTitleCase(attr[0])}</span>
                  <DownArrowIcon className={`w-1.5 h-1.5 ms-2 ${(filter[0] === attr[1] && filter[1] === SortType.descending)?"":"hidden"}`}/>
                  <UpArrowIcon className={`w-1.5 h-1.5 ms-2 ${(filter[0] === attr[1] && filter[1] === SortType.ascending)?"":"hidden"}`}/>
                </button>
              );
            }
            return filterButtons;
          })()}
        </div>
      </div>
    <table className='table-auto mb-6 border-collapse border-2 border-grey'>
      <thead className='content-center bg-blue'>
        <tr className='text-center [&>th]:border-2 [&>th]:border-grey [&>th]:py-2'>
            <th>TITLE</th>
            <th>DESCRIPTION</th>
            <th>CATEGORY</th>
            <th>PRICE</th>
            <th>DISCOUNT</th>
            <th>RATING</th>
            <th>STOCK</th>
            <th>BRAND</th>
            <th>SKU</th>
            <th>WEIGHT</th>
            <th>WARRANTY</th>
            <th>AVAILABILITY</th>
        </tr>
      </thead>
      <tbody className='relative content-center'>
        {initRows()}
      </tbody>
    </table>
    <div className='flex h-5 justify-center text-center'>
      <div className="flex h-full w-1/3 justify-between items-center">
        <svg width="16px" height="16px" viewBox="0 0 24 24" data-name="Flat Line" xmlns="http://www.w3.org/2000/svg" className="cursor-pointer icon flat-line fill-black"
        onClick={() => setCurrentPage(Math.max(currentPage-1,1))}>
          <line id="primary" x1="21" y1="12" x2="3" y2="12" fill="none" stroke="rgb(0, 0, 0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}></line>
          <polyline id="primary-2" data-name="primary" points="6 9 3 12 6 15" fill="none" stroke="rgb(0, 0, 0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}></polyline>
        </svg>
        {(() => {
        const pageOptions = [];
        const pages = 8;
        for (let i = 1; i <= pages; i++) {
          pageOptions.push(<span key={i} className={`cursor-pointer align-middle items-center ${i === currentPage?'mb-3 font-bold':""} text-center`} onClick={(function(page) { return () => setCurrentPage(page); })(i)}>{i}</span>);
        }
        return pageOptions;
        })()}
        <svg width="16px" height="16px" viewBox="0 0 24 24" data-name="Flat Line" xmlns="http://www.w3.org/2000/svg" className="cursor-pointer icon flat-line fill-black" 
        onClick={() => setCurrentPage(Math.min(currentPage+1,8))}>
          <line id="primary" x1="21" y1="12" x2="3" y2="12" fill="none" stroke="rgb(0, 0, 0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}></line>
          <polyline id="primary-2" data-name="primary" points="18 9 21 12 18 15" fill="none" stroke="rgb(0, 0, 0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}></polyline>
        </svg>
      </div>
    </div>
    </div>
  );
}

export default Products;