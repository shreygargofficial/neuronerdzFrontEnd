import React from 'react'
import { Link } from 'react-router-dom'
export default class Card extends React.Component {
    state = {

    }

    render() {
        return (
            <div className="col-sm-6 col-md-4  mb-4">
                <Link to={'/' + this.props.ele.blogUrl}>
                    <div className="card card-hover">
                        <div className="card-header">
                            <img alt={this.props.ele.blogTitle} src={this.props.ele.blogImage} className="card-img-top" />
                        </div>
                        <div className="card-body">
                            <h5>
                                {this.props.ele.blogTitle}
                            </h5>
                            <p dangerouslySetInnerHTML={{ __html: unescape(this.props.ele.blogBody.slice(0,180)) }}></p>
                            <p>--More--</p>
                        </div>
                    </div>
                </Link>
            </div>

        )
    }
}