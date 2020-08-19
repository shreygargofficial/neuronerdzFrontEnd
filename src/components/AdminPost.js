import React from 'react'
import { Redirect } from 'react-router-dom'
import url from './url'
import { Editor } from '@tinymce/tinymce-react';
import SideNav from './sideNav';
import Axios from 'axios'
import MuiAlert from '@material-ui/lab/Alert';
import { TextField, Select, Button, Snackbar, InputLabel, FormControl, MenuItem, Box } from '@material-ui/core/';
import Spinner from './Spinner';

export default class AdminPost extends React.Component {
    state = {
        blogBody: "",
        blogCategory: {
            main: "",
            sub: ""
        },
        blogTagNames: "",
        blogTitle: "",
        blogAuthor: "",

        blogImage: "",
        categories: "",
        error: "",
        success: "",
        open: false,
        loading:true
    }
    componentDidMount() {
        this.setState({loading:false})
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
                
                this.setState({ [name]: value })
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
        this.setState({loading:true})
        let obj = {}
        let tag=this.state.blogTagNames.split(',')
        obj.blogBody = this.state.blogBody
        obj.blogCategory = this.state.blogCategory
        obj.blogTagNames = tag
        obj.blogTitle = this.state.blogTitle
        obj.blogAuthor = this.state.blogAuthor

        obj.blogImage = this.state.blogImage
        console.log(obj);

        Axios.post(url + 'addBlog', obj).then(data => {

            obj.blogCategory = {
                main: "",
                sub: ""
            }
            this.setState({ blogBody: "", blogCategory: obj.blogCategory, blogTagNames: "", blogTitle: "", blogAuthor: "" ,loading:false})
            this.setState({ success: data.data.message, error: "", open: true })
            this.props.history.push('/admin');
        }).catch(err => {
            if (err.response)
                this.setState({ error: err.response.data.message, success: "", open: true ,loading:false})
            else
                this.setState({ error: err.message, success: "", open: true ,loading:false})
        })
    }
    handleSnackbarClose = () => {
        this.setState({ open: false })
    }
    render() {
        if(this.state.loading)
        return <Spinner/>
        let userData = JSON.parse(sessionStorage.getItem("userData"))
        if (userData) {
            return (
                <React.Fragment>
                    <SideNav location="post" />

                    <div className="container mt-10">
                        <Box >
                            <TextField
                                className="form-control heading-post"
                                value={this.state.blogTitle}
                                name="blogTitle"
                                onChange={this.handleChanges}
                                color="secondary"
                                label="Title"
                                variant="outlined"
                            />

                        </Box>
                        <Box mt={10}>
                            <Editor
                                initialValue={this.state.content}
                                name="editors"
                                value={this.state.blogBody}
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
                        </Box>
                        <Box mt={4}>
                            <FormControl variant="outlined" className="form-control">
                                <InputLabel>Choose main category</InputLabel>
                                <Select
                                    value={this.state.blogCategory.main}
                                    name="main"
                                    color="secondary"
                                    onChange={this.handleChanges}
                                    label="Age"
                                >
                                    <MenuItem value="">
                                        <em>--Choose--</em>
                                    </MenuItem>
                                    {this.state.categories && this.state.categories.map((ele, key) => {
                                        return (

                                            <MenuItem key={key} className="text-capital" value={ele.category}>
                                                {ele.category}
                                            </MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box mt={5}>
                            <TextField
                                className="form-control"
                                value={this.state.blogCategory.sub}
                                name="sub"
                                onChange={this.handleChanges}
                                color="secondary"
                                label="Sub Category"
                                variant="outlined"
                            />
                        </Box>
                        <Box mt={5}>
                            <TextField
                                className="form-control"
                                value={this.state.blogTagNames}
                                name="blogTagNames"
                                onChange={this.handleChanges}
                                color="secondary"
                                label="Enter tagname seprate by comma"
                                variant="outlined"
                            />
                        </Box>
                        <Box mt={5} mb={4} className="text-center">
                            <Button
                                onClick={this.handleClick}
                                disabled={!(this.state.blogTitle && this.state.blogTagNames.length && this.state.blogCategory.main.length && this.state.blogCategory.sub.length && this.state.blogBody)}
                                variant="contained" color="primary">
                                Submit
                            </Button>
                        </Box>
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