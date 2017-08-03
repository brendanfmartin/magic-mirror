import React, { Component } from 'react';
import { Weather } from "../services/Weather.js"
import "./TempBar.css";

export class TempBar extends Component {

  constructor() {
    super();
    Weather.getWeather();
  }


  tempBar(min, max, temp) {
    let returnJSX = [];
    for(let i = min; i < max; i++) {
      returnJSX.unshift(<div key={i} className={'temp_chart ' + (i > temp? 'dull': 'bright') }></div>);
    }
    return returnJSX;
  }

  render() {
    return (
      <div>
        {
          this.tempBar(
            parseInt(this.props.min, 0),
            parseInt(this.props.max, 0),
            parseInt(this.props.temp, 0)
          )
        }
      </div>
    )
  }

}