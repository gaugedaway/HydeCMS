import React from 'react'

export default class App extends React.Component {
  componentWillMount() {
    this.props.checkForSavedToken()
  }
  
  render() {
    return <div>{ this.props.children }</div>
  }
}