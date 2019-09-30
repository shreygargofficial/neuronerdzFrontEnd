import React from 'react'
import axios from 'axios'
import url from './url'
import Card from './Card'
import NotFound from './NotFound'
export default class Category extends React.Component {

    state = {
        data: "",
        err: ""
    }
    componentDidMount(prevProps) {
        axios.get(url + "getBlogsByMainCategory/" + this.props.match.params.category.replace(/[-]/g," ")).then(success => {
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

    componentDidUpdate(prevProps) {
        if (prevProps.location.pathname !== prevProps.history.location.pathname)
            this.componentDidMount();

    }

    render() {
        return (
            <div>
                {this.state.data ?
                    <div className="row">
                        {this.state.data && this.state.data.map((ele, key) => {
                            return (
                                <React.Fragment  key={key} >
                                    <Card ele={ele} />
                                </React.Fragment>
                            )
                        })}
                    </div> : <NotFound />}
            </div>
        )
    }
}