import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchUser} from '../actions';
import Landing from "./Landing";
import BlogPage from "./BlogPage";

import Header from "./Header";

class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <div className="ui container">
                <BrowserRouter>
                    <div>
                        <Header/>
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/blog/:id" component={BlogPage}/>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default connect(null, {fetchUser})(App);