import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import "./Page1.styles.css"
function Form(){
    const [details,setFunction]=React.useState({
       description : "",
       date: "",
       time: "",
       venue: "",
    });
    const navigate = useNavigate();
      //database update
      const handleSubmit = (e) => {

        e.preventDefault();
        axios
          .post("http://localhost:8080/addevent",details)
          .then((resp) => {
            console.log(resp.data);
          })
          .catch((error) => {
            alert(error);
          });
        alert("Submitted");
        navigate("/");
      };


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

          <input
            onChange={change}
            placeholder="description"
            name="description"
            value={details.description}
          />
          <input
            onChange={change}
            placeholder="date"
            name="date"
            value={details.date}
          />
          <input
            onChange={change}
            placeholder="time"
            name="time"
            value={details.time}
          />
          <input
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

