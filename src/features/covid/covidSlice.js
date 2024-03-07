import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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

export const fetchCountries = createAsyncThunk(
  "covid/fetchCountries",
  async (_, { rejectWithValue }) => {
    const options = {
      method: "GET",
      url: "https://covid-19-statistics.p.rapidapi.com/regions",
      headers: {
        "x-rapidapi-key": "31bae48232msh41aaff62dd97030p163f3bjsn250191f2753d",
        "X-RapidAPI-Host": "covid-19-statistics.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data || "An error occurred while fetching countries"
      );
    }
  }
);

export const fetchCovidData = createAsyncThunk(
  "covid/fetchCovidData",
  async (countryName) => {
    const options = {
      method: "GET",
      url: "https://covid-19-statistics.p.rapidapi.com/reports",
      params: { iso: countryName },
      headers: {
        "x-rapidapi-host": "covid-19-statistics.p.rapidapi.com",
        "x-rapidapi-key": "31bae48232msh41aaff62dd97030p163f3bjsn250191f2753d",
      },
    };

    const response = await axios.request(options);
    return response.data;
  }
);

const covidSlice = createSlice({
  name: "covid",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.countries = action.payload.data;
      })
      .addCase(fetchCovidData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCovidData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.data;

        state.countryName = action.payload.data[0]?.region.name || "Unknown";

        const lastItem = action.payload.data[action.payload.data.length - 1];
        state.lastUpdate = lastItem ? lastItem.last_update : "";

        state.totalDeaths = action.payload.data.reduce(
          (total, current) => total + current.deaths,
          0
        );

        state.totalConfirmed = action.payload.data.reduce(
          (total, current) => total + current.confirmed,
          0
        );

        state.totalRecovered = action.payload.data.reduce(
          (total, current) => total + current.recovered,
          0
        );
      })
      .addCase(fetchCovidData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default covidSlice.reducer;
