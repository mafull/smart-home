import { string }   from "prop-types";
import React        from "react";


const UserListItem = (props) => {
    return (<li>{props.name}</li>);
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
