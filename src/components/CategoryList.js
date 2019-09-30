import React from 'react'
import axios from 'axios'
import url from './url'
import { Link } from 'react-router-dom'

export default class CategoryList extends React.Component {
    state = {
        data: "",
        err: ""
    }
    componentDidMount() {
        axios.get(url + "getAllCategories/").then(success => {
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
        return (
            this.state.data ?
                this.state.data.map((ele, key) => {
                    return (
                        <React.Fragment  key={key}>
                       
                        <Link to={'/category/'+ele._id.toString().replace(/ /g,"-")} >
                            <div className="category-title-list text-capitalize text-secondary mb-2">
                                {ele._id}&nbsp;&nbsp;&nbsp;({ele.totalBlog})
                            </div>
                        </Link>
                        </React.Fragment>
                    )
                })
                : this.state.err
        )
    }
}