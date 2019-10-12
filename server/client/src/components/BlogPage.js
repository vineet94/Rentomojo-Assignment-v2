import React from 'react';
import axios from 'axios';
import Comments from "./Comments";
import Spinner from "./Spinner";

class BlogPage extends React.Component {
    constructor() {
        super();
        this.state = {
            title: "",
            content: ""
        }
    }

    async componentDidMount() {
        const blog = await axios.get(`/api/blog/${this.props.match.params.id}`);
        if (blog) {
            this.setState({
                title: blog.data.title,
                content: blog.data.content
            })
        }
    }


    renderContent() {
        if (this.state.title) {
            return (
                <div className="ui vertical stripe segment" style={{marginTop : '20px', marginBottom : '40px'}}>
                    <div className="ui large header">{this.state.title}</div>
                    <p>{this.state.content}</p>
                </div>
            )
        }
        return <Spinner/>
    }

    render() {
        return (
            <div>
                {this.renderContent()}
                <Comments blogId={this.props.match.params.id}/>
            </div>
        )
    }
}

export default BlogPage;