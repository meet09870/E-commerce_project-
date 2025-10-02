import { useContext } from "react"
import { Navigate } from "react-router-dom";
import { AuthContext } from "./common/context/Auth";
export const RequireAuth =({children})=>{
    const {user} = useContext(AuthContext);
    if(!user){
        return <Navigate to={`/LoginUser`}/>
    }

    return children;

}