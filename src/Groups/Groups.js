import React from "react"

import Group from "./Group/Group.js"

const Groups = ({groups, addWindow, ...throwed}) => {
    
    const renderGroups = () => {
        let arrayGroups = []
        
        for(let key in groups){
            arrayGroups.push([groups[key], key])
        }

        return arrayGroups.map( c => 
            <Group key={c[1]} idx={c[1]} {...c[0]} {...throwed} />
        )
    }

    const AddButton = () => (
        <button 
            value="MIX" 
            className="mixer__add-group"
            id="mixer__add-group"
            onClick={addWindow}
        >Add Mix</button>
    )

    return (
        <>
            <div id="mixer__groups" className="mixer__groups">
                {renderGroups()}
                <AddButton />
            </div>
        </>
    )
}

export default Groups