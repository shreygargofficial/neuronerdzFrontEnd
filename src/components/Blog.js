import React from 'react'
import axios from 'axios'
import url from './url'
import Card from './Card'
import Spinner from './Spinner'
export default class Blog extends React.Component {

    state = {
        data: "",
        err: "",
        loading:true
    }
    componentDidMount() {
        axios.get(url + "getAllblogs/").then(success => {
            this.setState({ data: (success.data.data), err: "" ,loading:false})
        }).catch(err => {
            if (err.response) {
                this.setState({ data: "", err: err.response.data.message ,loading:false})
            }
            else {
                this.setState({ data: "", err: err.message ,loading:false   })
            }
        })
    }



    render() {
        if(this.state.loading)
       return  <Spinner />
        return (
            <div>
                {this.state.data ? <div className="row">
                    {this.state.data && this.state.data.map((ele, key) => {
                          return (
                            <React.Fragment  key={key} >
                                <Card ele={ele} />
                            </React.Fragment>
                        )
                    })}
                </div> :"No Blogs found"}
            </div>
        )
    }
}