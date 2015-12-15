import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { Provider } from 'react-redux'
import App from './containers/App.jsx'
import rootReducer from './reducers/rootReducer'
import * as actions from './actions/actions.js'

const createStoreWithMiddleware = applyMiddleware(
	thunk
)(createStore);

let store = createStoreWithMiddleware(rootReducer)

let rootElement = document.getElementById('root')
render(
	<Provider store={store}>
		<App />
	</Provider>,
	rootElement
)