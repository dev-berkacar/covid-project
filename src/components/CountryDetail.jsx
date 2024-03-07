// eslint-disable-next-line no-unused-vars
import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCovidData } from "../features/covid/covidSlice";

const CountryDetail = () => {
  const dispatch = useDispatch();
  const { countryCode } = useParams();

  const covidStatus = useSelector((state) => state.covid.status);
  const countryName = useSelector((state) => state.covid.countryName);
  const lastUpdate = useSelector((state) => state.covid.lastUpdate);
  const totalConfirmed = useSelector((state) => state.covid.totalConfirmed);
  const totalDeaths = useSelector((state) => state.covid.totalDeaths);
  const totalRecovered = useSelector((state) => state.covid.totalRecovered);
  const covidError = useSelector((state) => state.covid.error);

  useEffect(() => {
    if (countryCode) {
      dispatch(fetchCovidData(countryCode));
    }
  }, [countryCode, dispatch]);

  return (
    <div className="flex items-center justify-center h-screen">
      {covidStatus === "loading" && (
        <span aria-label="loading" className="loader" />
      )}
      {covidStatus === "succeeded" && (
        <div
          className="border-2 rounded-md
         px-6 py-2 bg-purple-800 info-container"
        >
          <h2 className="text-xl uppercase text-center pb-4">{countryName}</h2>
          <p className="pb-2">Güncellenme Tarihi: {lastUpdate}</p>
          <p className="pb-2">Vaka Sayısı: {totalConfirmed}</p>
          <p className="pb-2">Ölüm Sayısı: {totalDeaths}</p>
          <p className="pb-2">İyileşen Sayısı: {totalRecovered}</p>
        </div>
      )}
      {covidStatus === "failed" && (
        <p>
          Error fetching data:
          {covidError ??
            "Servis bilgilerini çekerken bir hata ile karşılaşıldı."}
        </p>
      )}
    </div>
  );
};

export default CountryDetail;
