import React, { Component } from 'react';
import Header from './Header';
import Container from './Container';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
		<Header title='Sporttagebuch'/>
		<Container/>
		<Footer footertext='@ Monique Nussbaumer'/>
      </div>
    );
  }
}

export default App;
