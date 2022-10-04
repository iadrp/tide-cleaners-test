import React, { useEffect, useState } from "react";
import axios from "axios";
import "./country.css";
import { useParams } from "react-router-dom";

const Country = () => {
  const [countryDetails, setCountryDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { countryName } = useParams();

  const fetchCountryDetails = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `https://restcountries.com/v3.1/name/${countryName}`
      );
      setCountryDetails(res.data[0]);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log("error ==>", err.message);
    }
  };

  useEffect(() => {
    fetchCountryDetails();
  }, []);

  return (
    <>
      <div className="wrapper">
      <h1>Country Details</h1>
        <table className="informationTable table">
          <thead>
            <tr>
              <th className="tableCell">Name</th>
              <th className="tableCell">Population</th>
              <th className="tableCell">Region</th>
              <th className="tableCell">Sub Region</th>
              <th className="tableCell">Area</th>
              <th className="tableCell">Status</th>
            </tr>
            {!isLoading && (
              <tr>
                <td className="tableCell">{countryDetails?.name?.official}</td>
                <td className="tableCell">{countryDetails?.population}</td>
                <td className="tableCell">{countryDetails?.region}</td>
                <td className="tableCell">{countryDetails?.subregion}</td>
                <td className="tableCell">{countryDetails?.area}</td>
                <td className="tableCell">{countryDetails?.status}</td>
              </tr>
            )}
          </thead>
        </table>
        {isLoading && (
          <div className="loaderWrapper">
            <div class="loader"></div>
          </div>
        )}
      </div>
    </>
  );
};

export default Country;
