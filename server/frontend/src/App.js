import React, { Component } from 'react';

import LoginForm            from "./containers/LoginForm";
import UserList             from "./containers/UserList";

import './App.css';


class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <LoginForm />
                    <UserList />
                </header>
            </div>
        );
    }
}


export default App;
