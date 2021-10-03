import React from "react";
import { Line } from "react-chartjs-2";
//component to show the hourly graph
function HourlyForecast(props) {
  let labels = [];
  let datasets = [];

  props.data.map((hour) => {
    
    let time =  new Date(hour.dt * 1000).toLocaleString("en-US", {weekday:"long"}).substring(0,3) + " "+
    new Date(hour.dt * 1000).toLocaleString("en-US", {hour:"numeric"})
    labels.push(time)
    datasets.push(hour.temp);
  });

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Hourly Temperature in Degree Celcius",
        data: datasets,
        color: "#fff",
        fill: true,
        borderColor: "#fff",
        backgroundColor: "rgba(225, 225, 235, 0.1)",
      },
    ],
  };
  const options = {
    maintainAspectRatio:false,
    legend: {
      fontColor: "blue",
    },
    scales: {
      xAxes: [
        {
          ticks: {
            fontColor: "blue",
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            fontColor: "blue",
          },
        },
      ],
    },
  };

  return <Line data={data} options={options} />;
}

export default HourlyForecast;
