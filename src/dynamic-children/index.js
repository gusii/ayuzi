import React, { Component } from 'react';
import fetch from 'unfetch'

export default class DynamicChildrenDemo extends Component {

  constructor (...args) {
    super(...args)
    this.state = {
      total: 0,
      results: [],
      isLoading: true,
      searchTerm: this.props.initialSearchTerm
    }
  }

  fetchMovies() {
    fetch('http://www.omdbapi.com/?s=' + this.state.searchTerm)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        this.setState({
          total: res.totalResults,
          results: res.Search,
          isLoading: false
        })
      })
  }

  componentDidMount() {
    this.state.searchTerm !== '' && this.fetchMovies()
  }

  getTotal(){
    return(
      <h1>{this.state.total}</h1>
    )
  }

  getLoading(){
    return (
      this.state.isLoading &&
      <div>Loading...</div>
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

  render () {
    return (
      <div>
        {this.getTotal()}
        {this.getLoading()}
        {!this.state.isLoading && this.getContent()}
      </div>
    )
  }
}
