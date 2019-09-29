import React from 'react'
import axios from 'axios'
import url from './url'
import { Link } from 'react-router-dom'

export default class RecentPost extends React.Component {
    state = {
        data: "",
        err: ""
    }
    componentDidMount() {
        axios.get(url + "getAllBlogsByLimit/5").then(success => {
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
    render() {
        JSON.stringify(this.state)
        return (

            this.state.data ?
                this.state.data.map((ele, key) => {
                    return (
                        <Link to={'/'+ele.blogTitle} key={key} >
                            <div className="post-title-list text-capitalize text-secondary mb-2">
                                {ele.blogTitle}
                            </div>
                        </Link>
                    )
                })
                : JSON.stringify(this.state)
        )
    }
}