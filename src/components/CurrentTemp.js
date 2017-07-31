import React, { Component } from 'react';

const apiKey = '243830a53c8e5bec35d4bf48f9bc600e';
const lat = '39.9602166';
const long = '-75.6231406';
const darkSkyForecast = 'https://api.darksky.net/forecast/' + apiKey + '/' + lat + ',' + long;

const openWeatherAPI = '';
const openWeatherForecast = 'http://api.openweathermap.org/data/2.5/weather?q=West%20Chester,PA&appid='+openWeatherAPI+'&units=imperial';

export class CurrentTemp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      temp: null
    }
  }

  getWeather() {
    return fetch(openWeatherForecast)
      .then((res) => {
        return res.json();
      })
      .then((resBody) => {
        console.log(resBody);
        return resBody.main.temp
      })
      .catch((err) => {
        console.error(err);
      });
  }

  componentDidMount() {
    this.setState({temp: this.getWeather()});
  }

  render() {
    return (
      <div>
        <h1>test</h1>
      </div>
    )
  }
}
