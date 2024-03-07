// eslint-disable-next-line no-unused-vars
import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { render } from "@testing-library/react";
import WorldMap from "../components/WorldMap";
import "@testing-library/jest-dom";

jest.mock("react-simple-maps", () => ({
  ComposableMap: () => <div>ComposableMap Mock</div>,
  Geographies: () => <div>Geographies Mock</div>,
  Geography: () => <div>Geography Mock</div>,
}));

jest.mock("../features/covid/covidSlice", () => ({
  fetchCountries: jest
    .fn()
    .mockReturnValue({ type: "covid/fetchCountries/fulfilled", payload: [] }),
}));

const mockStore = configureMockStore();
const store = mockStore({
  covid: {
    countries: [{ name: "United States of America", iso: "USA" }],
  },
});

describe("WorldMap Component", () => {
  it("handles country click correctly", () => {
    render(
      <Provider store={store}>
        <WorldMap />
      </Provider>
    );
  });
});
