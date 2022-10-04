import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./countries.css";

const Countries = () => {
  const [countriesList, setCountriesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const Navigate = useNavigate();

  const fetchCountriesData = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("https://restcountries.com/v3.1/all");
      const countries = res.data.sort((a, b) =>
        a.name.official.localeCompare(b.name.official)
      );
      setCountriesList(countries);
      setIsLoading(false);
    } catch (err) {
      console.log("error ==>", err.message);
      setIsLoading(false);
    }
  };

  const handleClick = (country) => {
    Navigate(`/name/${country}`);
  };

  useEffect(() => {
    fetchCountriesData();
  }, []);

  return (
    <>
      <div className="wrapper">
        <h1>Countries List</h1>
        <table className="informationTable table">
          <thead>
            <tr>
              <th className="tableCell">Name</th>
              <th className="tableCell">Population</th>
              <th className="tableCell">Region</th>
              <th className="tableCell">Status</th>
            </tr>
            {countriesList.map((item) => (
              <tr>
                <td
                  className="tableCell highlight"
                  onClick={() => handleClick(item.name.official)}
                >
                  {item.name.official}
                </td>
                <td className="tableCell">{item.population}</td>
                <td className="tableCell">{item.region}</td>
                <td className="tableCell">{item.status}</td>
              </tr>
            ))}
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

export default Countries;
