// insertion sort 
import { swap, finishing } from "./commonFunctionsHelper" 


export function insertionSortAnimations (array) {
    const animations = [] 
    for (let right = 0; right < array.length-1; right++){ 
        let pointer = right 
        while (array[pointer] > array[pointer+1] && pointer>=0) {  
            animations.push([pointer, pointer+1, 'COMPARE'])
            swap(array, pointer, pointer+1)
            animations.push([pointer, pointer+1, 'SWAP'])
            animations.push([pointer, pointer+1, 'UNCOMPARE'])
            pointer--; 
        }
    }
    finishing(array, animations)
    return animations 

}

