import { Link} from "react-router-dom";
import React from 'react';
import img1 from "./images/studentlogin.jpg" ;
import img2 from "./images/teacherlogin.jpg";
import admin from "./images/admin.png";

import "./main.component.css"

function Main() {
  return (
  
    <div className="main" >
         
         <Link to='/adminlogin'><img className="im1" src={admin} alt=""></img>    </Link>
        <Link to='/Studentlogin'><img  className="im2" src={img1} alt=""></img>   </Link>  
        <Link to='/Teacherlogin'><img className="im3" src={img2} alt =""></img></Link>  
         
         
        
    </div>
 

    );
};

export default Main;