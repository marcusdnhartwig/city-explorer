import React from 'react';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ListGroup } from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      cityData: {},
      error: false,
      errorMessage: ''
    }
  };

  getCityData = async (e) => {
    e.preventDefault();
    try {
      let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`
      console.log(url);

      let cityData = await axios.get(url)
      
      this.setState({ cityData: cityData.data[0] })
      let weatherData = await axios.get(`http://localhost:3001/weather?city=${this.state.city}`);
      this.setState({weatherData: weatherData.data[0]})
     
    } catch (error) {
      //console.log('error', error);
      //console.log('error.response', error.response);
      this.setState({
        error: true,
        errorMessage: `You've got an error!!: ${error.response.status}`
      })
    }
  };

  handleCityInput = (event) => {
    this.setState({
      city: event.target.value
    })
  }

  // getCityData = async (e) => {
  //   e.preventDefault();
  //   // get the data from the API
  //   let cityData = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`);
  //   console.log(cityData.data[0]);
  //   // save that data into state
  // }

  render() {

    console.log(this.state);
    return (
      <>
        <header>
          <h1>Find a City</h1>
          <form onSubmit={this.getCityData}>
            <label>Pick a city:
              <input type="text" onInput={this.handleCityInput} />
              <button type="submit">Explore!</button>
            </label>
          </form>
        </header>
        {this.state.error
          ?
          <p>{this.state.errorMessage}</p>
          :
          <ListGroup>
            <ListGroup> City: {this.state.cityData.display_name} </ListGroup> 
            <ListGroup.Item>lat: {this.state.cityData.lat}</ListGroup.Item>
            <ListGroup.Item> lon: {this.state.cityData.lon}</ListGroup.Item>
            <ListGroup.Item> <img alt={this.state.cityData.display_name} src={`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=12&size=300x300&format=<format>&maptype=<MapType>&markers=icon:<icon>|${this.state.cityData.lat},${this.state.cityData.lon}&markers=icon:<icon>|<latitude>,<longitude>`} /></ListGroup.Item>
          </ListGroup>
        }
      </>
    );
  };
};
