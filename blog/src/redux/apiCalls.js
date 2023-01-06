import axios from "axios"
import { useDispatch, useSelector } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "./useSlice";


export const login = async(dispatch, user)=>{
   return async()=>{
       try {
           dispatch(loginStart())
           const res = await axios.post("/auth/signin", user)
           dispatch(loginSuccess(res.data))
           



       } catch (err) {
           console.log(err);
           dispatch(loginFailure(err.response.data))
       }

   }

   
}