import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useTheme } from "next-themes";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({
  data = [],
  width = 100,
  height = 100,
  labels,
}: {
  data: any[];
  width?: number | string;
  height?: number | string;
  labels?: string[];
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
    cutout: "80%",

    plugins: {
      legend: {
        display: false,
        position: "bottom" as const,
        labels: {
          color: currentTheme === "dark" ? "#fff" : "#000",
          boxWidth: 6,
          boxHeight: 6,
          //padding top
          padding: 10,
          //rounded box
          usePointStyle: true,
        },
      },
      title: {
        display: false,
      },
    },
    tooltips: {
      enabled: false,
      callbacks: {
        label: (context: any) => {
          const label = labels ? labels[context.dataIndex] : [];
          const value = context.raw;
          const total = context.parsed.yTotal;
          const percentage = ((value / total) * 100).toFixed(2) + "%";
          return `${label}: ${value} (${percentage})`;
        },
      },
    },
    //padding between chart and labels
    layout: {
      padding: 10,
    },
    responsive: true,
  };

  const chartData = {
    labels,
    datasets: [
      {
        label: "",
        data: data,
        pointRadius: 0,
        pointHoverRadius: 0,
        tension: 0.1,
        borderWidth: 0,
        fill: true,
        backgroundColor: [
          "#7DABC9",
          "#EBD999",
          "#0f4e40",
          "#3a78a1",
          "#65a379",
          "#d6c989",
          "#a87fca",
        ],
      },
    ],
  };

  return (
    <Doughnut data={chartData} options={options} width={200} height={200} />
  );
}
