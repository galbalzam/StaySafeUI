import { useSelector } from "react-redux"
import Login from "../Auth/Login/Login";

const AuthWrapper = (props) => {
    const authState = useSelector(state => state.userData)
    console.log(authState)
    if(!authState.isAuthenticated){
        return (
            <div>
                <Login />
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
