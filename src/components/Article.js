import React from 'react'
import axios from 'axios'
import url from './url'
import Axios from 'axios'
export default class Article extends React.Component {
    state = {
        data: "",
        err: "",
        userMessage: "",
        emailId: "",
        replyBtnValue: "",
        replyEmailId:"",
        userReply:""
    }
    componentDidMount() {
        axios.get(url + "getBlogByUrl/" + this.props.match.params.titleUrl).then(success => {
            this.setState({ data: (success.data.data), err: "" })
        }).catch(err => {
            if (err.response) {
                this.setState({ data: "", err: err.response.data.message })
            }
            else {
                this.setState({ data: "", err: err.message })
            }
        })
    }
    componentDidUpdate(prev) {
        if (prev.location.pathname !== prev.history.location.pathname)
            this.componentDidMount();
    }
    changeCommentsHandler = (e) => {
        let value = e.target.value;
        this.setState({ [e.target.name]: value })
    }
    handleCommentSubmit = () => {
        let obj = {};
        obj.emailId = this.state.emailId;
        obj.userMessage = this.state.userMessage;
        Axios.put(url + 'addComment/' + this.state.data.blogId, obj).then(success => {
            console.log(success.data);
            this.componentDidMount();
        }).catch(err => {
            console.log(err.response.data.message);
        })
    }
    changeCommentsReplyHandler=(e)=>{
        let value = e.target.value;
        this.setState({ [e.target.name]: value })
    }
    handleCommentReplySubmit=()=>{
        let obj = {};
        obj.emailId = this.state.replyEmailId;
        obj.userReply = this.state.userReply;
        console.log(obj,"comment id"+this.state.replyBtnValue);
        Axios.put(url + 'replyComment/' + this.state.replyBtnValue, obj).then(success => {
            console.log(success.data);
            this.componentDidMount();
        }).catch(err => {
            console.log(err.response.data.message);
        })
    }
    render() {
        JSON.stringify(this.state)
        return (
            <div className="blog-data">
                {this.state.data ? (
                    <React.Fragment>
                        <h1>{this.state.data.blogTitle}</h1>
                        <br />
                        <div dangerouslySetInnerHTML={{ __html: unescape(this.state.data.blogBody) }}></div>
                        <br />
                        <div className="tags">
                            {this.state.data.blogTagNames.map((ele, key) => {
                                return (
                                    <React.Fragment key={key}>
                                        <span className="badge badge-secondary" >{ele}</span>&nbsp;
                                    </React.Fragment>
                                )
                            })}
                        </div>

                        <div className="card mt-4">

                            <div className="card-body">
                                <h2>Auther</h2>
                                <h5>{this.state.data.blogAuthor}</h5>
                            </div>
                        </div>
                        {/* main comments container */}
                        <div className="comments mt-3">
                            <div className="name_of_commenter">
                                <input type="email" className="form-control" name="emailId" value={this.state.emailId} placeholder="Enter your EmailID" onChange={this.changeCommentsHandler}/>
                            </div>
                            <div className="comments_body mt-1">
                                <textarea className="form-control" name="userMessage" vale={this.state.userMessage} placeholder="Comment Please" onChange={this.changeCommentsHandler}>
                                </textarea  >
                            </div>
                            <br />
                            <button type="submit" onClick={this.handleCommentSubmit} className="btn btn-success" disabled={!(this.state.userMessage && this.state.emailId)}>submit</button>
                            {/* Already made comments container */}
                            <div className="loaded_comments">
                                {this.state.data.blogComments.map((ele, key) => {
                                    return (
                                        <div className="card mt-3" key={key}>
                                            <div className="card-body">
                                                <h4>EmailId: {ele.emailId}</h4>
                                                    userMessage: {ele.userMessage}
                                            </div>
                                            {/* reply form */}
                                            <button className="btn primary" onClick={() => this.setState({ replyBtnValue: ele.commentId })}>Reply</button>
                                            {this.state.replyBtnValue && this.state.replyBtnValue === ele.commentId && (

                                                <div className="comments mt-3 ml-3">

                                                    <div className="name_of_commenter">
                                                        <input type="email" className="form-control" name="replyEmailId" value={this.state.replyEmailId} placeholder="Enter your EmailID" onChange={this.changeCommentsReplyHandler}>

                                                        </input>

                                                    </div>
                                                    <div className="comments_body mt-1">
                                                        <textarea className="form-control" name="userReply" vale={this.state.userReply} placeholder="Reply Please" onChange={this.changeCommentsReplyHandler}>

                                                        </textarea  >

                                                    </div>
                                                    <br />
                                                    <button type="submit" onClick={this.handleCommentReplySubmit} className="btn btn-success" disabled={!(this.state.userReply && this.state.replyEmailId)}>submit</button>
                                                </div>
                                            )}
                                            {/* loded reply comments container */}
                                            {ele.commentReply.map((reply, key2) => {
                                                return (
                                                    <div className="card mt-3 ml-3" key={key2}>
                                                        <div className="card-body">
                                                            <h4>EmailId: {reply.emailId}</h4>
                                                                userMessage: {reply.userReply}
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>



                    </React.Fragment>) : <h2>{this.state.err}</h2>}

            </div>
        )
    }
}



