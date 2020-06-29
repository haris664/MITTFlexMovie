import React, { Component } from "react";

class Movies extends Component {
  render() {
    return (
      <>
        <div className="movie">
          <img
            src={
              this.props.movie.poster.includes(null)
                ? "/image-not-available.jpg"
                : this.props.movie.poster
            }
            alt="Movie poster"
          />
          <div className="overlay">
            <div className="title">{this.props.movie.title}</div>
            <div className="rating">{`${this.props.movie.rating}/10`}</div>
            <div className="plot">{this.props.movie.overview}</div>
            <div
              data-toggled={this.props.favoriteMovies.includes(
                this.props.movie.id
              )}
              className="listToggle"
              onClick={this.props.onClick}
            >
              <div>
                <i className="far fa-heart"></i>
                <i className="fas fa-heart"></i>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Movies;
