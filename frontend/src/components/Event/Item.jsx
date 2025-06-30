const Item=({event})=>{

    
    const months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEPT","OCT","NOV","DEC"];

    const month = (event.date[5]-'0')*10+(event.date[6]-'0');
    const date = (event.date[8]-'0')*10+(event.date[9]-'0');

    const finalMonth = months[month-1];

return <div className="flex gap-5 items-center">
    <span className="bg-gray-300 text-gray-700 p-2 rounded-s-lg h-16 w-16 font-bold text-center">{date} {finalMonth}</span>
    <div>
        <h1 className="text-xl font-bold">{event.title}</h1>
    </div>
</div>;
};
export default Item; 