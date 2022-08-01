import { useEffect } from "react"

function RandomNumberGenerator (min, max) { 
    return Math.random() * (max-min+1) + min}
  // Array generator
export default function RandomNumberArrayGenerator (numberOfRandomNumber, sorted) {
    if(!sorted){
        let arr = [] 
        for(let i = 0; i<numberOfRandomNumber; i++){
            arr.push(RandomNumberGenerator(5,100))
        }
        return arr  
    }
  } 
  // end of bar generator 
  