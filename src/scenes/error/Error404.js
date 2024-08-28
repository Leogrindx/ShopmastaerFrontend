import React from 'react'
import {Link} from 'react-router-dom'
import s from './Error.module.scss'
const Error404 = () => {
    return(
        <div className={s.error404}>
            <h1>Error 404</h1>
            <h3>something went wrong</h3>
            <Link to="/"><button>return to home page</button></Link>
        </div>
    )
}

export default Error404