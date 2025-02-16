import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { desktopOS, valueFormatter } from './webUsageStats.js';
import { useState, useEffect } from "react";
import axios from "axios";

 const DonutChart=({darkMode})=>{
     const [avg,setAvg]=useState([]);
      const clubname = localStorage.getItem("club");
      const token = localStorage.getItem("authToken");
     //workshop
     //hackathon
     //insights
     //quiz
     //entertainment
      useEffect(() => {
        if (!clubname || !token) return;

        axios
          .get(`http://localhost:8765/api/profile/average-like-category/${clubname}/workshop`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            setAvg((prevAvg) => [...prevAvg, response.data]); // Append new data to existing array
          })
          .catch((error) => {
            console.error("Error fetching club members:", error);
            alert("Failed to fetch data: " + (error.response?.data?.message || error.message));
          });


      axios
                .get(`http://localhost:8765/api/profile/average-like-category/${clubname}/hackathon`, {
                  headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                  setAvg((prevAvg) => [...prevAvg, response.data]); // Append new data to existing array
                })
                .catch((error) => {
                  console.error("Error fetching club members:", error);
                  alert("Failed to fetch data: " + (error.response?.data?.message || error.message));
                });
      axios
                .get(`http://localhost:8765/api/profile/average-like-category/${clubname}/insights`, {
                  headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                  setAvg((prevAvg) => [...prevAvg, response.data]); // Append new data to existing array
                })
                .catch((error) => {
                  console.error("Error fetching club members:", error);
                  alert("Failed to fetch data: " + (error.response?.data?.message || error.message));
                });
      axios
                .get(`http://localhost:8765/api/profile/average-like-category/${clubname}/quiz`, {
                  headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                  setAvg((prevAvg) => [...prevAvg, response.data]); // Append new data to existing array
                })
                .catch((error) => {
                  console.error("Error fetching club members:", error);
                  alert("Failed to fetch data: " + (error.response?.data?.message || error.message));
                });
      axios
                .get(`http://localhost:8765/api/profile/average-like-category/${clubname}/entertainment`, {
                  headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                  setAvg((prevAvg) => [...prevAvg, response.data]); // Append new data to existing array
                })
                .catch((error) => {
                  console.error("Error fetching club members:", error);
                  alert("Failed to fetch data: " + (error.response?.data?.message || error.message));
                });

      }, [clubname, token]);



      const desktopOS = [
       {
         label: 'workshop',
         value: avg[0],
       },
       {
         label: 'hackathon',
         value: avg[1],
       },
       {
         label: 'insights',
         value: avg[2],
       },
       {
         label: 'quiz',
         value: avg[3],
       },
       {
         label: 'entertainment',
         value: avg[4],
       },
     ];
    return <div className="py-6 bg-white rounded-lg p-5 flex dark:bg-gray-700 ">
           <PieChart 
      series={[
        {
          data: desktopOS,
          highlightScope: { fade: 'global', highlight: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
          valueFormatter,
        },
      ]}
      height={300} // Increased height
  width={490}  // Optionally set width
    />
        </div>;
 };
 export default DonutChart;