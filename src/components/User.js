import React from 'react'
import { Redirect } from 'react-router-dom'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import SideNav from './sideNav';
import Axios from 'axios';
import url from './url';
export default class User extends React.Component {
    state = {
        users: "",
        err: "",
        updateMsgSuccess: "",
        updateMsgErr: "",
        formValid: {
            name: true,
            emailId: true
        },
        formErr: {
            name: "",
            emailId: ""
        },
        open: false
    }
    componentDidMount() {
        Axios.get(url + 'getUserByUserName/' + this.props.match.params.username).then(success => {
            this.setState({ users: success.data.data, err: "" })
        }).catch(error => {
            if (error.response)
                this.setState({ users: "", err: error.response.data.message })
            else
                this.setState({ users: "", err: error.message })

        })
    }
    changeHander = (e) => {
        let user = this.state.users;
        user[e.target.name] = e.target.value
        this.setState({ users: user })
        this.validate(e.target.name, e.target.value)

    }
    validate(name, value) {
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
            default:
                break;

        }
    }
    submitHandler = (e) => {
        e.preventDefault();
        Axios.put(url + 'updateUser/' + this.props.match.params.username, this.state.users).then(success => {
            this.setState({ users: success.data.data, updateMsgSuccess: "User Successfully Updated!!", updateMsgErr: "", open: true })

        }).catch(error => {
            if (error.response)
                this.setState({ updateMsgSuccess: "", updateMsgErr: error.response.data.message, open: true })
            else
                this.setState({ updateMsgSuccess: "", updateMsgErr: error.message, open: true })


        })

    }
    deleteUser = (e) => {
        e.preventDefault();
        Axios.delete(url + 'deleteUser/' + this.props.match.params.username).then(success => {
            this.setState({ users: "" })
            this.props.history.push('/admin/user')
        }).catch(error => {
            if (error.response)
                this.setState({ deletemsgErr: error.response.data.message })
            else
                this.setState({ deletemsgErr: error.message })
        })
    }

    handleSnackbarClose = () => {
        this.setState({ open: false })
    }
    render() {
        let userData = JSON.parse(sessionStorage.getItem("userData"))
        if (userData)
            if (userData.userPermission === "admin")
                return (
                    <React.Fragment>
                        <SideNav location="user" />
                        <div className="container mt-10">
                            <article className="row justify-content-center">
                                {this.state.users && (this.state.users.userName !== userData.userName) ?
                                    (
                                        <section className="col-md-6 col-lg-4">
                                            <form method="post" className="form-login" >
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        placeholder="Username"
                                                        className="form-control"
                                                        name="userName"
                                                        value={this.state.users.userName}
                                                        onChange={this.changeHander}
                                                        disabled={true}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        placeholder="Name"
                                                        className="form-control"
                                                        name="name"
                                                        value={this.state.users.name}
                                                        onChange={this.changeHander}

                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        placeholder="Email Id"
                                                        className="form-control"
                                                        name="emailId"
                                                        value={this.state.users.emailId}
                                                        onChange={this.changeHander}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <select name="userPermission" value={this.state.users && this.state.users.userPermission} className="form-control" onChange={this.changeHander}>
                                                        <option value="admin" >Admin</option>
                                                        <option value="editor" >Editor</option>
                                                        <option value="author" >Author</option>
                                                        <option value="spectator">Spectator</option>

                                                    </select>
                                                </div>
                                                <button type="submit"
                                                    onClick={this.submitHandler}
                                                    disabled={!(this.state.formValid.name && this.state.formValid.emailId)}
                                                    className="btn btn-warning form-control">
                                                    Update
                                              </button>


                                                {this.state.updateMsgSuccess && <Snackbar open={this.state.open} autoHideDuration={3000} onClose={this.handleSnackbarClose} >
                                                    <MuiAlert onClose={this.handleSnackbarClose} elevation={6} variant="filled" severity="success">
                                                        {this.state.updateMsgSuccess}
                                                    </MuiAlert>
                                                </Snackbar>}
                                                {this.state.updateMsgErr && <Snackbar open={this.state.open} autoHideDuration={3000} onClose={this.handleSnackbarClose} >
                                                    <MuiAlert onClose={this.handleSnackbarClose} elevation={6} variant="filled" severity="error">
                                                        {this.state.updateMsgErr}
                                                    </MuiAlert>
                                                </Snackbar>}

                                                <button
                                                    onClick={this.deleteUser}
                                                    className="btn btn-danger form-control mt-2">
                                                    Delete
                                             </button>

                                            </form>
                                        </section>
                                    ) : <h1>No User Found</h1>}

                            </article>
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