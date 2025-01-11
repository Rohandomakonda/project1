const Card=({data})=>{
    return <div className="bg-white p-6 rounded-2xl flex items-center gap-4 dark:bg-gray-800 dark:text-gray-400">
        <span className={`${data.bgColor} px-3 py-6 text-2xl rounded-2xl dark:bg-gray-600`}>
            <data.icon/>
        </span>
        <div>
            <h2 className="text-xl">
                <span className="text-2xl font-bold">{data.count}</span>
            </h2>
            <p className="font-bold">{data.title}</p>
        </div>
    </div>
}
export default Card;