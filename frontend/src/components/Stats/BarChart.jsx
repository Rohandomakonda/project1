import Chart from "react-apexcharts"; // Importing the chart library
import { useState, useEffect } from "react"; // React hooks for state and lifecycle
import axios from "axios"; // To make API requests

const BarChart = ({ darkMode }) => {
    const clubname = localStorage.getItem("club");
     const token = localStorage.getItem("authToken");
     const [prevten, setPrevten] = useState([]);
      useEffect(() => {
           if (!clubname || !token) return;

           axios
             .get(`${process.env.REACT_APP_API_URL}/api/profile/previous-ten/${clubname}`, {
               headers: { Authorization: `Bearer ${token}` },
             })
             .then((response) => {
               setPrevten(response.data);
             })
             .catch((error) => {
               console.error("Error fetching club members:", error);
               alert("Failed to fetch data: " + error.response?.data?.message);
             });
         }, [clubname, token]);

const titles = prevten.map(event => event.title);
const likes = prevten.map(event => event.likes);


  const chartConfig = {
    series: [
      {
        name: "Likes",
        data: likes,
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 240,
        toolbar: {
          show: false,
        },
      },
      title: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#4299E1"], // Set bar color to dark purple
      plotOptions: {
        bar: {
          columnWidth: "40%",
          borderRadius: 2,
        },
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: darkMode ? "#dddddd" : "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: titles,
      },
      yaxis: {
        labels: {
          style: {
            colors: darkMode ? "#dddddd" : "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#a0a0a0",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
    },
  };

  return (
    <div  >
      <Chart
        options={chartConfig.options}
        series={chartConfig.series}
        type="bar"
        height={300}
      />
    </div>
  );
};

export default BarChart;
