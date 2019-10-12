import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";

class Header extends Component {
    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return (
                    <div className="item">
                        <a href="/auth/google" className="ui red google button"><i className="google icon"/>Sign In
                        with Google</a>
                    </div>
                );
            default:
                return (
                    <div className="item">
                        <a href="/auth/user/logout" className="ui red google button"><i className="google icon"/>Logout</a>
                    </div>
                )
        }
    }

    render() {
        return (
            <nav>
                <div className="ui menu">
                    <Link to={'/'} className="header item"><h3>Rentomojo Blogs</h3></Link>
                    <div className="right menu">
                        {this.renderContent()}
                    </div>
                </div>
            </nav>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Header);