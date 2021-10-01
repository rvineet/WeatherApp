import React from "react";
//component to show the future forecast(min&max temperature) of 7 future days, plus the current day
function FutureForecast(props) {
  return (
    <>
      {props.data.map((day) => {
        const weekday = new Date(day.dt * 1000).toDateString();

        const imgUrl = `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
        return (
          <div class="weather-forecast" id="weather-forecast">
            <div class="weather-forecast-item">
              <div class="day">{weekday.substring(0, 4)}</div>
              <img src={imgUrl} alt="weather icon" class="w-icon" />
              <div class="temp">Max - {day.temp.max}&#176; C</div>
              <div class="temp">Min - {day.temp.min}&#176; C</div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default FutureForecast;
