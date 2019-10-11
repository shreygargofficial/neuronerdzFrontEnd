import React from 'react'
import { Redirect,Link } from 'react-router-dom'

import SideNav from './sideNav';
import Axios from 'axios';
import url from './url';
export default class AdminUsers extends React.Component {
    state = {
        users: "",
        err: ""
    }
    componentDidMount() {
        Axios.get(url + 'getAllUsers/').then(success => {
            this.setState({ users: success.data.data, err: "" })
        }).catch(error => {
            if (error.response)
                this.setState({ users: "", err: error.response.data.message })
            else
                this.setState({ users: "", err: error.message })

        })
    }
    render() {
        let userData = JSON.parse(sessionStorage.getItem("userData"))
        if (userData)
            return (
                <React.Fragment>
                    <SideNav />

                    <div className="container mt-10">
                        {this.state.users && (
                            <div className="row">
                                <div className="col-sm-3">
                                    <h5>{"User Name"}</h5>
                                </div>
                                <div className="col-sm-3">
                                    <h5>{"Email Id"}</h5>
                                </div>
                                <div className="col-sm-3">
                                    <h5>  {"Name"}</h5>
                                </div>
                                <div className="col-sm-3">
                                    <h5> {"Permission"}</h5>
                                </div>


                            </div>
                        )}

                        {this.state.users && this.state.users.map((user, key) => {
                            return (
                                <Link key={key} to={'/admin/user/'+user.userName}>
                                    <div className="row user-row" >
                                        <div className="col-sm-3">
                                            {user.userName}
                                        </div>
                                        <div className="col-sm-3">
                                            {user.emailId}
                                        </div>
                                        <div className="col-sm-3">
                                            {user.name}
                                        </div>
                                        <div className="col-sm-3">
                                            {user.userPermission}
                                        </div>


                                    </div>
                                </Link>
                            )
                        })}
                    </div>

                </React.Fragment>
            )
        return (
            <Redirect to={'/admin/login'} />
        )
    }
}