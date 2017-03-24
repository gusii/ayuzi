import React, {Component} from 'react'

function Child (props) {
  return <button onClick={props.onClickCallback}>{props.label}</button>
}

export default class Parent extends Component {
  constructor () {
    super()
    this.state = {
      clickCount: 0
    }
  }

  addClick = (val) => 
    () => {
      const { clickCount } = this.state
      this.setState({ clickCount: clickCount + val})
    }

  render () {
    return (
      <div>
        <span>Times clicked: {this.state.clickCount}</span>
        <br/>
        <Child onClickCallback={this.addClick(1)} label='Increase'/>
        <Child onClickCallback={this.addClick(-1)} label='Decrease'/>
      </div>
    )
  }
}
