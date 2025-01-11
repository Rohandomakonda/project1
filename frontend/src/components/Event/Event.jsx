import Title from "../../ui/Title";
import {events} from "../../responsive-dashboard-with-dark-mode/constants";
import Item from "./Item";
const Event=()=>{
return <div className="bg-white p-5 rounded-2xl dark:bg-gray-600 dark:text-gray300 flex-1 flex flex-col gap-5">
    <Title>Upcoming Events</Title>
    {events.map((event,index)=>{
        return <Item key={index} event={event}/>
    })}
    </div>
};  
export default Event; 