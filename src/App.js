import React, { Component } from 'react';
import './App.css';
import Home from './components/home'
import Axios from 'axios';

class App extends Component{
  state={
    recipe: []
  }

  componentDidMount() {
    Axios.get('http://starlord.hackerearth.com/recipe').then(response => {
      console.count()
      this.setState({
        recipe: response.data
      })
    })
  }

  render(){
    return (
      <div className="App">
        <Home recipes={this.state.recipe} />
      </div>
    )
  }
}

export default App;
