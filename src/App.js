import React, {Component} from "react";
import "./App.css";
import { CurrentTemp } from "./components/CurrentTemp";
import { Location } from "./services/Location.js"

class App extends Component {

  constructor() {
    super();
    this.state = {
      zip: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    console.log(this.state)
    this.setState({zip: event.target.value});
  }

  processZip() {
    return /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(this.state.zip);
  }

  findUser() {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let long = position.coords.longitude;
      Location.setLatLong(lat, long);
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.processZip()) {
      Location.setZip(this.state.zip);
    } else {
      alert('invalid zip');
    }

  }

  render() {
    return (
      <div className="App">
        {
          !Location.hasCurrentLocation() &&
            <div>
              <form onSubmit={this.handleSubmit}>
                <input type="text" value={this.state.zip} onChange={this.handleChange} maxLength={5}/>
                <input type="submit" value="Zip Code" disabled={this.state.zip.length < 5 }/>
              </form>
              <button
                onClick={this.findUser}
              >Use location!</button>
            </div>
        }
        {
          !!Location.hasCurrentLocation() &&
          <CurrentTemp/>
        }
      </div>
    );
  }
}

export default App;
