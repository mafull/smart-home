import _                                from "lodash";
import React, { useEffect, useState }   from "react";
import { connect }                      from "react-redux";
import { Redirect }                     from "react-router";

import Button   from "react-bootstrap/Button";
import Form     from "react-bootstrap/Form";

import {
    checkAuth,
    logIn,
    logOut
}                           from "../actions/auth";


const LoginPage = (props) => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (_.isNull(props.loggedIn)) props.checkAuth();
    }, []);

    if (props.loggedIn) {
        const { from } = props.location.state || { from: { pathname: "/" } };
        return <Redirect to={from} />
    }

    const handleSubmit = e => {
        e.preventDefault();
        props.logIn({ name, password });
    };

    return (
        <React.Fragment>
            <Form onSubmit={handleSubmit}>
                <fieldset disabled={props.authenticating}>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </Form.Group>
                    <Button type="submit" value="Log In">
                        Log In
                    </Button>
                </fieldset>
            </Form>
            <Button onClick={props.logOut}>
                Log Out
            </Button>
        </React.Fragment>
    );
};

export default connect(
    state => ({
        authenticating: state.auth.authenticating,
        loggedIn: state.auth.loggedIn
    }),
    { checkAuth, logIn, logOut }
)(LoginPage);
