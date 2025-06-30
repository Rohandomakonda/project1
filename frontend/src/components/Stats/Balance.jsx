import { FiSend } from "react-icons/fi";
import Title from "../../ui/Title";
import  BarChart  from "./BarChart";
const Balance=({darkMode})=>{
    return (<div className="bg-white p-5 rounded-2xl dark:bg-gray-800 dark:text-gray-300 flex-1">
        <div className="flex justify-between items-center">
          <Title>Likes</Title>
          <FiSend className="bg-gray-500 p-2 rounded-full text-gray-300 w-8 h-8"/>
          
        </div>
      
        <BarChart darkMode={darkMode}/>
    </div>
    );
};
export default Balance;