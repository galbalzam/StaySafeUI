import { useSelector } from "react-redux"
import Login from "../../pages/Login/Login";
import AuthLanding from "./AuthLanding";

const AuthWrapper = (props) => {
    const authState = useSelector(state => state.userData)
    if(!authState.isAuthenticated){
        return (
                <AuthLanding />
        )
    }
    return props.children
        
    
}

export default AuthWrapper
