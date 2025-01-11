import  Balance  from "./Balance";
import {empolyeesData} from "../../responsive-dashboard-with-dark-mode/constants";
import Card from "./Card.jsx";
const Stats=({darkMode})=>{
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