import React from 'react'
import { Redirect, Link } from 'react-router-dom'

import SideNav from './sideNav';
import Axios from 'axios';
import url from './url';
export default class AdminUsers extends React.Component {
    state = {
        users: "",
        err: "",
        addUserSuccessMsg: "",
        addUserErrorMsg: "",
        addUserButtonStatus: false,
        userPost: {
            name: "",
            userName: "",
            emailId: "",
            userPassword: "",
            repassword: "",
            userPhoneNumbers: ""
        },
        formValid: {
            name: false,
            userName: false,
            emailId: false,
            userPassword: false,
            repassword: false,
            userPhoneNumbers: false
        },
        formErr: {
            name: "",
            userName: "",
            emailId: "",
            userPassword: "",
            repassword: "",
            userPhoneNumbers: ""
        }

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
    changeHander = (e) => {
        let userPost = this.state.userPost;
        userPost[e.target.name] = e.target.value;
        this.setState({ userPost: userPost })
        this.validate(e.target.name, e.target.value)
    }
    validate = (name, value) => {
        let formErr = this.state.formErr;
        let formValid = this.state.formValid;
        switch (name) {
            case "emailId":
                if (!value) {
                    formValid.emailId = false;
                    formErr.emailId = "Please Enter Mail id"
                }
                else if (!value.match(/[a-zA-Z._0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,4}/)) {
                    formValid.emailId = false;
                    formErr.emailId = "Please Enter Correct Mail id"
                }
                else {
                    formValid.emailId = true;
                    formErr.emailId = ""
                }
                break;
            case "name":
                if (!value) {
                    formValid.name = false;
                    formErr.name = "Please Enter Name"
                }
                else if (value.match(/[@!#$%^&*()]/)) {
                    formValid.name = false;
                    formErr.name = "Please Name without Special character"
                }
                else {
                    formValid.name = true;
                    formErr.name = ""
                }
                break;
            case "userName":
                if (!value) {
                    formValid.userName = false;
                    formErr.userName = "Please Enter User Name"
                }
                else if (value.match(/[@!#$%^&*() ]/)) {
                    formValid.userName = false;
                    formErr.userName = "Enter User Name without special character and white space"
                }
                else {
                    formValid.userName = true;
                    formErr.userName = ""
                }
                break;
            case "userPassword":
                if (!value) {
                    formValid.userPassword = false;
                    formErr.userPassword = "Please Enter Password"
                }
                else if (!(value.match(/[A-Z]/) && value.match(/[a-z]/) && value.match(/[0-9]/) && value.match(/[@!#$%^&*()]/) && value.length > 7)) {
                    formValid.userPassword = false;
                    formErr.userPassword = "Password field should have uppercase, lower case, digit and a special charater and it should be of length 8 or more"
                }
                else {
                    formValid.userPassword = true;
                    formErr.userPassword = ""
                }
                break;
            case "repassword":
                if (!value) {
                    formValid.repassword = false;
                    formErr.repassword = "Please Enter Confirm Password"
                }
                else if (value !== this.state.userPost.userPassword) {
                    formValid.repassword = false;
                    formErr.repassword = "Password and Confirm Password are not same"
                }
                else {
                    formValid.repassword = true;
                    formErr.repassword = ""
                }
                break;
            case "userPhoneNumbers":
                if (!value) {
                    formValid.userPhoneNumbers = false;
                    formErr.userPhoneNumbers = "Please Enter Phone Number"
                }
                else if (!value.toString().match(/[6-9][0-9]{9}/)) {
                    formValid.userPhoneNumbers = false;
                    formErr.userPhoneNumbers = "Phone Number should start from 6,7,8,9 and should be 10 digit long"
                }
                else {
                    formValid.userPhoneNumbers = true;
                    formErr.userPhoneNumbers = ""
                }
                break;
            default:
                break;

        }
    }
    submitHandler = (e) => {
        e.preventDefault();
        Axios.post(url + 'addUser/', this.state.userPost).then(success => {
            this.setState({ addUserSuccessMsg: success.data.data, addUserErrorMsg: "" })
        }).catch(error => {
            if (error.response)
                this.setState({ addUserSuccessMsg: "", addUserErrorMsg: error.response.data.message })
            else
                this.setState({ addUserSuccessMsg: "", addUserErrorMsg: error.message })


        })
    }

    addUserButtonStatusToggeler = () => {
        this.setState({ addUserButtonStatus: !this.state.addUserButtonStatus })
    }
    render() {
        let userData = JSON.parse(sessionStorage.getItem("userData"))
        if (userData)
            if (userData.userPermission === "admin")
                return (
                    <React.Fragment>
                        <SideNav location="user" />
                        <div className="container mt-10 mb-2">
                            <button className="bt bt-primary" onClick={this.addUserButtonStatusToggeler}>
                                Add User
                        </button>

                            {this.state.addUserButtonStatus && (
                                <section className="row justify-content-center">
                                    <article className="col-md-6 col-lg-4">
                                        <form className="form-login" onSubmit={this.submitHandler}>
                                            <div className="cross-sign" onClick={this.addUserButtonStatusToggeler}>x</div>
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    placeholder="Name"
                                                    className="form-control"
                                                    name="name"
                                                    value={this.state.userPost.name}
                                                    onChange={this.changeHander}

                                                />
                                            </div>
                                            <div className="text-danger">{this.state.formErr.name}</div>
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    placeholder="Enter User Name"
                                                    className="form-control"
                                                    name="userName"
                                                    value={this.state.userPost.userName}
                                                    onChange={this.changeHander}

                                                />
                                            </div>
                                            <div className="text-danger">{this.state.formErr.userName}</div>
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    placeholder="Email Id"
                                                    className="form-control"
                                                    name="emailId"
                                                    value={this.state.userPost.emailId}
                                                    onChange={this.changeHander}
                                                />
                                            </div>
                                            <div className="text-danger">{this.state.formErr.emailId}</div>
                                            <div className="form-group">
                                                <input
                                                    type="password"
                                                    placeholder="Set Password"
                                                    className="form-control"
                                                    name="userPassword"
                                                    value={this.state.userPost.userPassword}
                                                    onChange={this.changeHander}
                                                />
                                            </div>
                                            <div className="text-danger">{this.state.formErr.userPassword}</div>
                                            <div className="form-group">
                                                <input
                                                    type="password"
                                                    placeholder="Enter Your Password Again"
                                                    className="form-control"
                                                    name="repassword"
                                                    value={this.state.userPost.repassword}
                                                    onChange={this.changeHander}
                                                />
                                            </div>
                                            <div className="text-danger">{this.state.formErr.repassword}</div>
                                            <div className="form-group">
                                                <input
                                                    type="number"
                                                    placeholder="Input Contact Number"
                                                    className="form-control"
                                                    name="userPhoneNumbers"
                                                    value={this.state.userPost.userPhoneNumbers}
                                                    onChange={this.changeHander}
                                                />
                                            </div>
                                            <div className="text-danger">{this.state.formErr.userPhoneNumbers}</div>
                                            <button type="submit"
                                                disabled={!(this.state.formValid.name && this.state.formValid.emailId && this.state.formValid.userName && this.state.formValid.userPassword && this.state.formValid.repassword && this.state.formValid.userPhoneNumbers)}
                                                className="btn btn-warning form-control">
                                                Add
                                          </button>
                                            <div className="text-success">{this.state.addUserSuccessMsg}</div>
                                            <div className="text-danger">{this.state.addUserErrorMsg}</div>

                                        </form>
                                    </article>
                                </section>

                            )}

                            <br /><br />
                            {this.state.users && (
                                <div className="row break-word">
                                    <div className="col-3">
                                        <h5>{"User Name"}</h5>
                                    </div>
                                    <div className="col-3">
                                        <h5>{"Email Id"}</h5>
                                    </div>
                                    <div className="col-3">
                                        <h5>  {"Name"}</h5>
                                    </div>
                                    <div className="col-3">
                                        <h5> {"Permission"}</h5>
                                    </div>


                                </div>
                            )}

                            {this.state.users ? this.state.users.map((user, key) => {
                                return (
                                    <Link key={key} to={'/admin/user/' + user.userName}>
                                        {(userData.userName !== user.userName) &&
                                            <div className="row user-row break-word" >
                                                <div className="col-3">
                                                    {user.userName}
                                                </div>
                                                <div className="col-3">
                                                    {user.emailId}
                                                </div>
                                                <div className="col-3">
                                                    {user.name}
                                                </div>
                                                <div className="col-3">
                                                    {user.userPermission}
                                                </div>
                                            </div>
                                        }
                                    </Link>
                                )
                            }) : <h1 className="text-center">No Users Found</h1>}
                        </div>

                    </React.Fragment>
                )
            else {
                return <h2 className="text-center">Sorry but you are not authorized</h2>
            }
        return (
            <Redirect to={'/admin/login'} />
        )
    }
}