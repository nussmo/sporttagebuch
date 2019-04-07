import React, { Component } from 'react';
import {Form, Row, Col, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-datepicker/dist/react-datepicker.css';
import './Container.css';
import _ from 'lodash';

class Container extends Component {
	
	constructor(props){
		super(props);
		this.state = { activityArr: [], date: new Date(), discipline: '', intensity: '', duration: '', notes: '' };
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
		var request = new Request('http://localhost:8080/tagebuch', {
			method: 'POST',
			headers: new Headers({
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify({
				date: this.state.date,
				discipline: this.state.discipline,
				intensity: this.state.intensity,
				duration: this.state.duration,
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
	
	onDurationChange(event){
		this.setState({duration: event.target.value});
	}
	
	onNotesChange(event){
		this.setState({notes: event.target.value});
	}

	
  render() {
		
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
			text: 'Intensität',
			sort: true
		},{
			dataField: 'duration',
			text: 'Dauer',
			sort: true
		},{
			dataField: 'notes',
			text: 'Bemerkungen',
			sort: true
		},{
			dataField: 'delete',
			text: 'Löschen',
			sort: true
		}];
		
	const defaultSorted = [{
			dataField: 'date',
			order: 'desc'
		}];
	

    return (
	<div className="App-container">
		<div className="newSportsactivity-container">
		<Form>
			<Form.Group as={Row}>
				<Form.Label column sm={2}>Datum</Form.Label>
				<Col sm={10}>
					<DatePicker 
						dateFormat="dd-MM-YYYY" 
						maxDate={new Date()} 
						selected={this.state.date} 
						onChange={this.onDateChange.bind(this)}
						className="bootstrap-datepicker"
					/>
				</Col>
			</Form.Group>
			<Form.Group as={Row}>
				<Form.Label column sm={2}>Dauer</Form.Label>
				<Col sm={5}>
					<Form.Control
						as="select" 
					>
						<option defaultValue="none">0h</option>
						<option value="1h">1h</option>
						<option value="2h">2h</option>
						<option value="3h">3h</option>
						<option value="4h">4h</option>
						<option value="5h">5h</option>
						<option value="6h">6h</option>
						<option value="7h">7h</option>
						<option value="8h">8h</option>
					</Form.Control>
				</Col>
				<Col sm={5}>
					<Form.Control 
						onChange={this.onDurationChange.bind(this)}
						as="select" 
					>
						<option defaultValue="none">0min</option>
						<option value="15min">15min</option>
						<option value="30min">30min</option>
						<option value="45min">45min</option>
					</Form.Control>
				</Col>
			</Form.Group>
			<Form.Group as={Row}>
				<Form.Label column sm={2}>Sportart</Form.Label>
				<Col sm={10}>
					<Form.Control 
						type="text" 
						placeholder="Sportart auswählen" 
						onChange={this.onDisciplineChange.bind(this)}
					/>
				</Col>
			</Form.Group>
			<Form.Group as={Row}>
				<Form.Label column sm={2}>Intensität</Form.Label>
				<Col sm={10}>
					<Form.Control 
						onChange={this.onIntensityChange.bind(this)}
						as="select" 
					>
						<option defaultValue="none">--</option>
						<option value="niedrig">niedrig</option>
						<option value="mittel">mittel</option>
						<option value="hoch">hoch</option>
					</Form.Control>
				</Col>
			</Form.Group>
			<Form.Group as={Row}>
				<Form.Label column sm={2}>Bemerkung</Form.Label>
				<Col sm={10}>
					<Form.Control 
						as="textarea" 
						placeholder="Bemerkung" 
						onChange={this.onNotesChange.bind(this)} 
					/>
				</Col>
			</Form.Group>
			<Button 
				className="float-right"
				type="submit" 
				onClick={this.submit.bind(this)}
				>
				erstellen
			</Button>
		</Form>
		</div>
		<div className="summarySportsactivity-container">
			<BootstrapTable 
				keyField='id' 
				data={this.state.activityArr} 
				columns={columns} 
				defaultSorted={defaultSorted}
			/> 
		</div>
	</div>
    )
  }
}

export default Container;
