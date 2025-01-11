 import userLogo from "../../responsive-dashboard-with-dark-mode/assets/user01.png";
 const User=()=>{
    return <div
    className="flex gap-3 items-center rounded-full bg-white p-4   dark:bg-gray-600 dark:text-gray-300">
        <img src={userLogo} alt="sec-image" className="w-14 h-14 rounded-full"/>
        <div>
           
            <h3 className="font-semibold text-2xl">user-name</h3>
            <p>club-sec</p>

        </div>
    </div>;
 };
 export default User;