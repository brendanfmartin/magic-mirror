import React, {Component} from "react";
import "./App.css";
import { CurrentTemp } from "./components/CurrentTemp";
import { Location } from "./services/Location.js"

class App extends Component {

  constructor() {
    super();
    this.state = {
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    console.log(this.state)
    this.setState({value: event.target.value});
  }

  processZip() {
    let isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(this.state.zip);
    alert('test');
  }

  findUser() {
    alert('boom');
  }

  handleSubmit(event) {
    event.preventDefault();
    alert('A name was submitted: ' + this.state.value);

  }

  render() {
    return (
      <div className="App">


        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.value} onChange={this.handleChange} maxLength={5}/>
          <input type="submit" value="Zip Code" disabled={this.state.value.length < 5 }/>
        </form>


        {
          !Location.getCurrentLocation() &&
          <div>
            <div>
              <h1>zip entry</h1>
              <input
                type="text"
              />
            </div>
            <button
              onClick={this.processZip}
            >zip entry</button>
            <button
              onClick={this.findUser}
            >Use location!</button>
          </div>
        }
        {
          !!Location.getCurrentLocation() &&
          <CurrentTemp/>
        }
      </div>
    );
    this.testFn();
  }
}

export default App;
