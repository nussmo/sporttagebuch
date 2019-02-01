import React, { Component } from 'react';
import'./index.css';

class Footer extends Component {

  render() {

    return (
	<div className="App-footer">
        <p>{ this.props.footertext }</p>
	</div>
    )
  }
}

export default Footer;
