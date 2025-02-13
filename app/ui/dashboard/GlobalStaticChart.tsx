"use client";
import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

export default function GlobalStaticChart({ QteByMonth }: { QteByMonth: Record<string, any>[] }) {
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

  const data = {
    labels: QteByMonth.map((item) => item.Mois),
    datasets: [
      {
        label: "Vente (kg)",
        data: QteByMonth.map((item) => item.Qte_Vente),
        fill: false,
        borderColor: "#3f83f8",
      },
      {
        label: "Achat (kg)",
        data: QteByMonth.map((item) => item.Qte_Achat),
        fill: false,
        borderColor: "#10b981",
      },
      {
        label: "Production (kg)",
        data: QteByMonth.map((item) => item.Qte_Prod),
        fill: false,
        borderColor: "#b43403",
      },
    ],
  };

  const options = {
    responsive: true,
  };

  return <Line options={options} data={data} height={70} />;
}
