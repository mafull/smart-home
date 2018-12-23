import React, { Component } from 'react';

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
                    <UserList users={[ { name: "Max" }, { name: "Emily" } ]} />
                </header>
            </div>
        );
    }
}


export default App;
