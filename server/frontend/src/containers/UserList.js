import {
    arrayOf,
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
        const listItems = this.props.users.map((user, i) => {
            return <UserListItem key={i} {...user} />;
        })

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
    }))
};

UserList.defaultProps = {
    users: []
};


const mapStateToProps = state => {
    return { users: state.user.users };
};

export default connect(mapStateToProps, { getUsers })(UserList);
