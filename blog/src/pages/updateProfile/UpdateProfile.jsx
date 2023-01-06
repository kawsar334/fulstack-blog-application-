import axios from "axios";
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import "./updateprofile.scss";
import Footer from "../../components/footer/Footer"
import Navbar from "../../components/navbar/Navbar";

const UpdateProfile = () => {
    const PF = "http://localhost:4001/images/";

    const id = useLocation().pathname.split("/")[2];
    const [user, setUser] = useState({});
   const [username, setUsername] = useState("")
    const [email, setEmail] = useState("") ;
    const [file, setFile] = useState(null)
    const navigate =useNavigate();
    const [error, setError] = useState("")

    //handle update 

    const handleUpdate = async(e)=>{
        e.preventDefault() ;
        const newUser = {
            username,email,
        }

        if(file){
            const filename = Date.now() +file.name ;
            const data = new FormData();
            data.append("name",filename );
            data.append("file", file)
            newUser.profilePicture =filename;
            try{
                const response = await axios.post("/upload", data);
                console.log(response.data)

            }catch(err){
                console.log(err.response.data)
            }
        }
        try{
            const res = await axios.put(`/user/${id}`,newUser);
            console.log(res.data);
            window.location.reload() ;
            setError("")
            navigate("/")

        }catch(err){
            console.log(err.response.data)
            setError(err.response.data)
        }
    }




    useEffect(()=>{
        const getUserData = async()=>{
            try{
                const res = await axios.get(`/user/find/${id}`) ;
                setUser(res.data)
            }catch(err){
                console.log(err.response.data)
            }
        }
        getUserData()

    },[id])
  return (
      <div style={{ background:"cadetblue"}}>
    <Navbar />
        <div className="update">

        <div className="updateWrapper">
           
            <form action="">
                <label htmlFor="file" className="abatar"> 
                      <img src={file ?URL.createObjectURL(file): PF+user.profilePicture} alt="Loading..."/> 
                      <span>Upload avatar <i class="fa-solid fa-arrow-up-from-bracket"></i> </span>       
                </label>
                <input type="file" name="file" id="file" style={{display:"none"}} onChange={(e)=>setFile(e.target.files[0])} />
                  <input type="text" placeholder="Username..."
                  value={username?username: user.username}
                  onChange={(e)=>{setUsername(e.target.value)}}/>
                  <input type="text" 
                  value={email? email : user.email}
                  placeholder="email" onChange={(e)=>setEmail(e.target.value)} />
                      {error && <span style={{ color: "crimson", textTransform: "capitalize" }}>{error}</span>}
                <button onClick={handleUpdate}>UPDATE</button>
            </form>
        </div>

    </div>
    <Footer />
      </div>

  )
}

export default UpdateProfile