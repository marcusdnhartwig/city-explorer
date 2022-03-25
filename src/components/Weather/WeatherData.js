import React from "react";

class WeatherData extends React.Component {
  render() {
    return (
      <>
        <p>Date: {this.props.weather.date} Forecast:{this.props.weather.description}</p>
      </>
    )
  }
}
export default WeatherData;