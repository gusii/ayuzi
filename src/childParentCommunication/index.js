import React, {Component} from 'react'

function Child (props) {
  return <button onClick={props.onClickCallback}>Click me!</button>
}

export default class Parent extends Component {
  constructor () {
    super()
    this.state = {
      clickCount: 0
    }
  }

  handleClick = () => {
    const { clickCount } = this.state
    this.setState({ clickCount: clickCount + 1})
  }

  render () {
    return (
      <div>
        <span>Times clicked: {this.state.clickCount}</span>
        <br/>
        <Child onClickCallback={this.handleClick}/>
      </div>
    )
  }
}
