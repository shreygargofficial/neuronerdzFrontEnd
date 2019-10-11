import React from 'react'
import { Redirect } from 'react-router-dom'
import SideNav from './sideNav';
export default class Admin extends React.Component {
    render() {
        let userData = JSON.parse(sessionStorage.getItem("userData"))
        if (userData)
            return (
                <React.Fragment>
                    <SideNav />

                    <div className="container">
                        <div className="text-center mt-center">
                            <h1 className="text-center">Welcome {userData.emailId}</h1>
                        </div>
                    </div>
                </React.Fragment>
            )
        return (
            <Redirect to={'/admin/login'} />
        )
    }
}