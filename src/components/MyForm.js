import React from 'react'
import { useState } from 'react'
export default function MyForm({ handleSubmit, setNumberOfElements, numberOfElements}) {
  return (
    <form className="mt-3" onSubmit={handleSubmit}>
        <label>
          <span className="lead me-2">Number of elements: </span>  
          <input 
            value={numberOfElements}
            onChange={(e) => setNumberOfElements(e.target.value)} 
            className="rounded text-center" 
            type="number" 
            min={5} 
            max={300}
          />

        </label>
    </form>
  )
}
