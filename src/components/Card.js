import React from 'react'
import { Link } from 'react-router-dom'
export default class Card extends React.Component {
    state = {

    }

    render() {
        return (
            <div className="col-md-6  mb-4">
                <Link to={'/'+this.props.ele.blogUrl}>
                    <div className="card card-hover">
                        <div className="card-header">
                            <img alt={this.props.ele.blogTitle} src={this.props.ele.blogImage} className="card-img-top" />
                        </div>
                        <div className="card-body">
                            <h5>
                                {this.props.ele.blogTitle}
                            </h5>
                            <h6 className="text-center"> --More--</h6>
                        </div>
                    </div>
                </Link>
            </div>

        )
    }
}