import React from 'react';

export default function SearchInput({ handleChange, search, handleClick }) {
  return (
    <div className='w-full flex overflow-hidden rounded-l-full rounded-r-full shadow-md ring-2 ring-purple-800 bg-purple-800 items-center'>
      <input
        onChange={handleChange}
        className='border-none flex-1 text-sm sm:text-xl'
        type='search'
        name='search'
        value={search}
        placeholder='City. e.g. Auckland'
      />
      <button
        className='bg-purple-800 text-white sm:text-xl h-full px-4 text-sm'
        onClick={handleClick}
      >
        Search
      </button>
    </div>
  );
}
