import { func }             from "prop-types";
import React, { Component } from "react";
import { connect }          from "react-redux";

import { logIn, logOut }    from "../actions/auth";


class LoginForm extends Component {
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


    render() {
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


LoginForm.propTypes = {
    logIn: func.isRequired
};

LoginForm.defaultProps = {
    logIn: () => null
};


const mapStateToProps = state => {
    return { authenticating: state.auth.authenticating };
}

export default connect(mapStateToProps, { logIn, logOut })(LoginForm);
