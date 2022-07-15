import './App.css'; 
import { useState, useEffect } from 'react';
import MyNavbar from './components/MyNavbar';
import Button from 'react-bootstrap/Button'
import React from 'react'; 
import { mergeSortAnimations, bubleSortAnimations } from './algorithms/SortingAlgorithms'; 
// bar generator 
function BarGenerator ({array}) { 
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


function randomNumber (min, max) { 
  return Math.random() * (max-min+1) + min}
// Array generator
function randomNumberArray (numberOfRandomNumber) {
  let arr = [] 
  for(let i = 0; i<numberOfRandomNumber; i++){
      arr.push(randomNumber(5,100))
  }
  return arr  
} 
// end of bar generator 


function App() {
  const [numberOfElements, setNumberOfElements] = useState(20)
  const [array, setArray] = useState([])  
  // To generate ONCE at the start of rendering
  useEffect(() => {
    setArray(randomNumberArray(numberOfElements))
  }, [])
  const resetColor = () => {
    const bars = document.querySelectorAll('.bar')
    bars.forEach(bar => 
      bar.style.backgroundColor = '#6c757d' 
    )
  }
  // handleSubmit function to regenerate array
  const handleSubmit = (e) => {
    e.preventDefault() 
    setArray(randomNumberArray(numberOfElements))
  } 

  // animation_speed 
  const animation_speed = 15; 
  // 1 is placeholder value, I shall make it varying (TODO)

  // animating sorting
  // animating animating mergeSort 
  const handleDisabled = () => {
    const buttons = document.querySelectorAll('.btn')
    const inputs = document.querySelectorAll('input')
    buttons.forEach(btn => {
      btn.classList.add('disabled')
      btn.setAttribute('disabled', 'disabled')

    })
    inputs.forEach(input => {
      input.setAttribute('disabled', 'disabled')
    })
  }

  const handleDisabledRecover = () => {
    const buttons = document.querySelectorAll('.btn')
    const inputs = document.querySelectorAll('input')
    buttons.forEach(btn => {
      btn.classList.remove('disabled')
      btn.removeAttribute('disabled')
    })
    inputs.forEach(input => {
      input.removeAttribute('disabled', 'disabled')
    })
  } 
  // Animating sorting
  // Animating mergeSort
  function animateMergeSort (array) {  
    resetColor()
    // get the animation array 
    const animations = mergeSortAnimations(array)
    // To prevent spam clicking
    handleDisabled()
    
    
    // iterate through animation (either swapping or changing color)
    for ( let i = 0; i < animations.length; i++) {
        // grab the whole 'bar' in the dom 
        const bars = document.querySelectorAll('.bar') 
        // we change the color twice: 
        // for each type of animating case 
        const [elementIndex1, elementIndex2, type] = animations[i]

        if (type == 'COMPARE') {
          setTimeout(() => {
            bars[elementIndex1].style.backgroundColor = '#c6e2ff'
            bars[elementIndex2].style.backgroundColor = '#c6e2ff'
            }, i*animation_speed)
        } else if (type == 'UNCOMPARE') {
          setTimeout(() => {
            bars[elementIndex1].style.backgroundColor = '#6c757d'
            bars[elementIndex2].style.backgroundColor = '#6c757d'
            }, i*animation_speed)
          
        } else if (type == 'OVERWRITE'){
          setTimeout(() => {
            bars[elementIndex1].style.height = `${elementIndex2*0.6}vh`
            }, i*animation_speed)
        } else if (type == 'FIX') { 
          setTimeout(() => {
            bars[elementIndex1].style.backgroundColor = "#b7fcb7";
            }, i*animation_speed)
        }
        } 
      // we make it not disabled anymore so that user can click anything again :)
      setTimeout(() => {
        handleDisabledRecover()
      }, animations.length*animation_speed)
     


  }

  // end of animating mergeSort 
  
  

  // animating bubleSort 
  function animateBubleSort (array) { 
    resetColor()
    const animations = bubleSortAnimations(array)    
    // To prevent spam clicking
    handleDisabled()
    for (let i = 0; i < animations.length; i++) { 
      // grab the whole 'bar' in the dom 
      const bars = document.querySelectorAll('.bar') 
      
      const [elementIndex1, elementIndex2, type] = animations[i]
      if (type == 'COMPARE') {
        setTimeout(() => {
          bars[elementIndex1].style.backgroundColor = '#c6e2ff'
          bars[elementIndex2].style.backgroundColor = '#c6e2ff'
          }, i*animation_speed)
      } else if (type == 'UNCOMPARE') {
        setTimeout(() => {
          bars[elementIndex1].style.backgroundColor = '#6c757d'
          bars[elementIndex2].style.backgroundColor = '#6c757d'
          }, i*animation_speed)
        
      } else if (type == 'SWAP'){
        setTimeout(() => {
          const barLength1 = bars[elementIndex1].style.height
          const barLength2 = bars[elementIndex2].style.height
          bars[elementIndex1].style.height = barLength2; 
          bars[elementIndex2].style.height = barLength1;
          }, i*animation_speed)
      } else if (type == 'FIX') { 
        setTimeout(() => {
          bars[elementIndex1].style.backgroundColor = "#b7fcb7";
          }, i*animation_speed)
      }
    }
    setTimeout(() => {
      handleDisabledRecover()
    }, animations.length*animation_speed)
  }


  // end of animating sorting
  return (
    <div className="App">
      <MyNavbar randomNumberArray={randomNumberArray} setArray={setArray} numberOfElements={numberOfElements} handleSubmit={handleSubmit}/> 
      {/* Input field */}
      <form className="mt-3" onSubmit={handleSubmit}>
        <label>
          <span className="lead">Number of elements: </span>  
          <input 
            value={numberOfElements} 
            onChange={(e) => setNumberOfElements(e.target.value)} 
            className="rounded p-2 mx-3" 
            type="number" 
            min={5} 
            max={250}
          />
        </label>
      </form>
      {/* Bars */}

      <BarGenerator array={array}/>

      {/* Button groups */}
      <div>
            <div className="row justify-content-center align-items-center mt-4">    
                <Button variant="outline-secondary" className="col-2 mx-3 btn-lg" onClick={() => animateMergeSort(array)}>Merge Sort</Button>
                <Button variant="outline-secondary" className="col-2 mx-3 btn-lg">Insertion Sort</Button>
            </div>
            <div className="row justify-content-center align-items-center my-3">    
                <Button variant="outline-secondary" className="col-2 mx-3 btn-lg">Selection Sort</Button>
                <Button variant="outline-secondary" className="col-2 mx-3 btn-lg" onClick={() => animateBubleSort(array)}>Buble Sort</Button>
                <Button variant="outline-secondary" className="col-2 mx-3 btn-lg">Quick Sort</Button>
            </div>
        </div>
    </div>
  );
}

export default App;
// Slider todo for speed :) 
// Refactor:)  // kinda done for merge sort
// Stop break feature
// disabled buttons while doing process 
