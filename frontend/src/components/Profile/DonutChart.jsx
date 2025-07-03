import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { valueFormatter } from "./webUsageStats.js";
import { useState, useEffect } from "react";
import axios from "axios";

const DonutChart = ({ darkMode }) => {
  const [avg, setAvg] = useState({});
  const clubname = localStorage.getItem("club");
  const token = localStorage.getItem("authToken");
  const API_BASE_URL = import.meta.env.VITE_API

  useEffect(() => {
    if (!clubname || !token) return;

    const categories = ["workshop", "hackathon", "insights", "quiz", "entertainment"];
    const requests = categories.map((category) =>
      axios
        .get(`${API_BASE_URL}/profile/average-like-category/${clubname}/${category}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => ({ [category]: response.data }))
        .catch((error) => {
          console.error(`Error fetching data for ${category}:`, error);
          return { [category]: 0 };
        })
    );

    Promise.all(requests).then((results) => {
      const mergedData = Object.assign({}, ...results);
      setAvg(mergedData);
    });
  }, [clubname, token]);

  const chartData = [
    { label: "workshop", value: avg.workshop || 0 },
    { label: "hackathon", value: avg.hackathon || 0 },
    { label: "insights", value: avg.insights || 0 },
    { label: "quiz", value: avg.quiz || 0 },
    { label: "entertainment", value: avg.entertainment || 0 },
  ];

  return (
    <div className="py-6 bg-white rounded-lg p-5 flex dark:bg-gray-700">
      <PieChart
        series={[
          {
            data: chartData,
            highlightScope: { fade: "global", highlight: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
            valueFormatter,
          },
        ]}
        height={300}
        width={490}
      />
    </div>
  );
};

export default DonutChart;
