import React from 'react'
import { IoSearch } from 'react-icons/io5'

export default function Search() {
  return (
    <div className='searchBox position-relative d-flex align-items-center'>
        <IoSearch className='mr-2' />
         <input type='text' placeholder='Search here...' />
    </div>
  )
}
