import { combineReducers } from 'redux'
import { ADD_PROJECT, REMOVE_PROJECT, MARK_PROJECT_AS_DONE,
	MARK_PROJECT_AS_UNDONE,
	TOGGLE_PROJECT_DONE } from '../actions/actions'


function projects(state = [], action) {
	switch (action.type) {
		case ADD_PROJECT:
			return [
				{
					header: action.header,
					completed: false
				},
				...state
			]
		case REMOVE_PROJECT:
			return [
				...state.slice(0, action.index),
				...state.slice(0, action.index + 1)
			]
				state.concat().splice(action.index, 1)
		case MARK_PROJECT_AS_DONE:
			let newState = [
				...state.slice(0, action.index),
				Object.assign({}, state[action.index], {
					completed: true
				}),
				...state.slice(action.index + 1)
			]
			return newState
		case MARK_PROJECT_AS_UNDONE:
			return [
				...state.slice(0, action.index),
				Object.assign({}, state[action.index], {
					completed: false
				}),
				...state.slice(action.index + 1)
			]
		default:
			return state
	}
}

const rootReducer = combineReducers({
	projects
})

export default rootReducer