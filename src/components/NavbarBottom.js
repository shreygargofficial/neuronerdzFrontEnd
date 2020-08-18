import React from 'react'
import { Link } from 'react-router-dom'


export default class NavbarBottom extends React.Component {
    render() {
        return (
            <div className="navbar navbar-expand-lg navbar-light navbar-bottom ">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        <li className="nav-item"><Link className="nav-link" to={'/category/science'}>Science & Tech</Link></li>
                        <li className="nav-item"><Link className="nav-link" to={"/category/inspiration"}>Inspiration</Link></li>
                        <li className="nav-item"><Link className="nav-link" to={"/category/politics"}>Politics</Link></li>
                        <li className="nav-item"><Link className="nav-link" to={'/category/health'}> Health</Link></li>
                        <li className="nav-item"><Link className="nav-link" to={'/category/psychology'}> Psychology</Link></li>
                        <li className="nav-item"><Link className="nav-link" to={'/category/fact'}> Fact</Link></li>
                        <li className="nav-item"><Link className="nav-link" to={'/category/travel'}> Travel</Link></li>
                        <li className="nav-item"><Link className="nav-link" to={'/category/entertainment'}> Entertainment</Link></li>
                    </ul>
                </div>
                    <label htmlFor="search" className="mr-3 mt-2"><i className="fa fa-search"/></label>
            </div>


        )
    }
}