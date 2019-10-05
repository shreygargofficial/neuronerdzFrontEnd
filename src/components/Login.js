import React from 'react'
import axios from 'axios'

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
        success:"",
        err:""
       
    }
    changeHander = (e) => {
        let form = this.state.form;
        form[e.target.name] = e.target.value;
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

        }
    }
    submitHandler=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:4000/loginUser",this.state.form).then(success=>{
            console.log(success)
           this.setState({success:success.data.data,err:""})
        }).catch(err=>{
            if(err.response){
                this.setState({success:"",err:err.response.data.message})
            }
            else{
                this.setState({success:"",err:err.message})
            }
        })
    }

    render() {
        return (
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
                        Submit
                        </button>
                </form>
            </article>
        )
    }
}