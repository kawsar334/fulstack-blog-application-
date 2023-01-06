import { NavLink } from "react-router-dom"
import "./menu.scss"

const Menu = ({posts}) => {
 
  const PF = "http://localhost:4001/images/";



  return (
    <div className="menu">
        <h1>Other Posts you may Like .</h1>
        {posts.map((post)=>(

            <NavLink  to={`/post/${post._id}`}className="post" key={post._id}>
                <img src={PF + post?.photo} alt="Loading" className="postImg" />
                <h2>{post?.title}</h2>
                <button>Read More </button>
            </NavLink>
        ))}
    </div>
  )
}

export default Menu