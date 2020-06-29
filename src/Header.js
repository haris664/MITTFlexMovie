import React, { Component } from "react";

class HeaderForm extends Component {
  state = {
    query: "",
  };

  handleChangeInput = (query) => {
    this.setState({ query });
  };

  inputMovie = (e) => {
    this.props.inputMovie(this.state.query);
    e.preventDefault();
    this.setState({ query: "" });
  };

  render() {
    return (
      <>
        <form id="search" className="search" onSubmit={this.inputMovie}>
          <input
            type="search"
            placeholder="Search for a title..."
            value={this.state.query}
            onChange={(e) => this.handleChangeInput(e.target.value)}
          />
        </form>
      </>
    );
  }
}

export default HeaderForm;
