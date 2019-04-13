import { string }   from "prop-types";
import React        from "react";

import ListGroup     from "react-bootstrap/ListGroup";


const UserListItem = (props) => {
    return (<ListGroup.Item>{props.name}</ListGroup.Item>);
};


UserListItem.propTypes = {
    name: string.isRequired,
    email: string,
};

UserListItem.defaultProps = {
    name: "",
    email: ""
};


export default UserListItem;
