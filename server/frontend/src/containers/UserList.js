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


class UserList extends Component {
    componentWillMount() {
        this.props.getUsers();
    };

    render() {
        const listItems = this.props.users
            .sort((a, b) => (
                a.username.toLowerCase() > b.username.toLowerCase() ? 1 : -1
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
            </div>
        );
    };
};


UserList.propTypes = {
    users: arrayOf(shape({
        username: string.isRequired,
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
