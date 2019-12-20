import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, combineReducers} from 'redux'

import * as reducers from "./model/reducer.js"
import {data} from "./model/data/initialState.js"

import App from './App'
import * as serviceWorker from './serviceWorker'

import './index.css'

const reducer = combineReducers(reducers)
// const store = createStore(reducer, data)
const store = createStore(reducer, loadState())

const saveState = () => {
	let saved = JSON.stringify(store.getState())
	if(!localStorage.mixer){
		localStorage.setItem("mixer", saved)
	} else {
		localStorage.mixer = saved
	}
}

function loadState() {
	let loaded = data

	if(localStorage.mixer !== undefined){
		try{
			loaded = JSON.parse(localStorage.mixer)
		}  catch(e){
			console.dir(e)
			console.dir(localStorage.mixer)
		}
	}

	return loaded
}

store.subscribe(saveState)
store.subscribe(() => {console.log(store.getState())})

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
// serviceWorker.unregister();
