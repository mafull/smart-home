import { func }             from "prop-types";
import React, { Component } from "react";
import { connect }          from "react-redux";

import { attemptLogin }     from "../actions/auth";


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

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.attemptLogin({
            username: this.state.username,
            password: this.state.password
        });
    };


    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <fieldset disabled={this.props.attemptingLogin}>
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
        );
    }
};


LoginForm.propTypes = {
    attemptLogin: func.isRequired
};

LoginForm.defaultProps = {
    attemptLogin: () => null
};


const mapStateToProps = state => {
    return { };
}

export default connect(mapStateToProps, { attemptLogin })(LoginForm);
