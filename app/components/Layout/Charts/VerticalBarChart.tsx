import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useTheme } from "next-themes";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function VerticalBarChart({
  height = 550,
  width = 400,
  data = [],
  labels,
}: {
  height?: number;
  width?: number;
  data: any[];
  labels: any[];
}) {
  const [currentTheme, setCurrentTheme] = useState<string | null | undefined>(
    useTheme()?.theme,
  );
  const theme = useTheme();

  useEffect(() => {
    if (theme) {
      if (theme?.theme === "system") {
        setCurrentTheme(theme?.systemTheme);
      } else {
        setCurrentTheme(theme?.theme);
      }
    }
  }, [theme]);

  const options = {
    layout: {
      padding: 0
  },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        border:{
          color: "#666",
        },
        grid: {
          display: false,
        },
      },
      x: {
        border:{
          color: "#666",
        },
        grid: {
          display: false,
        },
      },
    },
  };

  const chartData = {
    labels,
    datasets: [
      {
        //remove label
        label: "",
        data: data[0],
        barPercentage: 0.5,
        barThickness: 15,
        maxBarThickness: 15,
        borderRadius: 10,
        backgroundColor: "#77B9C2",
        stack: "Stack 1",
      },
      {
        //remove label
        label: "",
        data: data[1],
        barPercentage: 0.5,
        barThickness: 15,
        maxBarThickness: 15,
        borderRadius: 10,
        backgroundColor: "#E9E3AA",
        stack: "Stack 1",
      },
      {
        //remove label
        label: "",
        data: data[2],
        barPercentage: 0.5,
        barThickness: 15,
        maxBarThickness: 15,
        borderRadius: 10,
        backgroundColor: "#96D191",
        stack: "Stack 1",
      }
    ],
  };

  return (
    <Bar options={options} data={chartData} height={height} width={width} />
  );
}
