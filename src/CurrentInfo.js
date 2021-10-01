import React from "react";
import FutureForecast from "./FutureForecast";
import HourlyForecast from "./HourlyForecast";
/*  Component to show the Weather data using different*/
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

//preparing the data
const time = new Date();
const month = time.getMonth();
const date = time.getDate();
const day = time.getDay();
const hour = time.getHours();
const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour;
const minutes = time.getMinutes();
const ampm = hour >= 12 ? "PM" : "AM";

function CurrentInfo(props) {
  const current = props.data.current;
  const daily = props.data.daily;
  const imgUrl = `http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`;
  return (
    <>
      <div className="container">
        <div className="current-info">
          <div class="date-container">
            <div class="time" id="time">
              <div> {current.temp}&#176;C</div>
              <span>
                {" "}
                <img src={imgUrl} alt="weather icon" />
              </span>
            </div>
            <div class="date" id="date">
              {days[day] + ", " + date + " " + months[month]}
              <div></div>
              {(hoursIn12HrFormat < 10
                ? "0" + hoursIn12HrFormat
                : hoursIn12HrFormat) +
                ":" +
                (minutes < 10 ? "0" + minutes : minutes) +
                " " +
                ampm}
            </div>

            <div class="others" id="current-weather-items">
              <div class="weather-item">
                <div>Humidity</div>
                <div>{current.humidity}%</div>
              </div>
              <div class="weather-item">
                <div>Pressure</div>
                <div>{current.pressure}</div>
              </div>
              <div class="weather-item">
                <div>Wind Speed</div>
                <div>{current.wind_speed}</div>
              </div>
              <div class="weather-item">
                <div>Night</div>
                <div>{daily[0].temp.day}&#176;C</div>
              </div>
              <div class="weather-item">
                <div>Day</div>
                <div>{daily[0].temp.night}&#176;C</div>
              </div>
            </div>
          </div>

          <div class="place-container">
            <div className="hourly-forecast">
              <HourlyForecast data={props && props.data && props.data.hourly} />
            </div>
          </div>
        </div>
      </div>

      <div className="future-forecast">
        <FutureForecast data={props && props.data && props.data.daily} />
      </div>
    </>
  );
}

export default CurrentInfo;
