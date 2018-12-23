import { string }   from "prop-types";
import React        from "react";


const UserListItem = (props) => {
    return (<li>{props.username}</li>);
};


UserListItem.propTypes = {
    username: string.isRequired,
    email: string,
};

UserListItem.defaultProps = {
    username: "",
    email: ""
};


export default UserListItem;
