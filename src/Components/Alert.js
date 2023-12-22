import React, {useContext, useEffect} from 'react'
import userContext from '../Contexts/user/userContext'


const Alert = () => {
    const context = useContext(userContext);
    const {alert} = context;
    useEffect(()=>{
        if(alert){
            document.getElementById('alert').style.scale = '1';
        }
    }, [alert])
  return (
      alert &&
        <div id='alert' className={`alert ${alert.type}`}>
            <div className="alert-msg" style={{color:'white'}}>{alert.msg}</div>
        </div>
  )
}

export default Alert
