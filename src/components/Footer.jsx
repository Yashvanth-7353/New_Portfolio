import React from 'react'
import { FOOTER_CONTENT, PERSONAL_INFO } from '../constants'

export default function Footer() {
  return (
    <div className='bg-black px-5 lg:px-28 py-3 lg:py-6 flex items-center justify-between mt-16'>
      <p
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          })
        }
        className='text-white cursor-pointer hover:text-gray-300 transition'
      >
        {PERSONAL_INFO.brand}
      </p>

      <div className='text-white lg:font-semibold lg:text-sm font-normal text-[10px] text-right lg:space-y-3'>
        <p>{FOOTER_CONTENT.copyright}</p>
        <p>{FOOTER_CONTENT.madeBy}</p>
      </div>
    </div>
  )
}
