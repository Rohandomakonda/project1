 import userLogo from "../../responsive-dashboard-with-dark-mode/assets/user01.png";
 const User=()=>{
    const user_name = localStorage.getItem("name");
    return <div
    className="flex gap-3 items-center rounded-full bg-white p-4   dark:bg-gray-700 dark:text-gray-300">
        <img src={userLogo} alt="sec-image" className="w-14 h-14 rounded-full"/>
        <div>
           
            <h3 className="font-semibold text-2xl">{user_name}</h3>
            <p>club-sec</p>

        </div>
    </div>;
 };
 export default User;