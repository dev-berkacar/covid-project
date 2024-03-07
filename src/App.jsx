// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WorldMap from "./components/WorldMap";
import CountryDetail from "./components/CountryDetail";
import Header from "./components/Header";
import "./index.css";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <div className="map-container w-full h-screen">
              <WorldMap />
            </div>
          }
        />
        <Route path="/detail/:countryCode" element={<CountryDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
