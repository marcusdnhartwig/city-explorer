import React from 'react';
import axios from 'axios';
import Movies from './Movies';
import Weather from './Weather';
import CityDisplay from './CityDisplay';
import SearchBar from './SearchBar';
import ErrorModal from './ErrorModal';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card} from 'react-bootstrap';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: [],
      error: false,
      errorMessage: '',
      showModal: false,
      weatherData: [''],
      weatherModal: false,
      movieData: [''],
      movieModal: false,
    }
  };

  hideModal = () => {
    this.setState({
      showModal: false,
      weatherModal: false,
      movieModal: false
    })
  }
  showModal = () => {
    this.setState({
      showModal: true
    })
  }
  handleCityInput = (event) => {
    this.setState({
      city: event
    })
  }

  getCityData = async (e) => {
    e.preventDefault();
    try {
      let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`

      let cityData = await axios.get(url)

      this.setState({ cityData: cityData.data })

    } catch (error) {
      this.setState({
        error: true,
        showModal: true,
        errorMessage: `You've got an error!!: ${error.response.status}`
      })
    }
  };

  getWeather = async (city) => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/weather?city=${city}`;
      let weatherData = await axios.get(url)

      this.setState({ weatherData: weatherData.data });
      this.setState({ weatherModal: true });

    } catch (error) {
      this.setState({
        error: true,
        showModal: true,
        errorMessage: `You've got an error!!: ${error.response.status}`
      })
    }
  }

  getMovie = async (city) => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/movie?city=${city}`;
      let movieData = await axios.get(url)

      this.setState({ movieData: movieData.data });
      this.setState({ movieModal: true });

    } catch (error) {
      this.setState({
        error: true,
        showModal: true,
        errorMessage: `You've got an error!!: ${error.response.status}`
      })
    }
  }

  render() {
    let cityResults = this.state.cityData.map((city, index) => {
      return (
        <CityDisplay key={index} city={city} getWeather={this.getWeather} getMovie={this.getMovie} />
      );
    });
    return (
      <>
        <Container>
          <SearchBar id='searchBar' handleCityInput={this.handleCityInput} getCityData={this.getCityData} 
          />
        </Container>
        <main>
          <Card>{cityResults}</Card>
        </main>
        <Container>
          <Weather weatherModal={this.state.weatherModal} hideWeatherModal={this.hideModal} weatherData={this.state.weatherData}
          />
          <Movies movieModal={this.state.movieModal} hideMovieModal={this.hideModal} movieData={this.state.movieData}
          />
          <ErrorModal error={this.state.error} errorMessage={this.state.errorMessage} modalState={this.state.showModal} hideModal={this.hideModal} showModal={this.showModal}
          />
        </Container>
      </>
    )
  }
}

export default Main;
