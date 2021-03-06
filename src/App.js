import React, { Component } from "react";
import HeaderForm from "./Header";
import "./main.css";
import Movies from "./Movie";

class App extends Component {
  apiKey = "d1ea5f4bdeb40b85cde2be1d5783522c";
  host = "https://api.themoviedb.org/3/search/movie";
  moviesId = 0;

  state = {
    movies: [],
    likeMovie: [],
  };

  inputMovie = (movie) => {
    fetch(
      `${this.host}?api_key=${this.apiKey}&language=en-US&page=1&include_adult=false&query=${movie}&total_pages=1`
    )
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("something went wrong");
        }
      })
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
        this.setState({ movies: movieArray });
      });
  };

  // handleLike = (movie) => {
  //   const likedMovie = [...this.state.movies];
  //   const index = likedMovie.indexOf(movie);
  //   likedMovie[index] = { ...movie };
  //   likedMovie[index].liked = !likedMovie[index].liked;
  //   //this.setState({ movies: likedMovie });
  //   this.setState({ likeMovie: likedMovie });
  // };

  handleLike = (movie) => {
    this.setState((prevState) => {
      if (prevState.likeMovie.includes(movie.id)) {
        return {
          likeMovie: prevState.likeMovie.filter(
            (movieID) => movieID !== movie.id
          ),
        };
      } else {
        return { likeMovie: [...prevState.likeMovie, movie.id] };
      }
    });
  };

  render() {
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
                  favoriteMovies={this.state.likeMovie}
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
