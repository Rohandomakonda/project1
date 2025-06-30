import Main from "./ui/Main";
import Content from "./ui/Content";
import Profile from "./components/Profile/Profile";
import Stats from "./components/Stats/Stats";
import {useState} from "react";
import Team from "./components/Team/Team";
import Event from "./components/Event/Event";
const DashBoard=()=>{
    const [darkMode,setDarkMode]=useState(true);
    const toggleDarkMode=()=>{
        setDarkMode(!darkMode);
    };
    return (<Main>
        <Content>
           <Stats darkMode={darkMode}/> 
           <div className="flex flex-col gap-3 lg:flex-row">
            <Team/>  
            <Event />
           </div>
        </Content>
        <Profile/>
        </Main>
    );
}
export default DashBoard; 