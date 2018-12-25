import { bool, func }       from "prop-types";
import React, { Component } from "react";
import { connect }          from "react-redux";
import { Redirect }         from "react-router";

import {
    checkAuth,
    logIn,
    logOut
}                           from "../actions/auth";


class LoginPage extends Component {
    state = {
        username: "",
        password: ""
    };


    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleLogOut = (e) => {
        this.props.logOut()
    };

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.logIn({
            username: this.state.username,
            password: this.state.password
        });
    };


    componentDidMount() {
        if (this.props.loggedIn === null) {
            this.props.checkAuth();
        }
    }

    render() {
        if (this.props.loggedIn) {
            const { from } = 
                this.props.location.state || { from: { pathname: "/" } };
            return <Redirect to={from} />
        }
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <fieldset disabled={this.props.authenticating}>
                        <label>
                            Username
                            <input
                                type="text"
                                name="username"
                                value={this.state.username}
                                onChange={this.handleChange}
                            />
                        </label>
                        <br />
                        <label>
                            Password
                            <input
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                        </label>
                        <br />
                        <input
                            type="submit"
                            value="Log In"
                        />
                    </fieldset>
                </form>
                <button onClick={this.handleLogOut}>
                    Log Out
                </button>
            </div>
        );
    }
};


LoginPage.propTypes = {
    authenticating: bool,
    loggedIn: bool,

    checkAuth: func,
    logIn: func.isRequired
};

LoginPage.defaultProps = {
    authenticating: false,
    loggedIn: null,

    checkAuth: () => null,
    logIn: () => null
};


export default connect(
    state => ({
        authenticating: state.auth.authenticating,
        loggedIn: state.auth.loggedIn
    }),
    { checkAuth, logIn, logOut }
)(LoginPage);
