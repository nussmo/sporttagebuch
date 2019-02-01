import React from 'react';
import ReactDOM from 'react-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import {FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import _ from 'lodash';
import Header from './Header';
import Footer from './Footer';
import'./index.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
	
class Frontpage extends React.Component{
	
	constructor(props){
		super(props);
		this.state = { activityArr: [], date: moment(), discipline: '', intensity: '', notes: '' };
	}
	
	componentDidMount(){
		fetch('http://localhost:8080/tagebuch')
		.then(response =>
		response.json()
		).then(json => this.setState({activityArr: json})
		).catch(error => {
			console.error(error);
		})
	}
	
	submit(activity){
		console.log('create');
		var request = new Request('http://localhost:8080/tagebuch', {
			method: 'POST',
			headers: new Headers({
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify({
				date: this.state.date,
				discipline: this.state.discipline,
				intensity: this.state.intensity,
				notes: this.state.notes
			})
		});
		
		fetch(request)
		.then(response =>
		response.json()
		).then(newAktivity => {
			this.setState({ activityArr: _.concat(this.state.activityArr, newAktivity)});
		}).catch(error => {
			console.error(error);
		});
	}
	
	onDateChange(event){
		this.setState({date: event});
	}
	
	onDisciplineChange(event){
		this.setState({discipline: event.target.value});
	}
	
	onIntensityChange(event){
		this.setState({intensity: event.target.value});
	}
	
	onNotesChange(event){
		this.setState({notes: event.target.value});
	}
	
	render(){
		let titel = 'Neue Sportaktivität';
		let summary = 'Übersicht - letzte Aktivitäten';
		const columns = [{
			dataField: 'id',
			text: '#',
			sort: true
		},{
			dataField: 'date',
			text: 'Datum',
			sort: true,
			order: 'desc',
			onSort: (field, order) => {}
		},{
			dataField: 'discipline',
			text: 'Sportart',
			sort: true
		},{
			dataField: 'intensity',
			text: 'Intensitaet',
			sort: true
		},{
			dataField: 'notes',
			text: 'Bemerkungen',
			sort: true
		}];
		
		const defaultSorted = [{
			dataField: 'date',
			order: 'desc'
		}];
	
		return(
			<div className="frontpage">
			<Header title='Sporttagebuch'/>
				<div className="createNewClass">
					<div className="newTitle">{titel}</div>
					<form className="newForm">
						
						<FormGroup controlId="formControlsSportsactivity">
							<ControlLabel className="dateLabel">Datum</ControlLabel>
							<DatePicker dateFormat="DD-MM-YYYY" maxDate={moment()} selected={this.state.date} onChange={this.onDateChange.bind(this)}/>
							<ControlLabel className="disciplineLabel">Sportart</ControlLabel>
							<FormControl 
								className="disciplineControl"
								type="text" 
								placeholder="Sportart auswählen" 
								onChange={this.onDisciplineChange.bind(this)}
							/>
							<p></p>
							<ControlLabel className="intensityLabel">Intensitaet</ControlLabel>
							<FormControl 
								className="intensityControl"
								componentClass="select"
								placeholder="Intensitaet auswählen" 
								onChange={this.onIntensityChange.bind(this)}
							>
								<option defaultValue="none">--</option>
								<option value="niedrig">niedrig</option>
								<option value="mittel">mittel</option>
								<option value="hoch">hoch</option>
							</FormControl>
							<p></p>
							<ControlLabel className="notesLabel">Bemerkung</ControlLabel>
							<FormControl 
								className="notesControl"
								componentClass="textarea" 
								placeholder="Bemerkung"
								onChange={this.onNotesChange.bind(this)} 
							/>
						</FormGroup>
						<Button className="newButton" type="submit" onClick={this.submit.bind(this)}>erstellen</Button>
					</form>
				</div>
				<div className="summaryClass">
					<div>{summary}</div>
					<BootstrapTable keyField='id' data={this.state.activityArr} columns={columns} defaultSorted={defaultSorted}/> 
				</div>
			<Footer footertext='@ Monique Nussbaumer'/>
			</div>
		);
		
	}
	
}


//========================================

ReactDOM.render(
  <Frontpage/>,
  document.getElementById('root')
);