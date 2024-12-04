"use client";
import React, { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import { fetchGlobalStaticChart } from "@/app/lib/data/ste_utils";

export default function GlobalStaticChart() {
  const [QteByMonth, setQteByMonth] = useState<any[]>([]);

  useEffect(() => {
    fetchGlobalStaticChart().then((resp) => {
      setQteByMonth(resp);
      console.log(resp);
    });
  }, []);

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
    ],
  };

  const options = {
    responsive: true,
  };

  return <Line options={options} data={data} height={70} />;
}
