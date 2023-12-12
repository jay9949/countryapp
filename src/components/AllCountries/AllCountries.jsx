import React, { useState, useEffect } from "react";
import { apiURL } from "../util/api";
import SearchInput from "../Search/SearchInput";
import { Link } from "react-router-dom";
import Spinner from "../Loader/Spinner";

const AllCountries = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortingType, setSortingType] = useState("default");

  const getAllCountries = async () => {
    try {
      const res = await fetch(`${apiURL}/all`);

      if (!res.ok) throw new Error("Something went wrong!");

      const data = await res.json();

      setCountries(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const getCountryByName = async (countryName) => {
    try {
      const res = await fetch(`${apiURL}/name/${countryName}`);

      if (!res.ok) throw new Error("Not found any country!");

      const data = await res.json();
      setCountries(data);
      setSortingType("default");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const sortData = (type) => {
    let sortedCountries = [...countries];

    if (type === "A-Z") {
      sortedCountries.sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
      );
    } else if (type === "Z-A") {
      sortedCountries.sort((a, b) =>
        b.name.common.localeCompare(a.name.common)
      );
    } else {
      getAllCountries();
      return;
    }

    setCountries(sortedCountries);
    setSortingType(type);
  };

  useEffect(() => {
    getAllCountries();
  }, []);
  console.log(sortingType);

  return (
    <div className="all__country__wrapper">
      <div className="country__top">
        <div className="search">
          <SearchInput onSearch={getCountryByName} />
        </div>
        <select onChange={(e) => sortData(e.target.value)}>
          <option onClick={() => sortData()}>Default</option>
          <option onClick={() => sortData("A-Z")}>A-Z</option>
          <option onClick={() => sortData("Z-A")}>Z-A</option>
        </select>
      </div>
      <div className="country__bottom">
        {isLoading && !error && (
          <h4 style={{ display: "flex", margin: "0 auto", paddingTop: "10px" }}>
            <Spinner />
          </h4>
        )}
        {error && !isLoading && <h4>{error}</h4>}

        {countries.map((country) => (
          <Link to={`/country/${country.cca3}`} key={country.name.common}>
            <div className="country__card" key={country.name.common}>
              <div className="country__img">
                <img src={country.flags.png} alt="" />
              </div>
              <div className="country__data">
                <h3>{country?.name?.common}</h3>
                <h6>
                  Population:{" "}
                  {new Intl.NumberFormat().format(country.population)}
                </h6>
                <h6>Region: {country.region}</h6>
                <h6 style={{ display: "flex" }}>
                  Borders:{" "}
                  <span className="border-spn">
                    {country?.borders?.map((borderCountry, index) => (
                      <Link
                        style={{ display: "block", marginBottom: "5px" }}
                        to={`/country/${borderCountry}`}
                        key={`${country.name.common}-${index}`}
                      >
                        <span className="border-btn">{borderCountry}</span>
                        {index < country.borders.length - 1 && " "}
                      </Link>
                    ))}
                  </span>
                </h6>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllCountries;
