import React from "react";
import { Container } from "react-bootstrap";
import "./SearchBar.css"

class SearchBar extends React.Component {
  render() {
    return (
      <Container id="containerButton">
        <form >
          <label>Pick a city:
            <input type="text" onInput={(event) => {
             this.props.handleCityInput(event.target.value)} 
             }
            />
            <button id='formButton' onClick={this.props.getCityData}>Explore!</button>
          </label>
        </form>
      </Container>
    )
  }



}
export default SearchBar;