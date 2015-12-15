import React, { Component, PropTypes } from 'react'

export default class AddProject extends Component {

	handleClick(e) {
		let inputNode = this.refs.inputProjectname
		const text = inputNode.value.trim()
		this.props.onAddClick(text)
		inputNode.value = ''
	}

	render() {
		return (
			<div>
				<span>
					<input class="input" ref="inputProjectname" type="text" placeholder="E.g. My cool project"></input>
				</span>
				<button class="btn btn-default" onClick={e => this.handleClick(e)}>{this.props.buttonText}</button>
			</div>
		)
	}

}

AddProject.propTypes = {
	onAddClick: PropTypes.func,
	buttonText: PropTypes.string
}

AddProject.defaultProps = {
	onAddClick: function(e) {
		alert("Add project")
	},
	buttonText: "Default text"
}