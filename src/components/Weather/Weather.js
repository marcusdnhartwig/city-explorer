import React from "react";
import {Modal} from "react-bootstrap";
import WeatherData from "./WeatherData";

class Weather extends React.Component {
  render() {
    let weatherResults = this.props.weatherData.map((weather, index) => {
      return (
        <WeatherData 
          key= {index}
          weather= {weather}
        />
      );
    });
    return (
      <>
        <Modal 
          show={this.props.weatherModal}
          onClick={this.props.hideWeatherModal}
        >
          <Modal.Header closeButton>
            7 Day Forecast:
          </Modal.Header>
          <Modal.Body onClick={this.props.hideWeatherModal}>
            {weatherResults}
          </Modal.Body>
        </Modal>
      </>
    )
  }
}
export default Weather;