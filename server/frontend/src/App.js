import React                from "react";
import {
    BrowserRouter as Router,
    Link,
    Redirect,
    Route,
    Switch
}                           from "react-router-dom";

import LoginPage            from "./containers/LoginPage";
import UserList             from "./containers/UserList";
import LoggedInRoute        from "./LoggedInRoute";


const Nav = () => (
    <ul>
        <Link to="/"><li>Home</li></Link>
        <Link to="/login"><li>Login Page</li></Link>
        <Link to="/users"><li>User List</li></Link>
    </ul>
);


const App = () => (
    <div>
        <Nav />
        <Switch>
            <Redirect exact from="/" to="/users" />
            <Route path="/login" exact component={LoginPage} />
            <LoggedInRoute path="/users" exact component={UserList} />
            <Redirect from="/" to="/" />
        </Switch>
    </div>
);


export default App;
