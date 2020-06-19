import React, { Component } from "react";
import logo from "./GitHub-Mark-64px.png";
import "./App.css";
import Search from "./Search";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Git Search</h2>
        </div>
        <p className="App-intro"></p>
        <Search />
      </div>
    );
  }
}

export default App;
