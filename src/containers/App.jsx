import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { addProject, removeProject, toggleProjectDone, dragOver, dragEnd } from '../actions/actions'
import AddProject from '../components/AddProject.jsx'
import ProjectList from '../components/ProjectList.jsx'

// import Footer from '../components/Footer.jsx'

class App extends Component {

	componentDidMount() {
		const { dispatch } = this.props
		dispatch(addProject("5. And again some project"))
		dispatch(addProject("4. Again some project"))
		dispatch(addProject("3. Some other project"))
		dispatch(addProject("2. A cool project"))
		dispatch(addProject("1. Test project"))
	}

	render() {
		// Injected by connect() call:
		const { dispatch, projects = [{header: "Nothing here", completed: false}] } = this.props
		return (
			<div>
				<h1>Projects</h1>
				<AddProject
					buttonText={'Add project'}
					onAddClick={header =>
						dispatch(addProject(header))
					} />
				<ProjectList
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