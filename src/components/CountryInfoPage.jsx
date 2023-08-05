import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";

export default function CountryInfoPage(props) {
  const { darkMode } = props;
  const [countryData, setCountryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const params = useParams().country;
  useEffect(() => {
    try {
      setLoading(true);
      fetch(`https://restcountries.com/v3.1/name/${params}?fullText=true`)
        .then((res) => {
          if (!res.ok) {
            // Check for error response status and handle accordingly
            throw new Error("Failed to fetch data from the server");
          }
          return res.json();
        })
        .then((data) => setCountryData(data[0]))
        .catch((err) => {
          setError("Error fetching data: " + err.message); // Set the error message
          setLoading(false);
        });
      setLoading(false);
    } catch (error) {
      setError("Error fetching data: " + error.message); // Set the error message
    }
  }, []);

  const countryEl = countryData ? countryData && (
    <>
    
     {countryData.flags?.png && <div className="max-w-fit mx-auto lg:mx-0 md:ml-11 lg:ml-14">
        <img
          src={countryData.flags?.png}
          className="shadow-lg w-full lg:min-w-[226px] lg:max-w-[426px] lg:min-h-[266px]"
          alt={countryData.flags?.alt}
        />
      </div>}
    {countryData &&   <div
        className={`transition duration-150 ease-in-out ${
          darkMode ? "text-gray-50" : "text-gray-900"
        } md:mr-11 mt-2 md:mt-0 mb-4 flex flex-col gap-y-3 lg:mx-auto`}
      >
        {countryData.name?.common &&<p className="font-semibold text-xl mr-3 truncate lg:text-2xl">
          {countryData.name?.common}
        </p>}
        {countryData.name?.official &&   <p className="font-semibold text-md lg:text-xl">
          Official name:{" "}
          <span className="font-normal">{countryData.name?.official}</span>
        </p>}
        {Object.entries(countryData.name?.nativeName || {}).map(
          ([langCode, langData]) => (
            <p className="font-semibold text-md lg:text-xl" key={langCode}>
              {langData.common ? "Native" : "Official"} name ({langCode}):{" "}
              <span className="font-normal">
                {langData.official || langData.common}
              </span>
            </p>
          )
        )}
      {countryData.population && <p className="font-semibold text-md lg:text-xl">
          Population:{" "}
          <span className="font-normal">{countryData.population}</span>
        </p>}
        {countryData.region &&  <p className="font-semibold text-md lg:text-xl">
          Region: <span className="font-normal">{countryData.region}</span>
        </p>}
        {countryData.demonyms?.eng.m && <p className="font-semibold text-md lg:text-xl">
          Demonyms:{" "}
          <span className="font-normal">{countryData.demonyms?.eng.m}</span>
        </p>}
        {countryData.subregion &&  <p className="font-semibold text-md lg:text-xl">
          Subregion:{" "}
          <span className="font-normal">{countryData.subregion}</span>
        </p>}
        {countryData.continents?.[0] &&  <p className="font-semibold text-md lg:text-xl">
          Continent:{" "}
          <span className="font-normal">{countryData.continents?.[0]}</span>
        </p>}
        {countryData.capital?.[0] &&  <p className="font-semibold text-md lg:text-xl">
          Capital:{" "}
          <span className="font-normal">{countryData.capital?.[0]}</span>
        </p> }
        {countryData.currencies?.[0]?.name && (
          <p className="font-semibold text-md lg:text-xl">
            Currencies:{" "}
            <span className="font-normal">
              {countryData.currencies?.[0]?.name}
            </span>
          </p>
        )}
     {countryData.languages &&   <p className="font-semibold text-md lg:text-xl">
          Languages:{" "}
          <span className="font-normal">
            {Object.values(countryData.languages || {}).join(", ")}
          </span>
        </p>}
        {countryData.timezones?.[0] &&    <p className="font-semibold text-md lg:text-xl">
          Timezones:{" "}
          <span className="font-normal">{countryData.timezones?.[0]}</span>
        </p>}
        {countryData.borders && (
          <p className="font-semibold text-md lg:text-xl">
            Borders:{" "}
            <span className="font-normal">
              {countryData.borders?.join(", ")}
            </span>
          </p>
        )}
      </div>}
    </>
  ) : null;

  return (
    <>
      {loading && <Spinner />}
      <main
        className={`transition duration-150 ease-in-out pt-8   overflow-y-auto ${
          darkMode ? " bg-gray-900" : " bg-slate-50"
        }`}
        style={{ minHeight: "calc(100vh - 108px)" }}
      >
        {error && <div className=" bg-red-700 text-white">{error}</div>}
     { !error &&  <Link to="/">
          <div
            className={`flex items-center font-semibold ml-8 lg:ml-14 lg:text-lg  p-2 px-3  lg:px-4 text-md max-w-fit rounded cursor-pointer hover:shadow-lg shadow-md ${
              darkMode
                ? " bg-slate-950 text-gray-50"
                : "bg-slate-200 text-gray-900 "
            }`}
          >
            <AiOutlineArrowLeft className={`mr-2 lg:mr-3`} />
            Back
          </div>
        </Link>}
        <div className="mt-8 flex flex-col md:flex-row md:items-center ">
          <div className="mx-auto md:w-full md:mx-0 md:flex md:justify-between lg:justify-start">
            {countryEl}
          </div>
        </div>
      </main>
    </>
  );
}
