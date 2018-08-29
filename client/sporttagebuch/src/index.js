import React from 'react';
import ReactDOM from 'react-dom';
import'./index.css';

class Frontpage extends React.Component{
	render(){
		let titel = 'Neue Sportaktivität';
		let summary = 'Übersicht - letzte Aktivitäten';
	
		return(
			<div className="frontpage">
				<div>{titel}</div>
					<button>erstellen</button>
				<div>{summary}</div>
				<button>alle Aktivitäten</button>
			</div>
		);
		
	}
	
}


//========================================

ReactDOM.render(
  <Frontpage/>,
  document.getElementById('root')
);