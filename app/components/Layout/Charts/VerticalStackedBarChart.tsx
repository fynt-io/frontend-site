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

export default function VerticalStackedBarChart({
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
    interaction: {
        intersect: false,
      },
    scales: {
      y: {
        stacked:true,
        grid: {
          color: currentTheme === "dark" ? "#393939" : "#f1f1f1",
        },
      },
      x: {
        stacked:true,
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
        data: data,
        barPercentage: 0.5,
        barThickness: 10,
        maxBarThickness: 10,
        borderRadius: 10,
        backgroundColor: currentTheme === "dark" ? "#E0E0AD" : "#6AA4CC",
      },
    ],
  };

  return (
    <Bar options={options} data={chartData} height={height} width={width} />
  );
}
