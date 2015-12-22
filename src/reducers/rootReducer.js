import { combineReducers } from 'redux'
import {
	ADD_PROJECT,
	REMOVE_PROJECT,
	EDIT_PROJECT,
	CANCEL_EDIT,
	MARK_PROJECT_AS_DONE,
	MARK_PROJECT_AS_UNDONE,
	TOGGLE_PROJECT_DONE,
	DRAG_OVER,
	DRAG_END } from '../actions/actions'

function projects(state = [], action) {
	switch (action.type) {
		case ADD_PROJECT:
			return [
				{
					header: action.header,
					descript: action.descript,
					editing: action.editing, // new project without content
					completed: false
				},
				...state
			]
		case REMOVE_PROJECT:
			return [
				...state.slice(0, action.index),
				...state.slice(0, action.index + 1)
			]
		case EDIT_PROJECT:
			// TODO: Later maybe make all other projects editing: false here???
			return [
				...state.slice(0, action.index),
				Object.assign({}, state[action.index], {
					editing: false,
					header: action.header,
					descript: action.descript,
					completed: false
				}),
				...state.slice(action.index + 1)
			]
		case CANCEL_EDIT:
			return [
				...state.slice(0, action.index),
				Object.assign({}, state[action.index], {
					editing: false
				}),
				...state.slice(action.index + 1)
			]
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
		case DRAG_OVER:
			// Set drag over attribute so that the css class will change for list item <Project />
			let dragOverState = [...state.slice()]
			dragOverState.forEach(function(item, i) {
				if (i === action.payload.idTo) {
					item.draggingOver = true
					return false // continue
				}
				item.draggingOver = false
			})
			// dragOverState[idTo]
			return dragOverState

		case DRAG_END:
			let outArr = [...state.slice()]
			
			if (action.payload.idFrom === action.payload.idTo) {
				return state;
			}
			let draggedItem = outArr.splice(action.payload.idFrom, 1)[0]
			// if (idFrom < idTo) {
			// 	idTo += 1; // index for new position has changed because array has changed
			// }
			outArr.splice(action.payload.idTo, 0, Object.assign({}, draggedItem)) // Insert again at new index
			// Set ids based on new indexes
			outArr.forEach(function(theItem, i) {
				theItem.iterId = i
				theItem.draggingOver = false
			})
			// console.log(outArr)
			return outArr
		default:
			return state
	}
}

const rootReducer = combineReducers({
	projects
})

export default rootReducer
