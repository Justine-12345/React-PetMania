import React,{ Fragment} from 'react'
import {MDBSideNav} from 'mdbreact'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGauge, faPaw, faUsers, faBacteria, faPlus} from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from "react-router-dom";

 
const SideBar = () => {
    let navigate = useNavigate()


    const userRoleFilter = name =>(e) => {
      e.preventDefault()
    
      if (name.trim()) {
            navigate(`/admin/users/${name}`)
        } else {
            navigate('/')
        }
    }

    const animalAdoptionFilter = name =>(e) => {
      e.preventDefault()
    
      if (name.trim()) {
            navigate(`/admin/animals/${name}`)
        } else {
            navigate('/')
        }
    }
    

    return(
  <section className="app">
  <aside className="sidebar">
        <br/>
         <header>
        <Link to="/admin/dashboard" style={{color:"white"}}><FontAwesomeIcon icon={faGauge} />
        &nbsp;
        Dashboard</Link>
      </header>
      <br/>
    <nav className="sidebar-nav">
 
      <ul>
        <li>
          <a href="#"><FontAwesomeIcon icon={faPaw} />&nbsp;&nbsp;<span> Animals</span> </a>
          <ul className="nav-flyout">
            <li style={{borderLeft:"2px solid white"}}>
              <Link to="/admin/animals"><i className="ion-ios-color-filter-outline"></i>All</Link>
            </li>
            <li style={{borderLeft:"2px solid white"}}>
              <a href="#" onClick={animalAdoptionFilter('adopted')}><i className="ion-ios-flame-outline"></i>Adopted</a>
            </li>
            <li style={{borderLeft:"2px solid white"}}>
              <a href="#" onClick={animalAdoptionFilter('unAdopt')}><i className="ion-ios-flame-outline"></i>Unadopt</a>
            </li>
            <li style={{borderLeft:"2px solid white"}}>
              <a href="#" onClick={animalAdoptionFilter('pending')}><i className="ion-ios-flame-outline"></i>Requests</a>
            </li>
            <hr/>
             <li style={{borderLeft:"2px solid white"}}>
              <Link to="/admin/animal"><i className="ion-ios-color-filter-outline"></i><FontAwesomeIcon icon={faPlus} />&nbsp;&nbsp;Add</Link> 
            </li>
          </ul>

        </li>

        <li>
          <a href="#"><FontAwesomeIcon icon={faUsers} />&nbsp;&nbsp;<span>Users</span></a>
          <ul className="nav-flyout">
            <li style={{borderLeft:"2px solid white"}}>
              <Link to="/admin/users"><i className="ion-ios-alarm-outline"></i>All</Link>
            </li>
            <li style={{borderLeft:"2px solid white"}}>
              <a href="#" onClick={userRoleFilter('user')}><i className="ion-ios-alarm-outline"></i>New Users</a>
            </li>
            <li style={{borderLeft:"2px solid white"}}>
              <a href="#" onClick={userRoleFilter('adopter')}><i className="ion-ios-alarm-outline"></i>Adopters</a>
            </li>
            <li style={{borderLeft:"2px solid white"}}>
              <a href="#" onClick={userRoleFilter('personnel')}><i className="ion-ios-alarm-outline"></i>Personnels</a>
            </li>
             <li style={{borderLeft:"2px solid white"}}>
              <a href="#" onClick={userRoleFilter('deactive')}><i className="ion-ios-alarm-outline"></i>Deactivated</a>
            </li>
          </ul>
        </li>


        <li>
        <a href="#"><FontAwesomeIcon icon={faBacteria} />&nbsp;&nbsp;<span className="">Disease</span></a>
          <ul className="nav-flyout">
            <li style={{borderLeft:"2px solid white"}}>
              <Link to="/admin/diseases"><i className="ion-ios-alarm-outline"></i>All</Link>
            </li>
            <hr/>
            <li style={{borderLeft:"2px solid white"}}>
              <Link to="/admin/disease"><i className="ion-ios-lightbulb-outline"></i><FontAwesomeIcon icon={faPlus} />&nbsp;&nbsp;Add</Link>
            </li>
             <li>
              <a href="#"><i className="ion-ios-lightbulb-outline">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i></a>
            </li>
          </ul>
        </li>




 
      </ul>
    </nav>
  </aside>
</section>

    
        )


}


export default SideBar