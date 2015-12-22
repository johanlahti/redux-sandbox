/*
 * action types
 */

export const ADD_PROJECT = 'ADD_PROJECT'
export const REMOVE_PROJECT = 'REMOVE_PROJECT'
export const EDIT_PROJECT = 'EDIT_PROJECT'
export const MARK_PROJECT_AS_DONE = 'MARK_PROJECT_AS_DONE'
export const MARK_PROJECT_AS_UNDONE = 'MARK_PROJECT_AS_UNDONE'
export const TOGGLE_PROJECT_DONE = 'TOGGLE_PROJECT_DONE'
export const DRAG_OVER = 'DRAG_OVER'
export const DRAG_END = 'DRAG_END'
export const CANCEL_EDIT = 'CANCEL_EDIT'



/*
 * action creators
 */

export function addProject(header, descript="No description", editing=false) {
	return { type: ADD_PROJECT, header, descript, editing }
}

export function removeProject(index) {
	return { type: REMOVE_PROJECT, index }
}

export function editProject(index, header, descript) {
	return {type: EDIT_PROJECT, index, header, descript}
}

export function cancelEdit(index) {
	return {type: CANCEL_EDIT, index}
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