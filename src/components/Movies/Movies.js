import React from "react";
import {Modal} from "react-bootstrap";
import MovieData from "./MovieData";

class Movie extends React.Component {
  render() {
    let movieResults = this.props.movieData.map((movie, index) => {
      return (
        <MovieData 
          key= {index}
          movie= {movie}
        />
      );
    });
    return (
      <>
        <Modal 
          show={this.props.movieModal}
          onClick={this.props.hideMovieModal}
        >
          <Modal.Header className="modalHead" closeButton>Movies with the same name!
          </Modal.Header>
          <Modal.Body class name="modalBody"onClick={this.props.hideMovieModal}>
            {movieResults}
          </Modal.Body>
        </Modal>
      </>
    )
  }
}
export default Movie;