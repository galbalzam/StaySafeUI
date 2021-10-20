import { useSelector } from "react-redux"
import Login from "../../pages/Login/Login";
import AuthLanding from "./AuthLanding";

const AuthWrapper = (props) => {
    const authState = useSelector(state => state.userData)
    console.log(authState)
    if(!authState.isAuthenticated){
        return (
            <div>
                <AuthLanding />
            </div>
        )
    }
    return (
        <>
            {props.children}
        </>
    )
}

export default AuthWrapper
