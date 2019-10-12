import React from 'react';
import axios from 'axios';

class ReplyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: props.isEdit ? props.comment.comment : ''
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        if (this.props.isEdit) {
            this.props.comment.comment = this.state.comment;
            var data = await axios.patch('/api/comments', this.props.comment);
        } else {
            var data = await axios.post('/api/comments', {
                comment: this.state.comment,
                user: this.props.user._id,
                blog: this.props.blogId,
                parent: this.props.parent ? this.props.parent : null
            });
        }
        this.props.submitHandler(data.data);
        this.setState({
            comment: ''
        })
    };

    handleChange = (event) => {
        const {value, name} = event.target;
        this.setState({[name]: value})
    };

    render() {
        return (
            <form className="ui reply form" onSubmit={this.handleSubmit}>
                <div className="field">
                    <textarea onChange={this.handleChange} name="comment" value={this.state.comment}/>
                </div>
                <button type="submit" className="ui blue labeled submit icon button">
                    <i className="icon edit"/> Add Reply
                </button>
                {this.props.parent ? <button onClick={this.props.cancelReply} className="ui button">
                    Cancel
                </button> : null}

            </form>
        )
    }
}

export default ReplyForm;