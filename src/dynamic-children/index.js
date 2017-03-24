import React, { Component } from 'react';
import fetch from 'unfetch'

export default class DynamicChildrenDemo extends Component {

  constructor (...args) {
    super(...args)
    this.state = {
      total: 0,
      results: [],
      showMessage: true,
      message: "Loadinggg...",
      searchTerm: this.props.initialSearchTerm
    }
  }

  fetchMovies() {
    fetch('http://www.omdbapi.com/?s=' + this.state.searchTerm)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        if (res.Error) {
          this.setState({
            total: 0,
            showMessage: true,
            message: "No results found!"
          })
        } else {
          this.setState({
            total: res.totalResults,
            results: res.Search,
            showMessage: false
          })
        }
      })
  }

  getTotal(){
    return(
      <h1>{this.state.total}</h1>
    )
  }

  getMessage(){
    return (
      this.state.showMessage &&
      <div>{this.state.message}</div>
    )
  }

  getContent(){
    return (
      this.state.results.map((item, idx) =>
        <div key={idx}>
          <h2>{item.Title}</h2>
          <img src={item.Poster} />
        </div>
      )
    )
  }

  onTextInputChange = (e) => this.setState({searchTerm: e.target.value})

  onSearchClicked = () => this.fetchMovies()

  componentDidMount() {
    this.fetchMovies()
  }

  render () {
    return (
      <div>
        <input
          type='text'
          value={this.state.searchTerm}
          onChange={this.onTextInputChange}
        />
        <button onClick={this.onSearchClicked}>Search now!</button>
        {this.getTotal()}
        {this.getMessage()}
        {!this.state.showMessage && this.getContent()}
      </div>
    )
  }
}
