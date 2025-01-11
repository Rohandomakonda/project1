import Chart from "react-apexcharts";

const BarChart = ({ darkMode }) => {
  const chartConfig = {
    series: [
      {
        name: "Likes",
        data: [50, 40, 300, 320, 500, 350, 200, 230, 500, 100],
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
        categories: [
          "Title1",
          "Title2",
          "Title3",
          "Title4",
          "Title5",
          "Title6",
          "Title7",
          "Title8",
          "Title9",
          "Title10",
        ],
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
