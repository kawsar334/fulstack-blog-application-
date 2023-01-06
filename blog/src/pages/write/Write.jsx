import Footer from "../../components/footer/Footer"
import Navbar from "../../components/navbar/Navbar"
import "./write.scss"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Write = () => {
  const { currentUser } = useSelector((state) => state.user)
  console.log(currentUser.user.username)


  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [categories, setCategories] = useState('');
  const [file, setFile] = useState(null)
  const cat = categories.split(",")
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();
   
    const handlePost = async(e)=>{
      e.preventDefault(); 
      const newPost = {
        username:currentUser.user.username,
        userId:currentUser.user._id,
        title, desc, categories:cat, 
      }
      if(file){
        const filename = Date.now() + file.name ;
        const data =new FormData();
        data.append("name",filename ) ;
        data.append("file", file); 
        newPost.photo=filename ;
        try{
           await axios.post("/upload",data)
         
        }catch(err){
          console.log(err.response.data) ;
        }
      }
      try{  
        const res = await axios.post("/post/create/", newPost)
        if (res.status === 200) {
          navigate(`/?cat=${cat}`)
        }
        setError(false)
      }catch(err){
        setError(true)
      }
    } 
  return (
    <div className="write">
        <Navbar />
        <div className="writeWrapper">
        <form className="content" onSubmit={handlePost}>
    <input type="text" name="title" id=""placeholder="Title "onChange={(e)=>setTitle(e.target.value)} />
          <input type="text" name="categories" onChange={(e)=>setCategories(e.target.value)} placeholder="write category using comma" />
           <input type="text" name="desc" placeholder="description" onChange={(e)=>setDesc(e.target.value)}/>
           <label htmlFor="file">Upload file</label>
           <input type="file" name="file" id="file"onChange={(e)=>setFile(e.target.files[0])} /> 
           {error&& <span style={{color:"crimson"}}>Something went wrong !</span>}
      <button className="write_btn" >SUBMIT</button>
    {/* <div className="editorContainer">
        <ReactQuill className="editor" theme="snow" value={value} onChange={setValue} />
    </div> */}
</form>
<div className="menu">
   <div className="img">
            {file ? <img src={URL.createObjectURL(file)} alt="" /> : <img src="https://images.pexels.com/photos/581222/pexels-photo-581222.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />}
   </div>
</div>
 </div>
        <Footer />
    </div>
  )
}

export default Write