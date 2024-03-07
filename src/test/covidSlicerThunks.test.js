import { configureStore } from "@reduxjs/toolkit";
import mockAxios from "jest-mock-axios";
import covidSlice from "../features/covid/covidSlice";
import { fetchCountries } from "../features/covid/covidSlice";
import "@testing-library/jest-dom";

const store = configureStore({ reducer: { covid: covidSlice } });

describe("fetchCountries thunk", () => {
  afterEach(() => {
    mockAxios.reset();
    store.dispatch({ type: "RESET" });
  });

  it("dispatches the correct actions on successful fetch", async () => {
    const response = { data: { data: ["Country 1", "Country 2"] } };
    mockAxios.get.mockResolvedValueOnce(response);

    await store.dispatch(fetchCountries());
  });
});
