import React, { Component } from 'react';
import fetch from 'unfetch'

export default class DynamicChildrenDemo extends Component {

  constructor (...args) {
    super(...args)
    this.state = {
      total: 0,
      results: [],
      showExclusiveMessage: true,
      exclusiveMessage: "Loadinggg...",
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
            showExclusiveMessage: true,
            exclusiveMessage: "No results found!"
          })
        } else {
          this.setState({
            total: res.totalResults,
            results: res.Search,
            showExclusiveMessage: false
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
      <div>{this.state.exclusiveMessage}</div>
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

  onFormSubmit = (e) => {
    e.preventDefault()
    this.fetchMovies()
  }

  componentDidMount() {
    this.fetchMovies()
  }

  render () {
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <input
            type='text'
            value={this.state.searchTerm}
            onChange={this.onTextInputChange}
          />
          <button type='submit'>Search now!</button>
        </form>
        {this.getTotal()}
        {this.state.showExclusiveMessage && this.getMessage()}
        {!this.state.showExclusiveMessage && this.getContent()}
      </div>
    )
  }
}
