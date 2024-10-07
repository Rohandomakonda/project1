import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
 
function Form(){
    const [details,setFunction]=React.useState({
       description : "",
       date: "",
       time: "",
       venue: "",
    });
    function handleSubmit(){
      //database update
      const handleSubmit = (e) => {

        e.preventDefault();
        axios
          .post("http://localhost:8080/addevent",details)
          .then((resp) => {
            console.log(resp.data);
          })
          .catch((error) => {
            console.log(error);
          });
        console.log("handleSubmitted");

      };

    }
    function change(event){
        const {name,value}=event.target;
        setFunction(prevValue=>{
            if(name==="description"){
                return{
                    description: value,
                    date: prevValue.date,
                    time: prevValue.time,
                    venue: prevValue.venue,
                   
                }
            }
            else if(name==="date"){
                return{
                    description: prevValue.description,
                    date: value,
                    time: prevValue.time,
                    venue: prevValue.venue,
                   
                }
            }
            else if(name==="time"){
                return{
                    description: prevValue.description,
                    date: prevValue.date,
                    time: value,
                    venue: prevValue.venue,
                    
                }
            }
           else if(name==="venue"){
                return{
                    description: prevValue.description,
                    date: prevValue.date,
                    time: prevValue.time,
                    venue: value,
                  
                }
            }
        });
    }
 


    return (
        <form onSubmit={handleSubmit}>
          <input method="POST"
            onChange={change} 
            placeholder="description" 
            name="description" 
            value={details.description} 
          />
          <input method="POST"
            onChange={change} 
            placeholder="date" 
            name="date" 
            value={details.date} 
          />
          <input method="POST"
            onChange={change} 
            placeholder="time" 
            name="time" 
            value={details.time} 
          />
          <input method="POST"
            onChange={change} 
            placeholder="venue" 
            name="venue" 
            value={details.venue} 
          />
          <button type="submit">Submit</button>
        </form>
      );
}
export default Form;

//description time place duration