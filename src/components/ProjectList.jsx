
import React, { Component, PropTypes } from 'react'
import Project from './Project.jsx'


export default class ProjectList extends Component {


	onProjectDragStart(e) {
		let li = e.target.tagName === "LI" ? e.target : e.target.parentElement;
		this._dragIdFrom = Number(li.dataset.id)
		e.dataTransfer.setData('text/plain', "Drag me somewhere")  // Needed for Firefox drag to work
	}

	onProjectDragEnd(e) {
		// let li = e.target.tagName === "LI" ? e.target : e.target.parentElement;
		this.props.onDragEnd(this._dragIdFrom, this._dragIdTo);
	}

	onDragOver(e) {
		let li = e.target.tagName === "LI" ? e.target : e.target.parentElement;
		this._dragIdTo = Number(li.dataset.id);
		this.props.onDragOver(this._dragIdFrom, this._dragIdTo);
	}

	render() {
		const { projects, onProjectClick } = this.props
		return (
			<ul onDragOver={e => this.onDragOver(e)}>
				{
					projects.map(
						(project, index) => 
							<Project key={index} iterId={index}
								draggingOver={project.draggingOver}
								onProjectDragStart={e => this.onProjectDragStart(e)} 
								onProjectDragEnd={e => this.onProjectDragEnd(e)} 
								onProjectClick={onProjectClick} header={project.header} completed={project.completed} />
					)
				}
			</ul>
		)
	}
}

ProjectList.propTypes = {
	projects: PropTypes.arrayOf(PropTypes.shape({
		header: PropTypes.string,
		completed: PropTypes.bool
	})),
	onProjectClick: PropTypes.func.isRequired
}



function getProps(state) {
	return {
		projects: state.projects,
		onProjectClick: state.onProjectClick
	}
}