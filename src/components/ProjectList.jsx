
import React, { Component, PropTypes } from 'react'
import Project from './Project.jsx'


export default class ProjectList extends Component {


	render() {
		const { projects, onProjectClick } = this.props
		return (
			<ul>
				{
					projects.map(
						(project, index) => 
							<Project key={index} iterId={index} onProjectClick={onProjectClick} header={project.header} completed={project.completed} />
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