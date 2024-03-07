// eslint-disable-next-line no-unused-vars
import React from "react";
import covidSlice, { fetchCountries } from "../features/covid/covidSlice";
import "@testing-library/jest-dom";

describe("covidSlice reducer", () => {
  const initialState = {
    data: {},
    status: "idle",
    error: null,
    countries: [],
    totalDeaths: 0,
    totalConfirmed: 0,
    totalRecovered: 0,
    lastUpdate: "",
    countryName: "",
  };

  it("should handle initial state", () => {
    expect(covidSlice(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle fetchCountries.fulfilled", () => {
    const actual = covidSlice(
      initialState,
      fetchCountries.fulfilled({ data: ["Country 1", "Country 2"] })
    );
    expect(actual.countries).toEqual(["Country 1", "Country 2"]);
  });
});
