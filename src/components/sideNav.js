import React from 'react';
import { urlR } from './url'
export default class sideNav extends React.Component {
    state = {
        collapse: true
    }
    sidenavCollapse = () => {
        let status = !this.state.collapse
        this.setState({ collapse: status })
    }
    render() {
        let collapseStatus=this.state.collapse?"collapse-side":" incollapse";
        return (
            <React.Fragment>
                <nav className="top-admin-nav">
                    <div className="user-logged">
                        Shrey
                    </div>
                    <div className="humburger" onClick={this.sidenavCollapse}>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                    </div>
                </nav>
                
                <aside className={"side-admin-nav "+collapseStatus}>
                    <ul className="admin-menulist">
                        <li className="side-admin-nav-logo">
                            <img src={urlR + "images/logoMain.png"} width="38px" height="38px" alt="neuronerdz sogo" />
                            <span>Neuronerdz</span>
                        </li>
                        <li>Post</li>
                        <li>User</li>
                        <li>Comments</li>

                    </ul>
                </aside>

              
            </React.Fragment>
        )
    }
}
