import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const WeatherChart = ({ weatherData }) => {
  const labels = weatherData.map((day) =>
    new Date(day.current.dt * 1000).toLocaleDateString()
  );
  const temperatures = weatherData.map((day) => day.current.temp);

  const data = {
    labels,
    datasets: [
      {
        label: "Temperature (°C)",
        data: temperatures,
        borderColor: "rgba(75,192,192,1)",
        fill: false,
      },
    ],
  };

  return <Line data={data} />;
};

export default WeatherChart;
