import React, { Component } from "react";
import HeaderForm from "./Header";
import "./main.css";
import Movies from "./Movie";

class App extends Component {
  apiKey = "d1ea5f4bdeb40b85cde2be1d5783522c";
  host = "https://api.themoviedb.org/3/search/movie";
  moviesId = 0;
  tempArray = [];

  state = {
    movies: [],
    likedMovie: [],
  };

  inputMovie = (movie) => {
    fetch(
      `${this.host}?api_key=${this.apiKey}&language=en-US&page=1&include_adult=false&query=${movie}&total_pages=1`
    )
      .then((response) => response.json())
      .then((movies) => {
        let movieArray = [];
        movies.results.forEach((movie) => {
          this.moviesId = movie.id;
          movieArray.push({
            title: movie.title,
            overview: movie.overview,
            poster: `https://image.tmdb.org/t/p/w500//${movie.poster_path}`,
            rating: movie.vote_average,
            id: movie.id,
            liked: "",
          });
        });
        this.tempArray = [...movieArray];
        this.setState({ movies: movieArray });
      });
  };

  handleLike = (movie) => {
    let likedMovie = [...this.state.movies];
    const index = likedMovie.indexOf(movie);
    likedMovie[index] = { ...movie };
    likedMovie[index].liked = !likedMovie[index].liked;
    this.setState({ movies: likedMovie });
    this.setState({ likedMovie });
    console.log(this.tempArray);
  };

  render() {
    //console.log(this.state.movies);
    return (
      <>
        <header className="header">
          <a href="/">
            <img
              src="https://fontmeme.com/permalink/190707/fd4735271a0d997cbe19a04408c896fc.png"
              alt="netflix-font"
              border="0"
            />
          </a>
          <HeaderForm inputMovie={this.inputMovie} />
        </header>
        <div className="titleList">
          <div className="title">
            <h1>Movies</h1>
            <div className="titles-wrapper">
              {this.state.movies.map((movie) => (
                <Movies
                  movie={movie}
                  key={movie.id}
                  liked={movie.liked}
                  onClick={() => this.handleLike(movie)}
                />
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default App;
