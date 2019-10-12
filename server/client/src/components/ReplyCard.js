import React from 'react'
import faker from "faker";
import axios from "axios";
import CommentCard from "./CommentCard";
import ReplyForm from "./ReplyForm";

class ReplyCard extends React.Component {
    constructor(props) {
        super(props);
        const date = new Date(props.comment.updatedAt);
        const displayDate = `${date.toDateString()} ${date.toLocaleTimeString()}`;
        this.state = {
            comment: props.comment.comment,
            displayDate : displayDate,
            replies: [],
            reply: false,
            edit: false
        };

    }

    async componentDidMount() {
        if (this.props.comment.replies.length > 0) {
            try {
                let replies = await axios.get(`/api/comments/replies/${this.props.comment.replies}`);
                this.setState({replies: replies.data});
            } catch (e) {
                throw new Error(e);
            }

        }
    }

    addReplies = (comments) => {
        this.setState({
            replies: [...this.state.replies, comments],
            reply: false,
            edit: false
        })
    };

    updateReplies = (comments) => {
        const date = new Date(this.props.comment.updatedAt);
        const displayDate = `${date.toDateString()} ${date.toLocaleTimeString()}`;
        this.setState({
            comment: comments.comment,
            displayDate : displayDate,
            reply: false,
            edit: false
        })
    };

    cancelReply = () => {
        this.setState({
            reply: false,
            edit: false
        })
    };

    renderReplies() {
        if (this.state.replies.length > 0) {
            return (
                <div className="comments">
                    {this.state.replies.map((reply) => {
                        return (
                            <CommentCard key={reply._id} parent={reply._id} comment={reply} user={this.props.user}
                                         blogId={this.props.blogId}/>
                        );
                    })}
                </div>
            )
        }
    }

    render() {
        return (
            <div className="comments">
                <div className="comment">
                    <div className="avatar">
                        <img alt={this.props.comment.user.name} src={faker.image.avatar()}/>
                    </div>
                    <div className="content">
                        <div className="author">{this.props.comment.user.name}</div>
                        <div className="metadata">
                            <span className="date">{this.state.displayDate}</span>
                        </div>
                        <div className="text">
                            <p>{this.state.comment}</p>
                        </div>
                        <div className="actions">
                            {
                                !this.state.reply && this.props.user ?
                                    <a onClick={() => this.setState({reply: true})} className="reply">Reply</a>
                                    : null
                            }
                            {
                                !this.state.edit && this.props.user && this.props.user._id === this.props.comment.user._id ?
                                    <a onClick={() => this.setState({edit: true})} className="reply">Edit</a>
                                    : null
                            }
                        </div>
                        {
                            this.state.reply || this.state.edit ?
                                <ReplyForm
                                    user={this.props.user}
                                    isEdit={this.state.edit}
                                    blogId={this.props.blogId}
                                    comment={this.props.comment}
                                    submitHandler={this.state.edit ? this.updateReplies: this.addReplies}
                                    cancelReply={this.cancelReply}
                                    parent={this.props.parent}/>
                                : null
                        }
                    </div>
                    {this.renderReplies()}
                </div>
            </div>
        )
    }

}

export default ReplyCard;