import React from 'react'
import { Redirect } from 'react-router-dom'
import url from './url'
import { Editor } from '@tinymce/tinymce-react';
import SideNav from './sideNav';
import Axios from 'axios'
import { data } from 'jquery';
export default class AdminPost extends React.Component {
    state={
        blogBody: "",
        blogCategory: {
            main: "dfdsf",
            sub:[]
        },
        blogTagNames: [],
        blogTitle:"",
        blogAuthor: "",
        
        blogImage:""
    }
    handleEditorChange = (content,editor) => {
      this.setState({blogBody:content})
    }
    handleChanges=(e)=>{
        let name=e.target.name;
        let value=e.target.value;
        switch(name){
            case "blogTitle":
                this.setState({[name]:value})
                break;
            case "blogTagNames":
                let tag=value.split(',');
                this.setState({[name]:tag})
                break;
            case "main":
                console.log([name],value);

                let category=this.state.blogCategory;
                category.main=value
                this.setState({category})
                break;
            default:
                let categoryi=this.state.blogCategory;
                categoryi.sub=value
                this.setState({categoryi})
                break;

        }
                

       
    }
    handleClick=()=>{
        Axios.post(url +'addBlog',this.state).then(data=>{
            console.log(data.data);
        }).catch(err=>{
            console.log(err);
        })
    }
    render() {
        return (
            <React.Fragment>
              <div>Enter Title</div>
              <br/>
              <input type="text" className="headingBlog form-control" value={this.state.blogTitle} name="blogTitle" onChange={this.handleChanges}>

              </input>
              <br/>
              Enter main category
              <input type="text" className="category form-control"  value={this.state.blogCategory.main} name="main" onChange={this.handleChanges}>

              </input>

              <br/>
              Enter sub category
              <input type="text" className="tag form-control" value={this.state.blogCategory.sub}  name="sub" onChange={this.handleChanges}>

              </input>

              <br/>
              Enter tagname seprate by comma
              <input type="text" className="category form-control"  value={this.state.blogTagNames} name="blogTagNames" onChange={this.handleChanges} >

              </input>

              <br/>
              {JSON.stringify(this.state)}
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
                <button onClick={this.handleClick} className="btn btn-success" disabled={!(this.state.blogTitle&&this.state.blogTagNames&&this.state.blogCategory.main&&this.state.blogCategory.sub&&this.state.blogBody)}>add</button>
            
            </React.Fragment>

        )
    }
}