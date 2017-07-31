import React, { Component } from 'react';

const apiKey = '243830a53c8e5bec35d4bf48f9bc600e';
const lat = '39.9602166';
const long = '-75.6231406';
const darkSkyForecast = 'https://api.darksky.net/forecast/' + apiKey + '/' + lat + ',' + long;

const openWeatherAPI = 'aa0db56eb7a3c08c9040e72966b27cd6';
let openWeatherForecast = '';

const apixuAPIKey = 'b6b024af2e5448f4bde153614173107';
let apixuAPI = '';

export class CurrentTemp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      temp: undefined
    };
    this.getWeather();
  }

  getWeather() {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      // openWeatherForecast = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid='+openWeatherAPI+'&units=imperial';
      apixuAPI = 'https://api.apixu.com/v1/current.json?key=' + apixuAPIKey + '&q=' + lat + ',' + lon;
      fetch(apixuAPI)
        .then((res) => {
          return res.json();
        })
        .then((resBody) => {
          console.log(resBody);
          this.setState({temp: resBody.current.temp_f})
        })
        .catch((err) => {
          console.error(err);
        });
    });
  }

  render() {
    return (
      <div>
        {this.state.temp === undefined &&
        <h2>
          Loading your current temp...
        </h2>
        }

        {this.state.temp !== undefined &&
          <div>
            <p>Hi Rach, it's</p>
            <h2>{this.state.temp}</h2>
          </div>
        }
      </div>
    )
  }
}
