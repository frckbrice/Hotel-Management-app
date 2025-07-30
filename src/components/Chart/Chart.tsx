"use client";

import {
  Chart as ChartJS,
  Tooltip,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { FC } from "react";
import { Bar } from "react-chartjs-2";
import { Booking } from "../models/booking";

ChartJS.register(Tooltip, CategoryScale, LinearScale, BarElement);

export const option = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
      labels: {
        color: typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? '#ffffff' : '#000000',
      },
    },
    title: {
      display: true,
      text: "Amount Spent on Bookings",
      color: typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? '#ffffff' : '#000000',
    },
  },
  scales: {
    x: {
      ticks: {
        color: typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? '#ffffff' : '#000000',
      },
    },
    y: {
      ticks: {
        color: typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? '#ffffff' : '#000000',
      },
    },
  },
};

const Chart: FC<{ userBookings: Booking[] }> = ({ userBookings }) => {
  const labels = userBookings.map((booking) => booking.hotelRoom.name);
  const amountSpent = userBookings?.map((booking) => booking.totalPrice);

  return (
    <Bar
      options={option}
      data={{
        labels,
        datasets: [
          {
            label: "Amount spent",
            data: amountSpent,
            borderWidth: 1,
            backgroundColor: "#16a34a", // green-600
            hoverBackgroundColor: "#15803d", // green-700
          },
        ],
      }}
    />
  );
};

export default Chart;
