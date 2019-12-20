import {data} from "./data/initialState.js"
import * as types from "./constants.js"


export const groups = (state = data.groups, action) => {
	let { type } = action
	let { text, idx, name, sample } = action
	
	let res = {...state}
	
	switch (type) {
		case types.ADD_WINDOW:
			let id = "group" + (Object.keys(state).length + 1);
			res[id] = {}
			return res
			
		case types.INPUT_TEXT:
				res[idx].sample = text
				return res
				
		case types.CHANGE_WINDOW:
			res[idx].isSample = !res[idx].isSample
			return res
			
		case types.LOAD_SAMPLE:
			res[idx].sample = sample
			return res
				
		default:
			return state
	}
}
					
export const mix = (state = data.mix, action) => {
	let { groups, value } = action
	switch (action.type) {
		case types.GET_MIX:
			let samples = []

			for (let key in groups){
				samples.push(groups[key].sample)
			}

			let samplesArray = samples
				// обработка null, undefined, "" одновременно
				.filter(c => !!c)
				.map(c => c.split("\n"))
			
			return mixArrays(samplesArray)
				.filter(c => c !== [])
				.join("\n")
				.trim()
		
		case types.ON_MIX_CHANGE:
			return value
		default:
			return state
	}
}
	
export const saves = (state = data.saves, action) => {
	let { sample, name } = action
	let res = {...state}
	
	switch (action.type) {
		case types.SAVE_SAMPLE:
			if(!name) return state
			let names = []
			let id = "save" + Date.now();			
			
			for (let key in state) {
				names.push(state[key].human_name)
			}
			if(names.includes(name)){
				let agree = prompt("Такое имя уже существует, заменить?", "да")
				if(agree !== "да"){
					return state
				}
				for (let key in state) {
					if(state[key].human_name === name){
						id = key
						break
					}
				}
			}
			res[id] = {}
			res[id].human_name = name
			res[id].sample = sample

			return res
		
		case types.DELETE_SAVE:
			delete res[name]
			return res

		default:
			return state
	}
}

const mixTwoArrays = (arr1, arr2) => 
	arr1.reduce((acc, curr) => 
		[...acc, ...arr2.map(c => c + " " + curr)]
	, [])

const mixArrays = (arrayOfArrays) => {
	return arrayOfArrays.reduce((acc, curr) => {

		if(acc.length === 0) return curr
		if(curr.length === 0) return acc
		
		return mixTwoArrays(curr, acc)
	}, [])
}