import React from 'react';
import CommentCard from "./CommentCard";
import {connect} from 'react-redux';
import axios from 'axios';
import ReplyForm from "./ReplyForm";

class Comments extends React.Component {
    constructor() {
        super();
        this.state = {
            comments: []
        }
    }

    updateComments = (comments) => {
        console.log("updating comments", comments);
        this.setState({
            comments: [...this.state.comments, comments]
        })
    };

    renderComments() {
        if (this.state.comments.length === 0) {
            return (
                <div>No comments</div>
            )
        }
        return this.state.comments.map((comment) => {
            return (
                <CommentCard key={comment._id} parent={comment._id} user={this.props.user} blogId={this.props.blogId} comment={comment}/>
            );
        })
    }

    async componentDidMount() {
        const comments = await axios.get(`/api/comments/blog/${this.props.blogId}`);
        this.setState({
            comments: comments.data
        });
    }

    render() {
        console.log("comment props", this.props);
        return (
            <div>
                <div className="ui comments">
                    <h3 className="ui dividing header">Comments</h3>
                    {this.renderComments()}
                    <ReplyForm user={this.props.user} blogId={this.props.blogId} submitHandler={this.updateComments}/>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.auth
    }
}

export default connect(mapStateToProps)(Comments);