import React from 'react';
import { urlR } from './url'
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom'
export default class sideNav extends React.Component {
    state = {
        collapse: true
    }
    sidenavCollapse = () => {
        let status = !this.state.collapse
        this.setState({ collapse: status })
    }
    render() {
        let userData = JSON.parse(sessionStorage.getItem("userData"))
        let collapseStatus = this.state.collapse ? "collapse-side" : " incollapse";
        if (userData)
            return (
                <React.Fragment>
                    <nav className="top-admin-nav">
                        <div className="user-logged">
                            {userData.userName}
                        </div>
                        <div className="humburger" onClick={this.sidenavCollapse}>
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                        </div>
                    </nav>

                    <aside className={"side-admin-nav " + collapseStatus}>
                        <ul className="admin-menulist">
                            <li className="side-admin-nav-logo">
                                <img src={urlR + "images/logoMain.png"} width="38px" height="38px" alt="neuronerdz sogo" />
                                <span>Neuronerdz</span>
                            </li>
                            <Link to="/admin/post"><li className={(this.props.location && this.props.location === "post") ? "active-admin-side-nav" :""}>Post</li></Link>
                            <Link to="/admin/user"><li className={(this.props.location && this.props.location === "user") ? "active-admin-side-nav":""}>User</li></Link>
                            <Link to="/admin/comments">
                                <li className={(this.props.location && this.props.location === "comment") ? "active-admin-side-nav":""}>
                                    Comments &nbsp;
                                    <i className={this.props.countComment && "badge badge-primary"}>
                                            {this.props.countComment}
                                    </i>
                                </li>
                            </Link>
                            <Link to="/"><li>Visit Site</li></Link>

                        </ul>
                    </aside>


                </React.Fragment>
            )
        return (
            <Redirect to={'/admin'} />
        )
    }
}
