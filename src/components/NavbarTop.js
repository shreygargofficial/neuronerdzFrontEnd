import React from 'react'
import { Link } from 'react-router-dom'


export default class NavbarTop extends React.Component {
    render() {
        return (
                <div className="navbar-top">
                    <ul className="navbar-navigations">
                        <li><Link to={'/home'}>Home</Link></li>
                        <li><Link to={"/about"}>About</Link></li>
                        <li><Link to={"/team"}>Team</Link></li>
                        <li><Link to={'/contact'}> Contact</Link></li>
                    </ul>
                </div>
              
           
        )
    }
}