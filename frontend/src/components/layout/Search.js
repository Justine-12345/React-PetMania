import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import {useParams} from 'react-router-dom'
const Search = () => {

    const [keyword, setKeyword] = useState('');
    let navigate = useNavigate();    

    const searchHandler = (e) => {
        e.preventDefault()
        if (keyword.trim()) {
            navigate(`/search/${keyword}`)
        } else {
            navigate('/')
        }
    }

    let {keyword:key} = useParams()


    return (
       
       <form onSubmit={searchHandler} className="navbar-form form-inline">
            <div className="input-group search-box">                                
                <input type="text" id="search" className="form-control" defaultValue={key&&key} placeholder="Search here..." onChange={(e) => setKeyword(e.target.value)}/>
                    <div className="input-group-append">
                        <span className="input-group-text">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </span>
                    </div>
                </div>
        </form>
    )

}


export default Search