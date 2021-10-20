import React from 'react'
import Button from '@mui/material/Button'
import Login from '../../pages/Login/Login'
import Register from '../../pages/Register/Register'

const AuthLanding = () => {
    const [isRegistered, setIsRegistered] = React.useState({
        state: true,
        content: "You Can Also Register!"
    })
    const handleChangeViewClick = () =>{
        if(isRegistered.state)
        setIsRegistered({
            state: false,
            content: "Already a memeber? Login!"
        })
        else
        setIsRegistered({
            state: true,
            content: "You Can Also Register!"
        })
    }
    return (
        <>
            {
                isRegistered.state ? <Login
                changeStateButton={
                  (  <Button  variant="outlined" color="primary" onClick={handleChangeViewClick}>
        {isRegistered.content}
      </Button>)
                }
                /> : <Register
                changeStateButton={
                    (  <Button  variant="outlined" color="primary" onClick={handleChangeViewClick}>
          {isRegistered.content}
        </Button>)
                  }
                />
            }
            
        </>
    )
}

export default AuthLanding
