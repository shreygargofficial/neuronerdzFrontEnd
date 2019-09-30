import React from 'react'
import axios from 'axios'
import url from './url'
export default class Article extends React.Component {
    state = {
        data: "",
        err: ""
    }
    componentDidMount() {
        axios.get(url + "getBlogByUrl/"+this.props.match.params.titleUrl).then(success => {
            this.setState({ data: (success.data.data), er: "" })
        }).catch(err => {
            if (err.response) {
                this.setState({ data: "", er: err.response.data.message })
            }
            else {
                this.setState({ data: "", er: err.message })
            }
        })
    }
    componentDidUpdate(prev){
        if(prev.location.pathname!==prev.history.location.pathname)
        this.componentDidMount();
    }
    render() {
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
                                        <span className="badge badge-secondary" >{ele}</span>&nbsp;
                                </React.Fragment>
                                )
                            })}
                        </div>

                        <div className="card mt-4">
                            <div className="card-header">
                                <h4>Auther:</h4>
                            </div>
                            <div className="card-body">
                                <h3>{this.state.data.blogAuthor.toUpperCase()}</h3>
                            </div>
                        </div>

                    </React.Fragment>) : this.state.err}
            </div>
        )
    }
}



