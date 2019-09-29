import React from 'react'
import axios from 'axios'
import url from './url'
import Card from './Card'
import NotFound from './NotFound'
export default class Search extends React.Component {

    state = {
        data: "",
        err: ""
    }
    componentDidMount() {
        axios.get(url + "search/" + this.props.match.params.searchTag).then(success => {
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
        if (prev.location.pathname !== prev.history.location.pathname) { 
            this.componentDidMount();
         }

    }
    render() {
        return (
            <div>
                {this.state.data ? <div className="row">
                    {this.state.data && this.state.data.map((ele, key) => {
                          return (
                            <React.Fragment key={key} >
                                <Card ele={ele} />
                            </React.Fragment>
                        )
                    })}
                </div> : <NotFound />}
            </div>
        )
    }
}