import Title from "../../ui/Title";
//import {users} from "../../responsive-dashboard-with-dark-mode/constants";
import Member from "./Member";
import { useState,useEffect } from "react";
import axios from "axios";

const Team=()=>{
    const [users,setUsers] = useState([]);
    const token = localStorage.getItem("authToken");
    const clubname = localStorage.getItem("club");
    useEffect(()=>{
      axios
        .get(`http://localhost:8765/api/profile/get-club-total-members/${clubname}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => {
          setUsers(response.data);
          alert("Event saved successfully!");
        })
        .catch((error) => {
          console.error("Error saving event:", error);
          alert("Failed to save event: " + error.response?.data?.message);
        });
    },[])

    return (
    <div className="bg-white p-3 rounded-2xl dark:bg-gray-800 dark:text-gray-400 flex-1 flex flex-col gap-5">
        <Title>Team</Title>
        {users.map((user,index)=>{
          return  <Member key={index} user={user}/>
        })}
    </div>
    );
};
export default Team;