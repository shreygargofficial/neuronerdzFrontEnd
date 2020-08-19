import React from 'react'
import axios from 'axios'
import url from './url'
import Axios from 'axios'
import Spinner from './Spinner'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { Button, TextField, Avatar, Card, CardContent } from '@material-ui/core'
export default class Article extends React.Component {
    state = {
        data: "",
        err: "",
        userMessage: "",
        emailId: "",
        replyBtnValue: "",
        replyEmailId: "",
        userReply: "",
        loading: true,
        open: false,
        commentSuccess: "",
        commentReplySuccess: "",
        reply: false
    }
    componentDidMount() {
        axios.get(url + "getBlogByUrl/" + this.props.match.params.titleUrl).then(success => {
            this.setState({ data: (success.data.data), err: "", loading: false })
        }).catch(err => {
            if (err.response) {
                this.setState({ data: "", err: err.response.data.message, loading: false })
            }
            else {
                this.setState({ data: "", err: err.message, loading: false })
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
        this.setState({ loading: true })
        let obj = {};
        obj.emailId = this.state.emailId;
        obj.userMessage = this.state.userMessage;
        Axios.put(url + 'addComment/' + this.state.data.blogId, obj).then(success => {
            this.setState({ loading: false, commentReplySuccess: "", commentSuccess: "Comment is sent for approval", err: "", open: true })
        }).catch(err => {
            if (err.response) {
                this.setState({ commentSuccess: "", commentReplySuccess: "", err: err.response.data.message, loading: false, open: true })
            }
            else {
                this.setState({ commentSuccess: "", commentReplySuccess: "", err: err.message, loading: false, open: true })
            }
        })
    }
    changeCommentsReplyHandler = (e) => {
        let value = e.target.value;
        this.setState({ [e.target.name]: value })
    }
    handleCommentReplySubmit = () => {
        this.setState({ loading: true })
        let obj = {};
        obj.emailId = this.state.replyEmailId;
        obj.userReply = this.state.userReply;
        console.log(obj, "comment id" + this.state.replyBtnValue);
        Axios.put(url + 'replyComment/' + this.state.replyBtnValue, obj).then(success => {
            this.setState({ commentSuccess: "", commentReplySuccess: "Reply added!", err: "", loading: false, open: true })
            this.componentDidMount();
        }).catch(err => {
            if (err.response) {
                this.setState({ commentSuccess: "", commentReplySuccess: "", err: err.response.data.message, loading: false, open: true })
            }
            else {
                this.setState({ commentSuccess: "", commentReplySuccess: "", err: err.message, loading: false, open: true })
            }
        })
    }
    handleSnackbarClose = () => [
        this.setState({ open: false })
    ]
    render() {
        if (this.state.loading)
            return <Spinner />
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
                                        <div className="badge badge-secondary primary" >{ele}</div>&nbsp;
                                    </React.Fragment>
                                )
                            })}
                        </div>

                        <Card className="mt-4">
                            <CardContent className="">
                                <h2>Auther</h2>
                                <div>-{this.state.data.blogAuthor}</div>
                            </CardContent>
                        </Card>
                        {/* main comments container */}
                        <div className="comments mt-3">
                            <div className="name_of_commenter">
                                <div className="form-group">
                                    <TextField
                                        className="form-control"
                                        name="emailId"
                                        value={this.state.emailId}
                                        onChange={this.changeCommentsHandler}
                                        color="secondary"
                                        type="email"
                                        label="Enter your EmailID"
                                        variant="outlined"
                                    />
                                </div>

                            </div>
                            <div className="comments_body mt-1">
                                <TextField
                                    className="form-control"
                                    name="userMessage"
                                    value={this.state.userMessage}
                                    onChange={this.changeCommentsHandler}
                                    color="secondary"
                                    label="Comment Please"
                                    variant="outlined"
                                />

