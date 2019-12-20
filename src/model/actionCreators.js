import * as types from "./constants.js"

export const inputText = (text, idx) => {
    return {
        type: types.INPUT_TEXT,
        text,
        idx
    }
}

export const addWindow = () => ({
    type: types.ADD_WINDOW
})

export const saveSample = (idx, name, groups) => ({
    type: types.SAVE_SAMPLE,
    sample: groups[idx].sample,
    name
})

export const loadSample = (idx, name, saves) => ({
    type: types.LOAD_SAMPLE,
    idx,
    sample: saves[name].sample
})

export const changeWindow = (idx) => ({
    type: types.CHANGE_WINDOW,
    idx
})

export const getMix = (groups) => ({
    type: types.GET_MIX,
    groups
})

export const onMixChange = (value) => ({
    type: types.ON_MIX_CHANGE,
    value
})

export const deleteSave = (name) => ({
    type: types.DELETE_SAVE,
    name
})