import React, { Component } from 'react';
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
  }

  renderSomethingMethod(min, max, current) {
    let returnJSX = [];
    for(let i = min; i < max; i++) {
      returnJSX.unshift(<div key={i} className={'temp_chart ' + (i > current? 'dull': 'bright') }></div>);
    }
    return returnJSX;
  }

  getWeather() {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      apixuAPI = 'https://api.apixu.com/v1/forecast.json?key=' + apixuAPIKey + '&q=' + lat + ',' + lon;
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
    });
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
              {this.renderSomethingMethod(
                parseInt(this.state.forecast.forecastday[0].day.mintemp_f, 0),
                parseInt(this.state.forecast.forecastday[0].day.maxtemp_f, 0),
                parseInt(this.state.current.temp_f, 0)
              )}
            </div>
          </div>
        }
      </div>
    )
  }
}
