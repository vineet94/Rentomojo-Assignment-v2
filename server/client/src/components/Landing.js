import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import Spinner from "./Spinner";

class Landing extends React.Component {
    constructor(){
        super();
        this.state = {
            blogs: []
        }
    }

    async componentDidMount() {
        let blogs = await axios('/api/blogs');
        blogs = blogs.data;
        if(blogs.length > 0){
            this.setState({
                blogs
            })
        }

    }

    render() {
        if(this.state.blogs.length > 0){
            return <Redirect to={`/blog/${this.state.blogs[0]._id}`}/>
        }
        return(
            <Spinner/>
        )
    }
}

export default Landing;