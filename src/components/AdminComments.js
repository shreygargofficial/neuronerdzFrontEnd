import React from 'react'
import { Redirect } from 'react-router-dom'
import SideNav from './sideNav';
import Axios from 'axios'
import url from './url'
export default class AdminComment extends React.Component {
    state = {
        comments: ""
    }
    componentDidMount() {
        Axios.get(url + 'getAllTheComments/').then(success => {
            this.setState({ comments: success.data.data, err: "" })
        }).catch(error => {
            if (error.response)
                this.setState({ comments: "", err: error.response.data.message })
            else
                this.setState({ comments: "", err: error.message })

        })
    }
    render() {
        let counterUnreadComment = 0;
        let userData = JSON.parse(sessionStorage.getItem("userData"))
        if (userData)
            if (userData.userPermission === "admin")
                return (
                    <React.Fragment>
                        {this.state.comments && this.state.comments.forEach((ele) => {

                            if (ele.commentStatus === "na")
                                counterUnreadComment++


                        })}
                        <SideNav location={"comment"} countComment={counterUnreadComment} />
                        <div className="container mt-10 mb-2">
                            {this.state.comments ? this.state.comments.map((ele, key) => {
                                return (
                                    <section key={key} className="row border-grey mt-2">
                                        <article className="col-md-9">
                                            <div><strong>EmailId: </strong>{ele.emailId}</div>
                                            <div><strong>Comment: </strong><br />
                                                <div className="user-comment text-capitalize">
                                                    {ele.userMessage}
                                                </div>
                                            </div>
                                            <span className={ele.commentStatus === "na" ? "text-success cursor" : "text-danger cursor"}>
                                                {ele.commentStatus === "na" ? "Approve" : "Disapprove"}
                                            </span>
                                            &nbsp;
                                        <span className={"text-danger cursor"}>{"Spam"}</span>
                                        </article>
                                    </section>
                                )
                            })
                                :

                                <h2 className="text-center">No Comments</h2>
                            }

                        </div>
                    </React.Fragment>
                )
            else{
                return <h2 className="text-center">Sorry but you are not authorized</h2>
            }
        return (
            <Redirect to={'/admin/login'} />
        )

    }
}
