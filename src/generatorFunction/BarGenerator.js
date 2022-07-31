import React from "react"
export default function BarGenerator ({array}) { 
    return (
    <div className="container bar-wrapper">
        {array && array.map(element => 
                <React.Fragment key= {element}>
                    <IndividualBarGenerator element={element} numberOfElements={array.length}/>
                </React.Fragment>)}
    </div>) 
}

function IndividualBarGenerator ({element, numberOfElements}) { 
    const height = element*60/100 + 'vh' 
    const width = 80/numberOfElements + 'vw'
    
    return (
        <div className="bar" style={{height, width, background : '#6c757d'}}>
        </div>
    )
  }