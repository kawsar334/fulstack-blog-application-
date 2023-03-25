import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Footer from "../../components/footer/Footer"
import Navbar from "../../components/navbar/Navbar"
import "./home.scss" ;
import axios from "axios";
const Home = () => {
  const PF = "http://localhost:4001/images/";
  const [posts, setPosts] = useState([])
  const cat = useLocation().search
  useEffect(()=>{
    const getPost = async()=>{
      try{
        const res = cat  ? await axios.get(`/post/${cat}`) : await axios.get(`/post/}`);
       setPosts(res.data)
      }catch(err){
        console.log(err.response.data) ;
      }
    }
    getPost(); 
    
  },[cat])
  return (
    <div className="home">
      <Navbar />
        <div className="homeWrpper">
          <div className="posts">
            {posts.map((post)=>{
             return(
               <Link to={`/post/${post._id}`} className="post" key={post.id}>
               <div className="img">
                 <img src={PF + post.photo} alt="Loading..."/>
               </div>
               <div className="content">
                 <Link to={`/post/${post._id}`}>
                   <h1 className="postTitle">{post.title}</h1>
                 </Link>
                 <p className="postDesc">{post.desc}</p>
                 <button>Read more</button>
               </div>
              </Link>)
            })}
          </div>
        </div>
        <Footer />
    </div>
  )
}

export default Home