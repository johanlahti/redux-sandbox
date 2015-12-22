
import React, { Component, PropTypes } from 'react'

export default class EditProjectForm extends Component {

	onFormSubmit(e) {
		e.preventDefault()
		let formData = {
			index: this.props.iterId,
			header: this.refs.header.value,
			descript: this.refs.descript.value
		}
		this.props.onSave(formData);
		// return false // same as preventDefault
	}

	onEditCancel(e) {
		this.props.onEditCancel(this.props.iterId)
	}

	render() {
		return (
			<form action="" onSubmit={e => this.onFormSubmit(e)}>
				<div class="form-group">
					<input ref="header" className="form-control" type="text" placeholder="E.g. My cool project" />
				</div>
				<div class="form-group">
					<textarea ref="descript" className="form-control" type="text" placeholder="Description" />
				</div>
				<div className="btn-group" role="group" aria-label="...">
					<button type="button" onClick={e => this.onEditCancel(e)} className="btn btn-default">Cancel</button>
					<button type="submit" className="btn btn-primary">Save</button>
				</div>
			</form>
		)
	}

}

EditProjectForm.propTypes = {
	iterId: PropTypes.number,
	onSave: PropTypes.func
}

EditProjectForm.defaultProps = {

}

			