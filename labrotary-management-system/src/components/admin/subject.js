import teacher from "../images/teachericon.png";
import student from "../images/studenticon.jpg";
import { Link,useLocation ,useNavigate} from "react-router-dom";


import "../main.component.css"

const Subjectedit = ()=>{
   const location = useLocation();
   const navigate = useNavigate();
    const  logout = async () => {
        localStorage.removeItem("authToken");
        window.location.reload();   
      }
      const backhandler = () =>{
        navigate(-1)
      }
    return (
        <div>
            <h3>welcome to {location.state.name } edit </h3>
            <button onClick={( ) => {backhandler() }}>back</button>
        <div className="main">
        <Link to='/adminlogin/admindashboard/subjectedit/teacheredit' state={{ id : location.state.id ,name :location.state.name }}> <img   className="im1" src={teacher} alt=""></img></Link>      
        <Link to='/adminlogin/admindashboard/subjectedit/studentedit' state={{ id : location.state.id ,name :location.state.name }} ><img  className="im2" src={student} alt=""></img>   </Link>  
        </div>
        <button  onClick={logout} >logout</button>
   </div>
        
    );
};

export default Subjectedit;