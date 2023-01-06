import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { loginFailure, loginStart, loginSuccess } from "../../redux/useSlice";
import "./login.scss" ;

const Login = () => {
  const {user, error, } = useSelector((state) => state.user);

  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = async(e)=>{
    e.preventDefault();
    const user = {email, password}


  try{
    dispatch(loginStart())
    const res = await axios.post("/auth/signin", user);
       dispatch(loginSuccess(res.data))
      if(res.status ==200){
        navigate("/");
      }
      
    

  }catch(err){
    console.log(err.response.data)
    dispatch(loginFailure(err.response.data))
  }

  }

  return (
    <div className="auth">

        <h1 className="">Login</h1>
        <form action="">
            <input type="text" name="email" id="" placeholder="email"  onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button className="loginBtn" onClick={handleLogin}>Login</button>
            {error&&<span style={{color:"crimson", fontWeight:"600",textTransform:"capitalize"}}>{error}</span>}
            <span>Don't you have an account? <Link  to="/register" >Register</Link> </span>
        </form>
    </div>
  )
}

export default Login