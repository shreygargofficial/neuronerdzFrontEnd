import React from 'react'
import { Redirect } from 'react-router-dom'
import url from './url'
import { Editor } from '@tinymce/tinymce-react';
import SideNav from './sideNav';
import Axios from 'axios'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
export default class AdminPost extends React.Component {
    state = {
        blogBody: "",
        blogCategory: {
            main: "",
            sub: ""
        },
        blogTagNames: [],
        blogTitle: "",
        blogAuthor: "",

        blogImage: "",
        categories: "",
        error: "",
        success: "",
        open: false
    }
    componentDidMount() {
        Axios.get(url + 'getAllCategory').then(data => {
            this.setState({ categories: data.data.data })
        }).catch(err => {
            if (err.response)
                this.setState({ error: err.response.data.message, success: "" })
            else
                this.setState({ error: err.message, success: "" })
        })

        this.setState({ blogAuthor: JSON.parse(sessionStorage.getItem("userData")).userName })
    }
    handleEditorChange = (content, editor) => {
        this.setState({ blogBody: content })
    }
    handleChanges = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        switch (name) {
            case "blogTitle":
                this.setState({ [name]: value })
                break;
            case "blogTagNames":
                let tag = value.split(',');
                this.setState({ [name]: tag })
                break;
            case "main":


                let category = this.state.blogCategory;
                category.main = value
                this.setState({ category })
                break;
            default:
                let blogCategory = this.state.blogCategory;
                blogCategory.sub = value
                this.setState({ blogCategory })
                break;

        }



    }
    handleClick = () => {
        let obj = {}
        obj.blogBody = this.state.blogBody
        obj.blogCategory = this.state.blogCategory
        obj.blogTagNames = this.state.blogTagNames
        obj.blogTitle = this.state.blogTitle
        obj.blogAuthor = this.state.blogAuthor

        obj.blogImage = this.state.blogImage

        Axios.post(url + 'addBlog', obj).then(data => {
            this.setState({ success: data.data.message, error: "", open: true })
        }).catch(err => {
            if (err.response)
                this.setState({ error: err.response.data.message, success: "", open: true })
            else
                this.setState({ error: err.message, success: "", open: true })
        })
    }
    handleSnackbarClose = () => {
        this.setState({ open: !this.state.open })
    }
    render() {
        let userData = JSON.parse(sessionStorage.getItem("userData"))
        if (userData) {
            return (
                <React.Fragment>
                    <SideNav location="post" />

                    <div className="container mt-10">
                        <strong className="">Enter Title</strong>
                        <br />  <br />
                        <input type="text" className="headingBlog form-control" value={this.state.blogTitle} name="blogTitle" onChange={this.handleChanges}>
                        </input>
                        <br />

                        <Editor
                            initialValue={this.state.content}
                            name="editors"
                            init={{
                                height: 500,
                                menubar: true,
                                plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount'
                                ],
                                toolbar:
                                    'undo redo | formatselect | bold italic backcolor | \
                                            alignleft aligncenter alignright alignjustify | \
                                            bullist numlist outdent indent | removeformat | help'
                            }}
                            onEditorChange={this.handleEditorChange}
                        />
                        <br />
                           Enter main category



                        <select className="form-control" value={this.state.blogCategory.main} name="main" onChange={this.handleChanges}>
                            <option value="" >--choose one--</option>
                            {this.state.categories && this.state.categories.map((ele, key) => {
                                return (

                                    <option key={key} className="text-capital" value={ele.category}>
                                        {ele.category}
                                    </option>
                                )
                            })}
                        </select>
                        <br />
                        Enter sub category
                        <input type="text" className="tag form-control" value={this.state.blogCategory.sub} name="sub" onChange={this.handleChanges}>

                        </input>

                        <br />
                        Enter tagname seprate by comma
                        <input type="text" className="category form-control" value={this.state.blogTagNames} name="blogTagNames" onChange={this.handleChanges} >

                        </input>

                        <br />
                        <div className="text-center mb-3">
                            <Button
                                onClick={this.handleClick}
                                disabled={!(this.state.blogTitle && this.state.blogTagNames.length && this.state.blogCategory.main.length && this.state.blogCategory.sub.length && this.state.blogBody)}
                                variant="contained" color="primary">
                                Submit
                            </Button>
                        </div>
                        <Snackbar open={this.state.open} autoHideDuration={3000} >
                            <MuiAlert onClose={this.handleSnackbarClose} elevation={6} variant="filled" severity="success">
                                {this.state.success}
                            </MuiAlert>
                        </Snackbar>
                        {this.state.error && <Snackbar open={this.state.open} autoHideDuration={3000} >
                            <MuiAlert onClose={this.handleSnackbarClose} elevation={6} variant="filled" severity="error">
                                {this.state.error}
                            </MuiAlert>
                        </Snackbar>}




                    </div>
                </React.Fragment>

            )
        }
        else {
            return (
                <Redirect to="/admin" />
            )

        }

    }
}