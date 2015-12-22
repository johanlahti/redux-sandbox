import React, { Component, PropTypes } from 'react'
import EditProjectForm from '../components/EditProjectForm.jsx'


export default class Project extends Component {


	handleClick(e) {
		let index = this.props.iterId;
		this.props.onProjectClick(index, this.props.completed)
	}

	// componentWillReceiveProps(nextProps) {
	// 	console.log(nextProps)
	// }

	render() {
		let {iterId, header, descript, dragOverId, editing, onEditSave, onEditCancel} = this.props;
		
		if (editing) {
			return <li><EditProjectForm iterId={iterId} onSave={onEditSave} onEditCancel={onEditCancel} /></li>
		}
		else {
			var className = "list-group-item"
			return <li 		
						ref="li"
						draggable="true" 
						data-id={this.props.iterId}
						key={this.props.iterId}
						draggable="true"
						className={this.props.draggingOver ? className + " drag-here" : className}
						onClick={e => this.handleClick(e)}
						onDragStart={e => this.props.onProjectDragStart(e)}
						onDragEnd={e => this.props.onProjectDragEnd(e)}
						style={this.props.completed ? {textDecoration: "line-through"} : {textDecoration: "none"}}>
						
						<h4 className="list-group-item-heading">{header}</h4>
						<p className="list-group-item-text">{descript}</p>
					</li>
		}
	}
}


Project.propTypes = {
	header: PropTypes.string,
	completed: PropTypes.bool,
	dragOverId: PropTypes.number,
	iterId: PropTypes.number,
	onEditSave: PropTypes.func,
	onProjectClick: PropTypes.func.isRequired,
	onProjectDragStart: PropTypes.func,
	onProjectDragEnd: PropTypes.func
}
