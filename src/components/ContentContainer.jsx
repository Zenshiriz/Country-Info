import React, { useEffect, useRef, useState } from "react";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import CountryCard from "./CountryCard";
import Spinner from "./Spinner";

export default function ContentContainer(props) {
  const [Dropdown, setDropdown] = useState(false);
  const [CountryData, setCountryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { darkMode } = props;
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  const [regionQuery, setRegionQuery] = useState("");

  let filteredCountry;
  if (regionQuery) {
    filteredCountry = CountryData.filter((country) =>
      country.region.toLowerCase().includes(regionQuery.toLowerCase())
    );
  } else if (query) {
    filteredCountry = CountryData.filter((country) =>
      country.name.common.toLowerCase().includes(query.toLowerCase())
    );
  } else {
    filteredCountry = CountryData.filter((country) =>
      country.name.common.toLowerCase().includes(query.toLowerCase())
    );
  }

  function showDropdown() {
    setDropdown((prevState) => !prevState);
  }

  function filterByRegionFunc(e) {
    setRegionQuery(e);
    setDropdown((prevState) => !prevState);
  }

  function removeFilter() {
    setRegionQuery("");
  }

  useEffect(() => {
    setLoading(true);
    fetch(`https://restcountries.com/v3.1/all`)
      .then((res) => {
        if (!res.ok) {
          // Check for error response status and handle accordingly
          throw new Error("Failed to fetch data from the server");
        }
        return res.json();
      })
      .then((data) => {
        setCountryData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching data: " + err.message); // Set the error message
        setLoading(false);
      });
  }, []);
  const countryDataElement = Array.isArray(CountryData)
    ? filteredCountry.map((country) => (
        <CountryCard
          key={country.name.common}
          darkMode={darkMode}
          name={country.name.common}
          img={country.flags.png}
          population={country.population}
          region={country.region}
          capital={country.capital}
        />
      ))
    : null;

  // return <Spinner/>
  return (
    <>
      {error && <div className="text-red-500 text-center">{error}</div>}
      {loading && <Spinner />}
      <main
        className={` transition duration-150 ease-in-out min-h-[calc(100vh- 56px)] pt-6 ${
          darkMode ? " bg-gray-900" : " bg-slate-50"
        }`}
        style={{ minHeight: "calc(100vh - 108px)" }}
      >
        <div className="flex flex-col pl-12 md:px-8 lg:px-12 md:flex-row md:justify-between md:items-center">
          <div className=" relative  w-11/12 md:w-1/2 ">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={` p-2 py-3 pl-6 placeholder:pl-2 placeholder:text-gray-600 rounded placeholder:font-semibold border-none shadow-md w-full transition duration-150 ease-in-out  ${
                darkMode
                  ? " bg-slate-950 text-gray-50"
                  : "bg-slate-200 text-gray-900 focus:outline-sky-600 "
              } `}
              placeholder="Search For a Country"
            />
            <AiOutlineSearch
              type="submit"
              className=" absolute left-1 top-4 cursor-pointer text-xl text-gray-600 "
            />
          </div>
          <div className="max-w-fit">
            <div
              className={` ${
                darkMode
                  ? " bg-slate-950 text-gray-50"
                  : "bg-slate-200 text-gray-900"
              } transition duration-150 ease-in-out flex items-center p-2  mt-6 md:m-auto rounded cursor-pointer max-w-fit font-semibold space-x-2 hover:shadow-lg min-w-[157px] justify-between`}
            >
              <div onClick={showDropdown}>
                {regionQuery ? regionQuery : "Filter by Region"}
              </div>
              {regionQuery ? (
                <AiOutlineClose className=" ml-2 " onClick={removeFilter} />
              ) : (
                <MdKeyboardArrowDown
                  className=" ml-2 text-xl "
                  onClick={showDropdown}
                />
              )}
            </div>
            <div
              className={`${
                darkMode
                  ? " bg-slate-950 text-gray-50"
                  : "bg-slate-200 text-gray-900"
              } transition duration-150 ease-in-out mt-3 p-2  rounded shadow-sm absolute w-[157px]  z-40 ${
                Dropdown ? "block" : "hidden"
              }`}
            >
              <p
                className=" cursor-pointer"
                onClick={() => filterByRegionFunc("Africa")}
              >
                Africa
              </p>
              <p
                className=" cursor-pointer"
                onClick={() => filterByRegionFunc("America")}
              >
                America
              </p>
              <p
                className=" cursor-pointer"
                onClick={() => filterByRegionFunc("Asia")}
              >
                Asia
              </p>
              <p
                className=" cursor-pointer"
                onClick={() => filterByRegionFunc("Europe")}
              >
                Europe
              </p>
              <p
                className=" cursor-pointer"
                onClick={() => filterByRegionFunc("Oceania")}
              >
                Oceania
              </p>
            </div>
          </div>
        </div>
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-y-4 lg:gap-y-7 my-4 lg:px-14">
          {countryDataElement}
        </div>
      </main>
    </>
  );
}
