// eslint-disable-next-line no-unused-vars
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import CountryDetail from "../components/CountryDetail";
import configureStore from "redux-mock-store";
import "@testing-library/jest-dom";

const mockStore = configureStore([]);

describe("CountryDetail Component Tests", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      covid: {
        status: "idle",
        error: null,
        countryName: "Test Country",
        lastUpdate: "2023-03-10",
        totalConfirmed: 1000,
        totalDeaths: 100,
        totalRecovered: 900,
      },
    });
    store.dispatch = jest.fn();
  });

  test("renders loading state correctly", () => {
    store = mockStore({
      covid: {
        status: "loading",
      },
    });
    render(
      <Provider store={store}>
        <Router>
          <CountryDetail />
        </Router>
      </Provider>
    );

    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
  });

  test("renders succeeded state correctly", () => {
    render(
      <Provider store={store}>
        <Router>
          <CountryDetail />
        </Router>
      </Provider>
    );

    waitFor(() => {
      expect(screen.getByText(/test country/i)).toBeInTheDocument();
      expect(screen.getByText(/vaka sayısı: 1000/i)).toBeInTheDocument();
    });
  });

  test("renders failed state correctly", () => {
    store = mockStore({
      covid: {
        status: "failed",
        error: "Test error",
      },
    });
    render(
      <Provider store={store}>
        <Router>
          <CountryDetail />
        </Router>
      </Provider>
    );

    expect(screen.getByText(/error fetching data/i)).toBeInTheDocument();
  });
});
