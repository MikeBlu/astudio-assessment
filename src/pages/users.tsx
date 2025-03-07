import React, { useState } from 'react';
import { ArrowIcon } from '../static/down_arrow';
// import axios from 'axios';

const fancyButtonStyle = "cursor-pointer inline-flex items-center justify-between bg-transparent focus:ring-2 focus:outline-none focus:ring-grey rounded-lg px-2";

enum SortType {
  ascending = 0,
  descending = 1
}

function Users() {
  const [pageSize] = useState(5);
  const [filter,setFilter] = useState(["",SortType.ascending]);

  return (
    <div className='flex flex-col mt-6 w-full'>
      <div className='flex mb-6 w-full max-w-6/10 gap-5'>
        <div className='flex items-center justify-between text-center'>
          <button id="pageLenButton" data-dropdown-toggle="pageLen" className={fancyButtonStyle} type="button">
            <span className='text-center align-middle'>{pageSize}</span>
            <ArrowIcon className="w-1.5 h-1.5 ms-3"/>
          </button>
          <div className='inline-flex items-center ms-2'>
            <span className='cursor-default text-center align-middle mt-0.5'>Entries</span>
          </div>
        </div>
        <div className='text-center inline-flex items-center border-x-3 border-grey'>
          <svg className="cursor-pointer w-5.5 h-5.5 mx-5 m-auto stroke-black" viewBox="0 0 22 22" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg">
            <circle fill="none" stroke-miterlimit="10" stroke-width="1.91px" cx="9.14" cy="9.14" r="7.64"/>
            <line fill="none" stroke-miterlimit="10" stroke-width="1.91px" x1="20.5" y1="20.5" x2="14.39" y2="14.39"/>
          </svg>
        </div>
        <div className='flex items-center justify-between text-center'>
            <button data-dropdown-toggle="pageLen" className={fancyButtonStyle} type="button">
              <span className='text-center align-middle'>Name</span>
              <ArrowIcon className="w-1.5 h-1.5 ms-2"/>
            </button>
            <button data-dropdown-toggle="pageLen" className={fancyButtonStyle} type="button">
              <span className='text-center align-middle'>Email</span>
              <ArrowIcon className="w-1.5 h-1.5 ms-2"/>
            </button>
            <button data-dropdown-toggle="pageLen" className={fancyButtonStyle} type="button">
              <span className='text-center align-middle'>Birth Date</span>
              <ArrowIcon className="w-1.5 h-1.5 ms-2"/>
            </button>
            <button data-dropdown-toggle="pageLen" className={fancyButtonStyle} type="button">
              <span className='text-center align-middle'>Gender</span>
              <ArrowIcon className="w-1.5 h-1.5 ms-2"/>
            </button>
        </div>
      </div>
    <table className='table-auto mb-6 border-collapse border-2 border-grey'>
      <thead className='content-center bg-blue'>
        <tr className='text-center [&>th]:border-2 [&>th]:border-grey [&>th]:py-2'>
            <th>FIRST NAME</th>
            <th>LAST NAME</th>
            <th>MAIDEN NAME</th>
            <th>AGE</th>
            <th>GENDER</th>
            <th>EMAIL</th>
            <th>USERNAME</th>
            <th>BLOODGROUP</th>
            <th>EYECOLOR</th>
        </tr>
      </thead>
      <tbody className='content-center'>
        <tr className='text-center [&>td]:border-2 [&>td]:border-grey [&>td]:py-2 hover:bg-grey'>
            <td>TEST DATA</td>
            <td>TEST DATA</td>
            <td>TEST DATA</td>
            <td>TEST DATA</td>
            <td>TEST DATA</td>
            <td>TEST DATA</td>
            <td>TEST DATA</td>
            <td>TEST DATA</td>
            <td>TEST DATA</td>
        </tr>
      </tbody>
    </table>
    </div>
  );
}

export default Users;