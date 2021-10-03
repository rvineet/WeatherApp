import React, { useState, useEffect } from "react";
import config from "./config";
import CurrentInfo from "./CurrentInfo";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CurrentWeather() {
  const [apiData, setApidata] = useState();
  const [lat, setLat] = useState();
  const [long, setLong] = useState();
  const [city, setCity] = useState("");

  //api to get city coords
  let api1 = "https://api.openweathermap.org/data/2.5/weather?q=";
  let api2 = "&appid=";

  //to fetch City coords
  const FetchCitylonLat = () => {
    return fetch(`${api1}${city}${api2}${config.api_key}`)
      .then((response) => response.json())
      .then((data) => {
        return {
          lat: data?.coord?.lat,
          lon: data?.coord?.lon,
        };
      });
  };

  //to get the Location from the user, if user denies, it will take default coords
  //if the user reject the location permission then it will set a hard-coded coord values which are of Delhi
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        position.coords.latitude && setLat(position.coords.latitude);
        position.coords.longitude && setLong(position.coords.longitude);
        fetchData({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      function (error) {
        notify();
        setLat(28.7041);
        setLong(77.1025);
        fetchData({
          lat: 28.7041,
          lon: 77.1025,
        });
      }
    );
  }, []);

  //fetch the data (current, daily and hourly)
  const fetchData = (coord = {}) => {
    fetch(
      `${config.url1}${coord.lat || lat}${config.url2}${coord.lon || long}${
        config.url3
      }${config.api_key}`
    )
      .then((response) => response.json())
      .then((data) => {
        setApidata(data);
      });
  };

  const notify = () =>
    toast(
      "Oops! Location not accessible. You will see default weather of as per Delhi coords"
    );

  //function to handle submit of the city(to fetch thr new data as per the city coords)
  async function handleSubmit(e) {
    e.preventDefault();
    if (city) {
      const coord = await FetchCitylonLat();
      fetchData(coord);
      return;
    }

    fetchData();
  }

  return apiData ? (
    <div className="search-bar">
      <ToastContainer />
      <span>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter City"
            maxLength="50"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit">Get Forecast</button>
        </form>
      </span>

      <div>
        <CurrentInfo data={apiData} city={city}/>
      </div>
    </div>
  ) : (
    ""
  );
}

export default CurrentWeather;
