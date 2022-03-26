import React from "react";

class MovieData extends React.Component {
  render() {
    return (
      <>
        <h3>{this.props.movie.title}</h3>
        <img style={{width:"100%"}} src={`https://image.tmdb.org/t/p/w500/${this.props.movie.imageUrl}`}alt="A movie poster would be here."/>
        <p>Movie Synopsis: {this.props.movie.description}</p>
        <p>Language: {this.props.movie.language} </p>
      </>
    )
  }
}
export default MovieData;

