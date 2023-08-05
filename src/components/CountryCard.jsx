import React from 'react'
import { Link } from 'react-router-dom';

export default function CountryCard(props) {
    const {darkMode} = props;
    const formattedPopulation = props.population.toLocaleString();

  return (
    <Link to={props.name}>
    <div className={`${
        darkMode
          ? " bg-slate-950 text-gray-50"
          : "bg-slate-200 text-gray-900"
      } max-w-[320px] lg:max-w-[420px]  rounded-md overflow-hidden shadow-md hover:shadow-xl cursor-pointer `}>
      <img className=' w-full aspect-video' src={props.img} alt="" />
      <div className=' pl-4 py-2'>
        <p className=' font-semibold text-lg mr-3 truncate'>{props.name}</p>
        <p className=' font-semibold '>Population : <span className=' font-normal'>{formattedPopulation}</span></p>
        <p className=' font-semibold '>Region : <span className=' font-normal'>{props.region}</span></p>
        <p className=' font-semibold '>Capital : <span className=' font-normal'>{props.capital}</span></p>
      </div>
    </div>
    </Link>
  )
}
