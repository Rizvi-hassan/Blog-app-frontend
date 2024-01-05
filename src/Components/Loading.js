import React, { useContext } from 'react'
import userContext from '../Contexts/user/userContext'

const Loading = () => {
    const context = useContext(userContext);
    const { loading } = context;
    return (
        <>
            {(loading) && <div className='loading'></div>}
        </>
    )
}

export default Loading
