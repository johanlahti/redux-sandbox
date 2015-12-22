
import React, { Component, PropTypes } from 'react'
import Project from './Project.jsx'
import { dragEnd } from '../actions/actions'
import { editProject } from '../actions/actions.js'

export default class ProjectList extends Component {


	onEditSave(o) {
		this.props.onEditSave(o)
	}

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
			<ul className="list-group" onDragOver={e => this.onDragOver(e)}>
				{
					projects.map(
						(project, index) => 
							<Project key={index} iterId={index}
								onEditCancel={this.props.onEditCancel}
								onEditSave={this.onEditSave.bind(this)}
								editing={project.editing}
								draggingOver={project.draggingOver}
								onProjectDragStart={e => this.onProjectDragStart(e)} 
								onProjectDragEnd={e => this.onProjectDragEnd(e)} 
								onProjectClick={onProjectClick}
								header={project.header}
								descript={project.descript}
								completed={project.completed} />
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