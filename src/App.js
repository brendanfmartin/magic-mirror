import React, {Component} from "react";
import "./App.css";
import {CurrentTemp} from "./components/CurrentTemp";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <CurrentTemp/>
        </div>
        <p className="App-intro">
        </p>
      </div>
    );
  }
}

export default App;
