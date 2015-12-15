/*
 * action types
 */

export const ADD_PROJECT = 'ADD_PROJECT'
export const REMOVE_PROJECT = 'REMOVE_PROJECT'
export const MARK_PROJECT_AS_DONE = 'MARK_PROJECT_AS_DONE'
export const MARK_PROJECT_AS_UNDONE = 'MARK_PROJECT_AS_UNDONE'
export const TOGGLE_PROJECT_DONE = 'TOGGLE_PROJECT_DONE'
export const DRAG_OVER = 'DRAG_OVER'
export const DRAG_END = 'DRAG_END'



/*
 * action creators
 */

export function addProject(header) {
	return { type: ADD_PROJECT, header }
}

export function removeProject(index) {
	return { type: REMOVE_PROJECT, index }
}

export function markProjectAsDone(index) {
	return { type: MARK_PROJECT_AS_DONE, index }
}

export function markProjectAsUnDone(index) {
	return { type: MARK_PROJECT_AS_UNDONE, index }
}

export function toggleProjectDone(index, completed) {
	return function(dispatch) {
		let func = completed ? markProjectAsUnDone : markProjectAsDone
		dispatch(func(index))
	}
}

export function dragOver(idFrom, idTo) {
	return { type: DRAG_OVER, payload: {idFrom, idTo} }
}

export function dragEnd(idFrom, idTo) {
	return { type: DRAG_END, payload: {idFrom, idTo} }
}