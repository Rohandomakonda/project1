const Member=({user})=>{
return <div className="flex justify-between items-center">
    <div className="flex items-center gap-3">
        {/* <img src={user.image} alt={user.name}
        className="w-12 h012 rounded-full flex"/> */}
        <div>
            <h2 className="font-bold">{user.name}</h2>            
        </div>
        
    </div>
    <span className="p-3 rounded-full text-xs text-gray-700 font-semibold dark:bg-gray-500 dark:text-gray-300">club-member</span>
</div>
};
export default Member; 