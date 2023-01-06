import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import { Navigate, NavLink, useLocation, useNavigate } from "react-router-dom"
import Footer from "../../components/footer/Footer"
import Menu from "../../components/menu/Menu"
import Navbar from "../../components/navbar/Navbar"
import "./singlepage.scss" ;

const SinglePage = () => {
    const PF = "http://localhost:4001/images/";
    const [model , setModel] = useState(false)
    const [post, setPost] = useState({})
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState({}) ;
    const [title, setTitle] = useState('');
    const [desc, setDesc] =useState("") ;
    const id = useLocation().pathname.split("/")[2]
    const [error, setError] =useState("");
    const [updateError, setUpdateError] = useState("")
    const navigate  = useNavigate();
    
    useEffect(()=>{
        const getSinglePost = async()=>{
            try{
                const res = await axios.get(`/post/find/${id}`)
                setPost(res.data) ;
            }catch(err){
                console.log(err.response.data);
            }
        }
        getSinglePost();
    },[id]) ;
// handling delete function
    const handleDelet =async (postId) =>{
        try{
            const res = await axios.delete(`/post/${postId}`) ;
            if(res.data){
                navigate("/")
            }
        }catch(err){
            setError(err.response.data)
        }
    }


    //handling recomended post
    useEffect(()=>{
        const getPost = async()=>{
            const res = await axios.get("/post/recomended");
            setPosts(res.data)

        }
        getPost();
    }) ;

    useEffect(()=>{
        const getUser= async()=>{
            try{
                const res = await axios.get(`/user/find/${post.userId}`)
               setUser(res.data)

            }catch(err){
                console.log(err.response.data)
            }
            

        }
        getUser();
    },[post.userId]) ;

    //handleUpdate

    const handleUpdate =async(id)=>{
        try{
            const res = await axios.put(`/post/${id}`,{title, desc} ) ;
            console.log(res.data) ;
            if(res.status == 200){
                window.location.reload();
            }

        }catch(err){
            setUpdateError(err.response.data)
        }
    }

  return (
    <div className="singlepage">
        <Navbar />
<div className="singlepageWrapper">
    <div className="content">
                  <img src={ PF+ post.photo} alt="Loading..." />

                 {!model &&<div className="user">
                      <img src={ PF+user?.profilePicture} alt="" />
                      <div className="info">
                          <NavLink to={`/profile/${post.userId}`} >
                          <span>{post?.username} </span>
                        </NavLink>
                          <p>{post.createdAt} </p>
                      </div>
                      <div className="edit">
                          {/* <NavLink to={`/edit/${post._id}`} > */}
                            <i class="fa-regular fa-pen-to-square" style={{cursor:"pointer"}} onClick={()=>setModel(!model)}></i>
                            {/* </NavLink> */}
                          <NavLink to="#" onClick={()=>handleDelet(post._id)}><i class="fa-solid fa-trash"></i></NavLink>
                          {error&& <span style={{color:"crimson",textTransform:"capitalize" }}>{error}</span>}
                      </div>
                  </div>}

                 {model? <div className="update_container">
                    <input type="text" placeholder="Title"onChange={(e)=>setTitle(e.target.value)} />
                      <input type="text" placeholder="desc" className="desc" onChange={(e) => setDesc(e.target.value)} />
                      <span className="close" onClick={()=>setModel(!model)}>x</span>
                      {updateError && <span style={{ color: "crimson", textTransform: "capitalize" }}>{updateError}</span>}
                      <button onClick={()=>handleUpdate(post._id)} >Update</button>
                 </div>:
                    <> <h1 >{post.title} </h1>
                      <p>{post.desc}</p></>}
    </div>
    <div className="menu">
            <Menu posts={posts} />
    </div>
</div>
        <Footer />
    </div>
  )
}

export default SinglePage