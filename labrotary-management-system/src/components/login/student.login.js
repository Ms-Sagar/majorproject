import { useState, useEffect } from "react";
import { useNavigate  } from "react-router-dom";
import axios from "axios";
import "./login.css";


const Student = () => {
  const [usn, setUsn] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  

  useEffect(() => {

    if (localStorage.getItem("authToken")) {
      navigate('studentdashboard',{params:{name:localStorage.getItem("usn")}})
    }
  });

 
 
  const loginHandler = async (e) => {
    e.preventDefault();
    

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post( 'http://localhost:5000/api/auth/student/login' , 
        { usn, password },
        config
      );

      localStorage.setItem("authToken", data.token);
      localStorage.setItem("usn", usn);
      navigate('studentdashboard',{state:{name:usn}});
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="login-screen">
      <form onSubmit={loginHandler} className="login-screen__form">
        <h3 className="login-screen__title" >Student Login</h3>
        {error && <span className="error-message">{error}</span>}
        <div className="form-group">
          <label htmlFor="email">USN:</label>
          <input
            type="text"
            required
            id="email"
            placeholder="USN"
            onChange={(e) => setUsn(e.target.value)}
            value={usn}
            tabIndex={1}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">
            Password:{" "}
          </label>
          <input
            type="password"
            required
            id="password"
            autoComplete="true"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            tabIndex={2}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>

        
      </form>
    </div>
  );
};

export default Student;
