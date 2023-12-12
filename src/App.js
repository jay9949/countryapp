import "./app.css";
import { Routes, Route } from "react-router-dom";
import AllCountries from "./components/AllCountries/AllCountries";
import CountryInfo from "./components/CountryInfo/CountryInfo";
import Header from "./components/Header/Header";

function App() {
  return (
    <>
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<AllCountries />} />
          <Route path="/country/:name" element={<CountryInfo />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
