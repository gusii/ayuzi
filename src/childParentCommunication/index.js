import React, {Component} from 'react'

function Child (props) {
  return <button onClick={props.onClickCallback}>{props.getLabel()}</button>
}

function Counter (props) {
  return <span>Times clicked: {props.count}</span>
}

export default class Parent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clickCount: 0
    }
  }

  addClick = (val) =>
    () => {
      const { clickCount } = this.state
      this.setState({ clickCount: clickCount + val})
    }

  getIncrementLabel = () => {
    return this.props.incrementLabel
  }

  getDecrementLabel = () => {
    return this.props.decrementLabel
  }

  render () {
    return (
      <div>
        <Counter count={this.state.clickCount} />
        <br/>
        <Child onClickCallback={this.addClick(1)} getLabel={this.getIncrementLabel}/>
        <Child onClickCallback={this.addClick(-1)} getLabel={this.getDecrementLabel}/>
      </div>
    )
  }
}
