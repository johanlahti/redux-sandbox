import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { addProject, removeProject, editProject, cancelEdit, toggleProjectDone, dragOver, dragEnd } from '../actions/actions'
import AddProject from '../components/AddProject.jsx'
import ProjectList from '../components/ProjectList.jsx'

// import Footer from '../components/Footer.jsx'

class App extends Component {

	componentDidMount() {
		const { dispatch } = this.props
		dispatch(addProject("5. And again some project", "Some descript 5"))
		dispatch(addProject("4. Again some project", "Some descript 4"))
		dispatch(addProject("3. Some other project", "Some descript 3"))
		dispatch(addProject("2. A cool project", "Some descript 2"))
		dispatch(addProject("1. Test project", "Some descript 1"))
	}

	handleClickBtnNew(e) {
		const { dispatch, projects } = this.props

		e.preventDefault();
		dispatch(addProject("", "", true))
		// let latestProjectId = projects.length - 1;
		// dispatch(editProject(latestProjectId))
	}

	onEditSave(o) {
		const { dispatch } = this.props
		dispatch(editProject(o.index, o.header, o.descript))
	}

	onEditCancel(index) {
		const { dispatch } = this.props
		dispatch(cancelEdit(index))
	}

	render() {
		// Injected by connect() call:
		const { dispatch, projects=[{header: "Nothing here", completed: false}], newFormVisible=false } = this.props
		return (
			<div className="maincontainer">
				<h1>Projects</h1>
				<button onClick={e => this.handleClickBtnNew(e)} className="btn btn-default"><i className="fa fa-plus"></i> New project</button>
				<ProjectList
					onEditCancel={this.onEditCancel.bind(this)}
					onEditSave={this.onEditSave.bind(this)}
					projects={projects}
					onDragEnd={(idFrom, idTo) =>
						(Number.isNaN(idFrom) === false && Number.isNaN(idTo) === false) ? dispatch(dragEnd(idFrom, idTo)) : null
					}
					onDragOver={(idFrom, idTo) =>
						(Number.isNaN(idFrom) === false && Number.isNaN(idTo) === false) ? dispatch(dragOver(idFrom, idTo)) : null
					}
					onProjectClick={ (index, completed) =>
						dispatch(toggleProjectDone(index, completed))
					} />
				
			</div>
		)
		// <Footer
				// 	filter={visibilityFilter}
				// 	onFilterChange={nextFilter =>
				// 		dispatch(setVisibilityFilter(nextFilter))
				// 	} />
	}
}

App.propTypes = {
	projects: PropTypes.arrayOf(PropTypes.shape({
		header: PropTypes.string,
		completed: PropTypes.bool
	})),
	onProjectClick: PropTypes.func
}

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function getProps(state) {
	return {
		projects: state.projects
	}
}

// Wrap the component to inject dispatch and state into it
export default connect(getProps)(App)