import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { logout } from "../../redux/auth.reducer";

const Logout = () => {
    const dispatch = useDispatch();
    const history = useHistory()

    useEffect(() => {
        dispatch(logout())
        history.push('/')
    }, [])
    return (
        <div>
            <label>Logging you out ... reRouting ... </label>
        </div>
    )
}

export default Logout
