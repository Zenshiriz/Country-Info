import React from 'react'
import spinner from "../spinner.svg"
export default function Spinner() {
  return (
    <div className='h-full absolute top-0 w-full z-50 flex items-center justify-center bg-[rgba(0,0,0,.3)]'>
      <img src={spinner} alt=""  className='h-20 '/>
    </div>
  )
}
