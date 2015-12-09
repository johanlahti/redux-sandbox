import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { addProject, removeProject, toggleProjectDone } from '../actions/actions'
import AddProject from '../components/AddProject.jsx'
import ProjectList from '../components/ProjectList.jsx'

// import Footer from '../components/Footer.jsx'

class App extends Component {
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
	onProjectClick: PropTypes.func.isRequired
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