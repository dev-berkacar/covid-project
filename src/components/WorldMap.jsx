// eslint-disable-next-line no-unused-vars
import React from "react";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { feature } from "topojson-client";
import { fetchCountries } from "../features/covid/covidSlice";
import worldData from "world-atlas/countries-50m.json";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";

const WorldMap = () => {
  const dispatch = useDispatch();

  const countries = useSelector((state) => state.covid.countries);

  const handleCountryClick = (geo) => {
    const countryName = geo.properties.name;
    const countryData = countries.filter(
      (country) => country.name === countryName
    );
    if (countryData) {
      const countryCode =
        geo.properties.name === "United States of America"
          ? "USA"
          : countryData?.[0]?.iso;

      const url = `/detail/${countryCode}`;
      window.open(url, "_blank");
    }
  };

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  return (
    <div className="w-full h-full md:h-screen">
      <ComposableMap
        style={{ width: "100vw", height: "90vh" }}
        className="w-full h-full"
      >
        <Geographies
          geography={
            feature(worldData, worldData.objects.countries).features || geoUrl
          }
        >
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onClick={() => handleCountryClick(geo)}
                style={{
                  default: {
                    fill: "#D6D6DA",
                    outline: "none",
                  },
                  hover: {
                    fill: "#F53",
                    outline: "none",
                  },
                  pressed: {
                    fill: "#E42",
                    outline: "none",
                  },
                }}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default WorldMap;
