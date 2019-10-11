import React from 'react'
import axios from 'axios'
import url from './url'
import { Redirect } from 'react-router-dom'
export default class Login extends React.Component {

    state = {
        form: {
            loginId: "",
            userPassword: ""
        },
        formValid: {
            loginId: false,
            userPassword: false
        },
        success: "",
        err: "",
        userData:""

    }
    changeHander = (e) => {
        let form = this.state.form;
        form[e.target.name] = e.target.value.trim();
        this.setState({ form: form });
        this.validate(e.target.name, e.target.value);

    }
    validate = (name, value) => {
        let formValid = this.state.formValid;

        switch (name) {
            case 'loginId':
                if (!value) {
                    formValid.loginId = false;
                }
                else {
                    formValid.loginId = true;
                }
                break;
            case 'userPassword':
                if (!value) {
                    formValid.userPassword = false;
                }
                else {
                    formValid.userPassword = true;
                }
                break;
            default:
                break;
        }
    }
    submitHandler = (e) => {
        e.preventDefault();
        axios.post(url + "loginUser", this.state.form).then(success => {
            this.setState({ success: success.data.data, err: "" })
            axios.get(url+"getUserByUserName/"+this.state.form.loginId).then(sucessUser=>{
                this.setState({userData:sucessUser.data.data})
            })
        }).catch(err => {
            if (err.response) {
                this.setState({ success: "", err: err.response.data.message })
            }
            else {
                this.setState({ success: "", err: err.message })
            }
        })
    }

    render() {
        return (
            <main className="container">
                <section className="row">
                    <article className="offset-md-3 offset-lg-4 col-md-6 col-lg-4">
                        <form className="form-login" method="post" onSubmit={this.submitHandler}>
                            <div className="form-login-userlogo"><i className="fa fa-user fa-2x"></i></div>
                            <h2 className="form-login-heading">Login</h2>
                            <div className="text-success">{this.state.success}</div>
                            <div className="text-danger">{this.state.err}</div>
                            <br />
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Username or Email Id"
                                    className="form-control"
                                    name="loginId"
                                    value={this.state.form.loginId}
                                    onChange={this.changeHander}
                                />
                            </div>
                            <div className="form-group">
                                <input type="password"
                                    placeholder="Enter Your Password"
                                    className="form-control"
                                    name="userPassword"
                                    value={this.state.form.userPassword}
                                    onChange={this.changeHander}
                                />
                            </div>
                            <br />
                            <button type="submit"
                                disabled={!(this.state.formValid.loginId && this.state.formValid.userPassword)}
                                className="btn btn-warning form-control">
                                Login
                        </button>
                        </form>
                    </article>
                </section>
                {this.state.userData&&sessionStorage.setItem("userData",JSON.stringify(this.state.userData))}
                {JSON.parse(sessionStorage.getItem("userData"))&&<Redirect to={"/admin"}  />}

            </main>

        )
    }
}