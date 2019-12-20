import React, {useState} from "react"

import "./Group.css"

const Group = ({sample = "", 
               isSample = false, 
               saves = {}, 
               inputText,
               idx,
               changeWindow,
               loadSample,
               saveSample,
               deleteSave
            }) => {
    
    let [search, setSearch] = useState("")
    
    const save = (def = "") => {
        saveSample(idx, prompt("Человеческое имя", def))
    }
    
    const renderSample = 
        <div className="mixer__group">
            <div onClick={save} 
                className="mixer__sample_header">Sample</div>
            <div className="mixer__sample_load"
                 onClick={e => changeWindow(idx)}>
                &dArr;
            </div>
            <textarea 
                className="mixer__sample_wrapper"
                cols="30" 
                rows="10"
                defaultValue={sample}
                onChange={e => inputText(e.target.value, idx)}
                onKeyDown={
                    e => {
                        if (e.ctrlKey && e.keyCode === 83) {
                            e.preventDefault();
                            save(sample.split("\n")[0])
                        }
                    }
                }
            />
        </div>

    const createLink = (save, name) => (
        <button key={save.human_name} 
                className="mixer__load_link"
                data-tooltip="для удаения кликнуть правой кнопкой мыши"
                onClick={
                    e => {
                        loadSample(idx, name)
                        changeWindow(idx)
                    }
                }
                onContextMenu={
                    e => {
                        e.preventDefault()
                        if(prompt("удалить?", "да") === "да"){
                            deleteSave(name)
                        }
                    }
                }>
            {save.human_name}
        </button>
    )

    const renderLoad = 
        <div className="mixer__group">
            <input 
                type="text" 
                className="mixer__load_search"
                value={search}
                onChange={e => setSearch(e.target.value)}/>
            <div className="mixer__load_sample"
                 onClick={e => changeWindow(idx)}>
                &larr;
            </div>
            <div className="mixer__load_link_wrapper">
            {
                (() => {
                    let array = []

                    for (const key in saves) {
                        array.push([saves[key], key])
                    }

                    let res = array
                        .filter(s => new RegExp(search, "ig").test(s[0].human_name))
                        .map(s => createLink(s[0], s[1]))
                    
                    if(res.length === 0) {
                        return (
                            <div className="mixer__link_empty">
                                К сожалению, подборок сейчас нет
                            </div>
                        ) 
                    }
                    return res
                })()
            }
            </div>
        </div>

    return (
        <div className="mixer__group_wrapper">
            { 
                isSample 
                    ? renderSample 
                    : renderLoad
            }
        </div>
    )
} 

export default Group