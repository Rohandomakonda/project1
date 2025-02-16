import  Balance  from "./Balance";
import {empolyeesData} from "../../responsive-dashboard-with-dark-mode/constants";
import Card from "./Card.jsx";
import {useState,useEffect} from "react";
import axios from "axios";
const Stats=({darkMode})=>{
    const [empolyeesData,setEmpolyeesData] = useState([]);
    
    

    
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


    useEffect(()=>{
        
    },[users])
   
    return (
        <div className="flex flex-col md:flex-row gap-5">
        <div className="flex flex-col gap-4 h-full">
            {empolyeesData.map((data,index)=>{
               return (<Card key={index} data={data}/>);
            })}
        </div>
        
        <Balance darkMode={darkMode} />
    </div>);
};
export default Stats;