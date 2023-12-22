// import {useContext} from 'react'
import { useState } from 'react';
import userContext from './userContext'

const UserState = (props)=>{

    const [alert, setAlert] = useState(null);
    const showAlert = (type, msg)=>{
        setAlert({state: true, type, msg})
        setTimeout(() => {
            setAlert(null)
        }, 2000);
    }

    return(
        <userContext.Provider  value = {{showAlert, alert}}>
            {props.children}
        </userContext.Provider>
    )
}

export default UserState;