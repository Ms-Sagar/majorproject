import React, { useState,useEffect } from "react";
import axios from "axios";
import { useLocation,useNavigate} from "react-router-dom";
import deleteimg from  "../images/deleteimg.jpg";
import Registerteacher from "./register.teacher";
import Addteacher from "./teacher.add";
import ReactDOM from 'react-dom';
import Editteacher from "./teacher";


const Teacheredit = () =>{
    const location = useLocation();
    const navigate = useNavigate();
    const [gotoregister, setgotoreg] = useState(false);
    const [error, setError] = useState("");
    const [teachers,setteachers]=useState([]);
    const [gotoedit,setgotoedit]=useState(false);
    const [prop,setprop]=useState({});


    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
  

    const  logout =  () => {
      
        localStorage.removeItem("authToken");
        window.location.reload();
          
      }
      const successShow = (data) =>{
        setteachers(data.data['teacher'])
      
    }
      useEffect(() => {

          try{
            axios.get("http://localhost:5000/api/auth/admin/getteacher",{ params: { params: location.state.id } }).then((response) =>
          successShow(response)
          );
          }
            catch (error) {
              setError(error.response.data.error);
              setTimeout(() => {
                setError("");
              }, 5000);
            }
      }
      ,[location.state.id]);
      const backhandler = () =>{
        navigate(-1)
      }
      const  edithandler = (_id) =>{
     setprop({
      "id":_id,
     })
     setgotoedit(true)

      }
      const  deleteteacher = async (_id) => {
        if(window.confirm("Are u sure?") ===false){
          return
        }
      try{
        const { data } = await axios.post( 'http://localhost:5000/api/auth/teacher/delete' , 
      { _id },
      config
    );
      window.alert(data)
      window.location.reload();
      }
      catch (error) {
        setError(error.response.data.error);
        setTimeout(() => {
          setError("");
        }, 5000);
      }  
    }

    const removeteacher = async (_id)  => {
      try{
        const subid = location.state.id
       
        const { data } = await axios.post( 'http://localhost:5000/api/auth/teacher/remove' , 
      { _id ,subid},
      config
    );
    window.alert(data)
    window.location.reload()
     
      }
      catch (error) {
        setError(error.response.data.error);
        setTimeout(() => {
          setError("");
        }, 5000);
      }  
    }
    const  registerteacher = async () => {
      setgotoreg(true)
    }
    const  addteacher =  () => {
      var btn=document.getElementById("removeonclick")
      btn.remove()
      ReactDOM.render(
        <React.StrictMode>
          <Addteacher id={location.state.id} />
        </React.StrictMode>,
        document.getElementById('addteacher')
      );
      
  }
    return(
    <div>
      {gotoedit ?<Editteacher data={prop}/ >:<div>
      {gotoregister ? <Registerteacher id={location.state.id} name={location.state.name}  />: <div>
      <h4>welcome to teacher edit </h4>
      {error && <span className="error-message">{error}</span>}
      <button onClick={()=>backhandler()}>back</button>
      <ul>
     
      <button onClick={()=>registerteacher()}>Register Teacher</button>  
      <div id ="addteacher">
        </div>
        <button id="removeonclick" onClick={()=>addteacher()}>ADD Teacher</button> 
       
     <table rules="all"><thead>
    <tr>
    <th>name</th>
    <th>delete</th>
    <th>remove</th>

   
    </tr>
    </thead>
       
     </table> 
    {teachers.map(({_id }) => (
     <table key={_id._id} rules="all"><tbody>
       <tr >
    <td><button onClick={()=>edithandler(_id)}>{_id.name}</button></td>
    <td><button onClick={() => {deleteteacher(_id._id)}} ><img className="imgs" src={deleteimg} alt=" " ></img></button> </td>
    <td><button onClick={() => {removeteacher(_id._id)}} >remove</button> </td>
  
    </tr>
     </tbody>
    
     </table> 
    ))
    }
  </ul>
  <button  onClick={logout} >logout</button>

  </div>}
      </div>  }
    </div>
    );
};

export default Teacheredit;