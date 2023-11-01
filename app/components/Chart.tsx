"use client";

import React, { useEffect, useRef } from "react";
import { Chart, registerables, ChartConfiguration } from "chart.js";

const MetricChart = () => {
  const xs = [
    "23 Jun",
    "25 Jun",
    "27 Jun",
    "29 Jun",
    "30 Jun",
    "2 July",
    "4 July",
    "6 July",
    "8 July",
    "10 July",
  ];
  const ys = [15, 25, 32, 49, 50, 60, 75, 75, 75, 95];
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lineChartRef = useRef<Chart>();

  useEffect(() => {
    Chart.register(...registerables);

    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext(
        "2d"
      ) as CanvasRenderingContext2D;
      const config: ChartConfiguration = {
        type: "line",
        data: {
          labels: xs,
          datasets: [
            {
              data: ys,
              borderWidth: 2,
              borderColor: "#4EC2C2",
              pointRadius: 0, // Set point radius to 0 to hide points
              pointHitRadius: 10,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              ticks: {
                color: "#4EC2C2", // Color of the x-axis labels
                minRotation: 0,
                maxRotation: 0,
                maxTicksLimit: 3,
                font: {
                  size: 12,
                },
              },
              grid: {
                display: false,
              },
              border: {
                width: 2,
                color: "#4EC2C2", // Color of the x-axis
              },
            },
            y: {
              ticks: {
                color: "#4EC2C2", // Color of the y-axis labels
                maxTicksLimit: 5,
                font: {
                  size: 12,
                },
              },
              grid: {
                color: "#4EC2C2aa", // Color of the y-axis grid lines
              },
              border: {
                display: false,
              },
              // beginAtZero: true,
            },
          },
        },
      };

      if (lineChartRef.current) lineChartRef.current.destroy();
      lineChartRef.current = new Chart(ctx, config);
    }
  }, []);

  return (
    <div className="flex relative w-[calc(100vw-116px)] md:w-auto px-4 py-6 bg-green/10 rounded-3xl">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default MetricChart;
