import React from "react";
import { Card, Button } from "react-bootstrap";

class CityDisplay extends React.Component {
  getWeather = () => {
    this.props.getWeather(this.props.city.display_name.split(',')[0]);
  }
  getMovie = () => {
    this.props.getMovie(this.props.city.display_name.split(',')[0]);
  }
  render() {
    let mapUrl = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.props.city.lat},${this.props.city.lon}&zoom=13`
    return (
      <div>
        <Card className="h-100">
          <Card.Body>
            <Card.Img variant="top" src={mapUrl} />
            <Card.Title>{this.props.city.display_name}</Card.Title>
            <Card.Text>
              Longitude: {this.props.city.lon}
            </Card.Text>
            <Card.Text>
              latitude: {this.props.city.lat}
            </Card.Text>
            <Button onClick={this.getWeather}>Weather</Button>
            <Button onClick={this.getMovie}>Movies</Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
export default CityDisplay;

