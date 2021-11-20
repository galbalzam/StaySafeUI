import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { logout } from "../../redux/auth.reducer";

const Logout = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const [cookies, setCookie, removeCookie] = useCookies([]);
    useEffect(() => {
        dispatch(logout())
        removeCookie('user-data')
        history.push('/')
    }, [])
    return (
        <div>
            <label>Logging you out ... reRouting ... </label>
        </div>
    )
}

export default Logout
