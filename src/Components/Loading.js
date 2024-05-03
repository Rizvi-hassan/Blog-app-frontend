import React, { useContext } from 'react'
import userContext from '../Contexts/user/userContext'

const Loading = () => {
    const context = useContext(userContext);
    const { loading } = context;
    return (
        <>

            {loading ?
                <div className='loader'>
                    <p className='load-text'>Loading
                        <span className="load-dots" id="dot1"></span>
                        <span className="load-dots" id="dot2"></span>
                        <span className="load-dots" id="dot3"></span>
                    </p>
                    <div className='loading'></div>
                </div> : null}
        </>
    )
}

export default Loading
