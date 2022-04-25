import React, {Fragment} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChevronDown} from '@fortawesome/free-solid-svg-icons'


const DotLoader = () => {
    return (
      <Fragment>
          <div className="encircle bounce animated" style={{position:"absolute ", bottom:"-30px"}}>
           <div className="arrow">
            <FontAwesomeIcon style={{position:"relative", left:"2px", fontSize:"30px", color:"#5db9b3"}} icon={faChevronDown} />
           </div>
         </div>
      </Fragment>
    )
}
export default DotLoader