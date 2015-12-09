import React, { Component, PropTypes } from 'react'


export default class Project extends Component {


	handleClick(e) {
		let index = this.props.iterId;
		this.props.onProjectClick(index, this.props.completed)
	}

	render() {
		return (
			<li ref="li" onClick={e => this.handleClick(e)} style={this.props.completed ? {textDecoration: "line-through"} : {textDecoration: "none"}}>
				<h3>{this.props.header}</h3>
			</li>
		)
	}
}


Project.propTypes = {
	header: PropTypes.string,
	completed: PropTypes.bool,
	iterId: PropTypes.number,
	onProjectClick: PropTypes.func.isRequired
}
