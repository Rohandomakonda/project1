import Balance from "./Balance";
import Card from "./Card.jsx";
import { useState, useEffect } from "react";
import axios from "axios";
import { IoIosPerson} from "react-icons/io";
import FavoriteIcon from '@mui/icons-material/Favorite';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

const Stats = ({ darkMode }) => {
  const [employeesData1, setEmployeesData1] = useState([]);
  const [prevten, setPrevten] = useState([]);
  const [totalevents,setTotalevents]=useState();
  const clubname = localStorage.getItem("club");
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (!clubname || !token) return;

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/profile/get-club-total-members/${clubname}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setEmployeesData1(response.data);
      })
      .catch((error) => {
        console.error("Error fetching club members:", error);
        alert("Failed to fetch data: " + error.response?.data?.message);
      });
  }, [clubname, token]);


   useEffect(() => {
      if (!clubname || !token) return;

      axios
        .get(`${process.env.REACT_APP_API_URL}/api/profile/get-club-total-events/${clubname}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setTotalevents(response.data);
        })
        .catch((error) => {
          console.error("Error fetching club members:", error);
          alert("Failed to fetch data: " + error.response?.data?.message);
        });
    }, [clubname, token]);


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

let average = 0; // Use let instead of const
if(prevten.length>0){
    for (let i = 0; i < prevten.length; i++) {
        average += prevten[i].likes; // Accumulate likes instead of overwriting
    }

    average = average / prevten.length; // Use property instead of function

    }


  const employeesData2 = [
      {
        title: "Total members",
        icon: IoIosPerson,
        count: employeesData1.length,
        bgColor: "bg-gray-100",
      },
      {
        title: "Average Likes",
        icon: FavoriteIcon,
        count: Math.floor(average),
        bgColor: "bg-blue-100",
      },
      {
        title: "Total Events",
        icon: EventAvailableIcon,
        count: totalevents,
        bgColor: "bg-yellow-100",
      },
    ];

  return (
    <div className="flex flex-col md:flex-row gap-5">
      <div className="flex flex-col gap-4 h-full">
        {employeesData2.map((data, index) => (
          <Card key={index} data={data} />
        ))}
      </div>

      <Balance darkMode={darkMode} />
    </div>
  );
};

export default Stats;
