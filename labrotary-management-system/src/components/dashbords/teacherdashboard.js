import React, { useState, useEffect } from "react";
import { Link  } from "react-router-dom";

import axios from "axios";
import "./teacherdashboard.css"


const Teacherdb = (props) => {
    const [subjects, setsubjects] = useState([])
    const [error, setError] = useState("");

    const logout = () => {
        console.log("logout")
        localStorage.removeItem("authToken");
        window.location.reload();

    }
    useEffect(() => {


       try{
       axios.get("http://localhost:5000/api/auth/teacher/getsub", { params: { params: props.name } }).then((response) =>
          setsubid(response));
          
      }
        catch (error) {
            setError(error.response.data.error);
            setTimeout(() => {
              setError("");
            }, 5000);
          }

        

    }, [props.name]);



    const setsubid = (response) => {
              setsubjects(response.data[0]['subject'])
       
    }
 


    return ( 
        <div>
         {error && <span className="error-message">{error}</span>}
        <p> welcome to teacher dashboard {props.name} </p>
        
        <table rules = "all"> 
          <thead>
           <tr>
            <th> subjects </th>
           </tr> 
         </thead>
        </table> 
        {subjects.map(({_id,name}) => (
       <table key={_id} rules="all"><tbody>
         <tr>
             <td><Link to='/teacherlogin/teacherdashboard/subteacher' state={{"name":props.name , "id" : _id ,"subject" : name } }>{name}</Link></td>
       </tr>
       </tbody>
      
       </table> 
      ))
      }
        
         <button onClick = { logout } > logout </button>

           </div>
    );
}
export default Teacherdb;