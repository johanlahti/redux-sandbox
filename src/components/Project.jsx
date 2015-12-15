import React, { Component, PropTypes } from 'react'


export default class Project extends Component {


	handleClick(e) {
		let index = this.props.iterId;
		this.props.onProjectClick(index, this.props.completed)
	}

	// componentWillReceiveProps(nextProps) {
	// 	console.log(nextProps)
	// }

	render() {
		var iterId = this.props.iterId,
			dragOverId = this.props.dragOverId;
		return (
			<li ref="li" draggable="true" 
					data-id={this.props.iterId}
					key={this.props.iterId}
					draggable="true"
					className={this.props.draggingOver ? "drag-here" : null}
					onClick={e => this.handleClick(e)}
					onDragStart={e => this.props.onProjectDragStart(e)}
					onDragEnd={e => this.props.onProjectDragEnd(e)}
					style={this.props.completed ? {textDecoration: "line-through"} : {textDecoration: "none"}}>
				<h3>{this.props.header}</h3>
			</li>
		)
	}
}


Project.propTypes = {
	header: PropTypes.string,
	completed: PropTypes.bool,
	dragOverId: PropTypes.number,
	iterId: PropTypes.number,
	onProjectClick: PropTypes.func.isRequired,
	onProjectDragStart: PropTypes.func,
	onProjectDragEnd: PropTypes.func
}
