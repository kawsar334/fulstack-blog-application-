import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import Footer from "../../components/footer/Footer"
import Navbar from "../../components/navbar/Navbar"
import { logOut } from "../../redux/useSlice"
import "./profile.scss"

const Profile = () => {
  const id = useLocation().pathname.split("/")[2] ;
  const [user, setUser] = useState({}) ;
  const [userPosts, setUserPosts] = useState([]);
  const PF = "http://localhost:4001/images/";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(()=>{
    const getUserData = async()=>{
      try{
        const res = await axios.get(`/user/find/${id}`) ;
        setUser(res.data)

      }catch(err){
        console.log(err.response.data)
      }

    }
    getUserData();

  },[id])


  // / find post getbyuser
  useEffect(()=>{
    const getUserPosts = async()=>{
      try{
        const res = await axios.get(`/post/getbyuser/${id}`);
        setUserPosts(res.data)

      }catch(err){
      console.log(err.response.data)
      }
    }
    getUserPosts();

  },[id]) 


  const handleDelete = async(e)=>{
    e.preventDefault();
    try{
      const res = await axios.delete(`/user/${id}`)
      console.log(res.data);
      dispatch(logOut())
      if(res.status ==200){
        navigate("/login") ;
      }

    }catch(err){
      console.log(err.response.data)
    }
  }


  return (
    <>
      <Navbar />
      <div className="profile">
        <div className="profile_left">
          <h1> Profile information </h1>
          <h1> Name:{user?.username}</h1>
          <p> Email:{user?.email}</p>
          <div className="user_img">
          <img src={PF + user.profilePicture} alt="" />
          <button><NavLink to={`/edit/${id}`}>Edit Profile</NavLink></button>
          <button className="deleteBtn" onClick={handleDelete}>Delete account </button>
          </div>          
      </div>
        <div className="profile_right">

            <h1>Post by {user?.username}</h1>          
          <div className="profile_right_container">
            {userPosts.slice(0, 4).map((post) => (
              <NavLink to={`/post/${post?._id}`} key={post?._id} className="post_item">
                <h2 className="postTitle">{post?.title} </h2>
                <div className="img"><img src={PF+post.photo} alt="Loading..." /></div>

              </NavLink>))}
          </div>
        
        
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Profile