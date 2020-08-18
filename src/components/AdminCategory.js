import React from 'react'
import SideNav from './sideNav'
import Axios from 'axios'
import url from './url'
export default class AdminCategory extends React.Component {

    state = {
        categories: [],
        error: "",
        success: ""
    }
    componentDidMount() {
        Axios.get(url + 'getAllCategory').then(sucess => {
            this.setState({ categories: sucess.data.data })
        }).catch(err => {
            if (err.response)
                this.setState({ error: err.response.data.message, success: "" })
            else
                this.setState({ error: err.message, success: "" })
        })
    }
    render() {
        return (
            <React.Fragment>
                <SideNav location="category" />
                <div className="container mt-10">
                    <div className="row justify-content-center">
                        <div className="col-sm-8">
                            <h2 className="text-center mb-3">Categories</h2>
                            {this.state.categories.length && this.state.categories.map(mainData => {
                                return (
                                    <div className="category-tab">
                                        {mainData.category}
                                    </div>
                                )
                            })}
                        </div>

                    </div>
                </div>
            </React.Fragment>
        )
    }
}