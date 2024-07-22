import React, { useEffect, useState, useCallback } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  //types
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useTheme } from "next-themes";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

const labels = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

export default function VerticalBarChart({
  height = 400,
  width = 400,
  data = [],
}: {
  height?: number;
  width?: number;
  data: any[];
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

  const getGradient = useCallback(
    (chart: any) => {
      const ctx = chart.ctx;
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(
        0,
        currentTheme === "dark"
          ? "rgba(224,224,173,0.4)"
          : "rgba(106,164,204,0.4)",
      );
      gradient.addColorStop(1, "transparent");
      return gradient;
    },
    [currentTheme],
  );

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
    scales: {
      y: {
        grid: {
          color: currentTheme === "dark" ? "#393939" : "#f1f1f1",
        },
      },
      x: {
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
        pointRadius: 0,
        pointHoverRadius: 0,
        //linecolor
        borderColor: currentTheme === "dark" ? "#E0E0AD" : "#6AA4CC",
        //tension
        tension: 0.1,
        borderWidth: 7,
        fill: true,
        backgroundColor: (context: any) => {
          const chart = context.chart;
          return getGradient(chart);
        },
        //rounded corners
        borderCapStyle: "round" as const,
      },
    ],
  };

  return (
    <Line options={options} data={chartData} height={height} width={width} />
  );
}
