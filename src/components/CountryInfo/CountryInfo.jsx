import React, { useState, useEffect } from "react";
import { redirect, useParams } from "react-router-dom";
import { apiURL } from "../util/api";
import { Link } from "react-router-dom";
import Spinner from "../Loader/Spinner";
import { RiArrowRightUpLine } from "react-icons/ri";

const CountryInfo = () => {
  const [country, setCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { name } = useParams();

  useEffect(() => {
    const getCountryByName = async () => {
      try {
        const res = await fetch(`${apiURL}/alpha/${name}`);
        console.log("", name);

        if (!res.ok) throw new Error("Could not be found!");

        const data = await res.json();
        setCountry(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(error.message);
      }
    };

    getCountryByName();
  }, [name]);

  return (
    <div className="country__info__wrapper">
      <Link to="/">
        <button
          style={{
            padding: "10px 25px",
            color: "#fff",
            background: "hsl(209, 23%, 22%)",
            border: "none",
            outline: "none",
            cursor: "pointer",
            width: "120px",
            borderRadius: "5px",
            marginBottom: "50px",
          }}
        >
          Back
        </button>
      </Link>

      {isLoading && !error && (
        <h4
          style={{
            margin: "0 auto",
            paddingTop: "10px",
            textAlign: "center",
            marginTop: "15px",
          }}
        >
          <Spinner />
        </h4>
      )}

      {country?.map((country, index) => (
        <div
          className="country__info__container"
          key={index}
          onClick={() => redirect(`/country${name}`)}
        >
          <div className="country__info-img">
            <img src={country.flags.png} alt="" />
          </div>

          <div className="country__info">
            <h3>Name : {country?.name?.common}</h3>

            <div className="country__info-left">
              <h5>
                Capital : <span>{country.capital}</span>
              </h5>
              <h5>
                Region : <span>{country.region}</span>
              </h5>
              <h5>
                Timezone : <span>{country.timezones}</span>
              </h5>
              <h5>
                Continents : <span>{country.continents}</span>
              </h5>
              <h5 style={{ display: "flex", marginBottom: "10px" }}>
                Location :{"  "}
                <Link
                  className="g-map"
                  to={country.maps.googleMaps}
                  target="_blank "
                >
                  <p style={{ marginRight: "10px" }}>
                    {" "}
                    Go To Map <RiArrowRightUpLine />
                  </p>
                </Link>
              </h5>
              <h5>
                Borders :{" "}
                {country?.borders?.map((borderCountry, index) => (
                  <Link
                    className="border-link"
                    to={`/country/${borderCountry}`}
                    key={`${borderCountry}-${index}`}
                  >
                    <span className="border-btn">{borderCountry}</span>
                    {index < country.borders.length - 1 && " "}
                  </Link>
                ))}
              </h5>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CountryInfo;
