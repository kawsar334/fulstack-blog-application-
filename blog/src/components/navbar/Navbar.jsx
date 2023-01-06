import "./navbar.scss"

import {Link, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { logOut } from "../../redux/useSlice";
const Navbar = () => {
    const user = useSelector((state) => state.user.currentUser.user) ;
    const navigate =useNavigate(); 
const dispatch = useDispatch();
   
        const handleLogOut = ()=>{
            dispatch(logOut())
            // window.location.reload()
            navigate("/") ;
            
        }
   

  return (
    <div className="navbar">
        <div className="navbarContainer">
           <Link to="/" className="logo">
                <img src="/logo.png" alt="" className="logoImg" />
             </Link>
            <div className="links">
              { user &&<>
            <Link to="/?cat=music" >
                <h6>MUSIC</h6>
            </Link>
                  <Link to="/?cat=life" >
                      <h6>LIFE</h6>
                  </Link>
                  <Link to="/?cat=scince" >
                      <h6>SCINCE</h6>
                  </Link>
                  <Link to="/?cat=cinema" >
                      <h6>CINEMA</h6>
                  </Link>
                  <Link to="/?cat=design" >
                      <h6>DESIGN</h6>
                  </Link>
                  <Link to="/?cat=food" >
                      <h6>FOOD</h6>
                      </Link> </>}
                 {!user ?<>
                      <Link to="/register" >
                          <h6>Signup</h6>
                      </Link>
                      <Link to="/login" >
                          <h6>Signin</h6>
                      </Link>

                 </>: <>
                          <Link to={`/profile/${user._id}`} style={{ color:"#d54907", fontWeight:"600"}}> <span>{user.username} </span></Link>
                          <span onClick={handleLogOut}>Logout</span></>}
                  <span className="write">
                  <Link to="/write" >Write</Link>
                  </span>
            </div>

        </div>
    </div>
  )
}

export default Navbar