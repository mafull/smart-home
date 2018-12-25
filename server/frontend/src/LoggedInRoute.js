import { bool, func }       from "prop-types";
import React, { Component } from "react";
import { connect }          from "react-redux";
import {
    Redirect,
    Route
}                           from "react-router-dom";

import { checkAuth }        from "./actions/auth";


class LoggedInRoute extends Component {
    componentDidMount() {
        if (this.props.loggedIn === null) {
            this.props.checkAuth();
        }
    }

    render() {
        const { component: Component, ...rest } = this.props;

        return (
            <Route {...rest} render={props => (
                rest.loggedIn ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{
                        pathname: "/login",
                        state: { from: props.location }
                    }} />
                )
            )} />
        );
    }
};


LoggedInRoute.propTypes = {
    loggedIn: bool,
    checkAuth: func
};

LoggedInRoute.defaultProps = {
    loggedIn: null,
    checkAuth: () => null
};


export default connect(
    state => ({
        loggedIn: state.auth.loggedIn
    }),
    { checkAuth }
)(LoggedInRoute);