                            </div>
                            <br />
                            <Button variant="contained"
                                color="primary"
                                className="form-control"
                                onClick={this.handleCommentSubmit}
                                disabled={!(this.state.userMessage && this.state.emailId)}>
                                Comment
                            </Button>
                            {/* Already made comments container */}
                            <div className="loaded_comments">
                                {this.state.data.blogComments.map((ele, key) => {
                                    return (
                                        ele.commentStatus === "approve" && (
                                            <Card className="comment-thread mt-3" key={key}>
                                                <div className="card-body">
                                                    <div className="comments-auther">
                                                        <Avatar alt="Remy Sharp"
                                                            className="avatar"
                                                            src="/images/aboutcollage.jpg" />
                                                        <h4>{ele.emailId}</h4>
                                                    </div>

                                                    <div className="text-capital">{ele.userMessage}</div>
                                                </div>
                                                {/* reply form */}
                                                <Button
                                                    variant="outlined"
                                                    color="primary"
                                                    className="reply-btn"
                                                    onClick={() => this.setState({ reply: !this.state.reply, replyBtnValue: ele.commentId })}>
                                                    Reply
                                                     </Button>
                                                {this.state.reply && this.state.replyBtnValue &&
                                                    this.state.replyBtnValue === ele.commentId && (

                                                        <div className="comments mt-3 ml-3">
                                                            <div className="name_of_commenter">
                                                                <TextField
                                                                    className="form-control"
                                                                    name="replyEmailId"
                                                                    value={this.state.replyEmailId}
                                                                    onChange={this.changeCommentsReplyHandler}
                                                                    color="secondary"
                                                                    type="email"
                                                                    label="Email"
                                                                    variant="outlined"
                                                                />
                                                            </div>
                                                            <div className="comments_body mt-1">
                                                                <TextField
                                                                    className="form-control"
                                                                    name="userReply"
                                                                    value={this.state.userReply}
                                                                    onChange={this.changeCommentsReplyHandler}
                                                                    color="secondary"
                                                                    label="Reply Please"
                                                                    variant="outlined"
                                                                />
                                                            </div>
                                                            <br />
                                                            <Button type="submit"
                                                                onClick={this.handleCommentReplySubmit}
                                                                color="primary"
                                                                variant="outlined"
                                                                disabled={!(this.state.userReply && this.state.replyEmailId)}>
                                                                submit
                                                            </Button>
                                                        </div>
                                                    )}
                                                {/* {reply form over} */}
                                                {/* loded reply comments container */}
                                                {ele.commentReply.map((reply, key2) => {
                                                    return (
                                                        <div className="card mt-3 ml-3" key={key2}>
                                                            <div className="card-body">
                                                                <div className="comments-auther">
                                                                    <Avatar alt="Remy Sharp"
                                                                        className="avatar"
                                                                        src="/images/logoMain.png" />
                                                                    <h4>{reply.emailId}</h4>
                                                                </div>
                                                                <div className="text-capital"> {reply.userReply}</div>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </Card>
                                        )


                                    )
                                })}

                            </div>
                        </div>


                        {this.state.commentSuccess &&
                            <Snackbar open={this.state.open} autoHideDuration={3000} onClose={this.handleSnackbarClose} >
                                <MuiAlert onClose={this.handleSnackbarClose} elevation={6} variant="filled" severity="success">
                                    {this.state.commentSuccess}
                                </MuiAlert>
                            </Snackbar>}
                        {this.state.commentReplySuccess &&
                            <Snackbar open={this.state.open} autoHideDuration={3000} onClose={this.handleSnackbarClose} >
                                <MuiAlert onClose={this.handleSnackbarClose} elevation={6} variant="filled" severity="success">
                                    {this.state.commentReplySuccess}
                                </MuiAlert>
                            </Snackbar>}
                        {this.state.err &&
                            <Snackbar open={this.state.open} autoHideDuration={3000} onClose={this.handleSnackbarClose} >
                                <MuiAlert onClose={this.handleSnackbarClose} elevation={6} variant="filled" severity="error">
                                    {this.state.err}
                                </MuiAlert>
                            </Snackbar>}
                    </React.Fragment>) : <h2>{this.state.err}</h2>}

            </div>
        )
    }
}



