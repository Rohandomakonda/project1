const Item=({event})=>{
return <div className="flex gap-5 items-center">
    <span className="bg-gray-300 text-gray-700 p-2 rounded-s-lg h-16 w-16 font-bold text-center">{event.date}</span>
    <div>
        <h1 className="text-xl font-bold">{event.title}</h1>
        <p className="text-gray-400">{event.description}</p>
    </div>
</div>;
};
export default Item; 