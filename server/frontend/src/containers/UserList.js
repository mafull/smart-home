import {
    arrayOf,
    func,
    shape,
    string
}                           from "prop-types";
import React, { Component } from "react";
import { connect }          from "react-redux";

import UserListItem         from "../components/users/UserListItem";
import { getUsers }         from "../actions/user";

import { baseURL } from "../actions/helper";

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            ws: new WebSocket(baseURL.replace("http", "ws") + "/ws")
        };

        this.state.ws.onmessage = message => {
            console.log(message);
            this.setState({ messages: [...this.state.messages, message.data]});
        }
    }

    componentWillMount() {
        this.props.getUsers();

    };

    render() {
        const listItems = this.props.users
            .sort((a, b) => (
                a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
            ))
            .map((user, i) => (
                <UserListItem key={i} {...user} />
            ));

        return (
            <div>
                <h2>User List</h2>
                <ul>
                    {listItems}
                </ul>
                <hr />
                <ul>
                    {this.state.messages.map(msg => <li>{msg}</li>)}
                </ul>
            </div>
        );
    };
};


UserList.propTypes = {
    users: arrayOf(shape({
        name: string.isRequired,
        email: string
    })),

    getUsers: func.isRequired
};

UserList.defaultProps = {
    users: [],

    getUsers: () => null
};


const mapStateToProps = state => {
    return { users: state.user.users };
};

export default connect(mapStateToProps, { getUsers })(UserList);
