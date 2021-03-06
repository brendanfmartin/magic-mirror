import React, { Component } from 'react';
import { TempBar } from "./TempBar.js";
import { ForecastGraph } from "./ForecastGraph.js"
import { Weather } from "../services/Weather.js"
import { Location } from "../services/Location.js"
import "./CurrentTemp.css";

const apixuAPIKey = 'b6b024af2e5448f4bde153614173107';
let apixuAPI = '';

export class CurrentTemp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      current: {},
      location: {},
      forecast: {}
    };
    this.getWeather();
    Weather.getWeather();
  }

  tempBar(min, max, current) {
    let returnJSX = [];
    for(let i = min; i < max; i++) {
      returnJSX.unshift(<div key={i} className={'temp_chart ' + (i > current? 'dull': 'bright') }></div>);
    }
    return returnJSX;
  }

  getWeather() {
    const currentLocation = Location.getCurrentLocation();
    if (Location.getCurrentLocation()) {
      const baseURL = 'https://api.apixu.com/v1/forecast.json?key=' + apixuAPIKey;
      let query;
      !!currentLocation.zip ?  query = currentLocation.zip : currentLocation.lat + ','+currentLocation.long;
      apixuAPI =  baseURL+ '&q=' + query;
      fetch(apixuAPI)
        .then((res) => {
          return res.json();
        })
        .then((resBody) => {
          console.log(resBody);
          this.setState({
            current: resBody.current,
            location: resBody.location,
            forecast: resBody.forecast
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  render() {
    return (
      <div>
        {this.state.current.temp_f === undefined &&
        <h2>
          Loading your current temp...
        </h2>
        }

        {this.state.current.temp_f !== undefined &&
          <div>
            <h2>{parseInt(this.state.current.temp_f, 0)}</h2>
            <img style={{'filter': 'brightness(0) invert(1)'}}
                 src={this.state.current.condition.icon}
                 alt={this.state.current.condition.text}
            />
            <h3>{this.state.current.condition.text}</h3>
            <h3>{this.state.location.name}</h3>
            <h3>{parseInt(this.state.forecast.forecastday[0].day.maxtemp_f, 0)}</h3>
            <h3>{parseInt(this.state.forecast.forecastday[0].day.mintemp_f, 0)}</h3>
            <div>
              <TempBar
                min={this.state.forecast.forecastday[0].day.mintemp_f}
                max={this.state.forecast.forecastday[0].day.maxtemp_f}
                temp={this.state.current.temp_f}
              />
              <ForecastGraph
                forecast={this.state.forecast}
              />
            </div>
          </div>
        }
      </div>
    )
  }
}
