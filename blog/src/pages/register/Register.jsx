import axios from "axios";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./register.scss";

const Register = () => {
    const navigate = useNavigate();
    const [err, setError] = useState(false)
    const [user, setUser] = useState({
        username:"",
        email:"",
        password:"",

    })


    const handleInputs = (e)=>{
        setUser((prev)=>{
            return {...prev, [e.target.name]:e.target.value}
        });
    } 
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const res = await axios.post("/auth/signup", user) ;
            setError(false)
            if(res.status == 200){
                navigate("/login")
            }else{
                navigate("/register")
            }


        }catch(err){
            console.log(err.response.data.message)
            setError(true)
            
        }
    }
  return (
      <div className="auth">
          <h1 className="">Register</h1>
          <form action="" onSubmit={handleSubmit}>
              <input type="text" name="username" id="" onChange={handleInputs} placeholder="username" />
              <input type="password" name="password" onChange={handleInputs} placeholder="Password" />
              <input type="email" name="email" id="" onChange={handleInputs}  placeholder="Email"/>
              <button className="RegisterBtn" >Register</button>
              <span style={{color:"red"}}>{err && "something went wrong!"}</span>
              <span>Don't you have an account? <Link to="/Login" >Login</Link> </span>
          </form>
      </div>
  )
}

export default Register