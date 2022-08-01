// Bubble sort algorithm 
import { swap, finishing } from "./commonFunctionsHelper" 
export function bubbleSortAnimations (array) { 
    const animations = [] 
    for ( let right = array.length-1; right>=0; right--) {
        for ( let left = 0; left < right; left++) { 
            animations.push([left, left+1, 'COMPARE'])
            if ( array[left] >= array[left+1]) {
                swap(array, left, left+1)
                animations.push([left, left+1, 'SWAP'])
            }
            animations.push([left, left+1, 'UNCOMPARE'])
        }
        animations.push([right, right, 'ALREADY_SET'])
    }
    // Debug
    // console.log(array)
    finishing (array, animations)

    return animations

}


// end of bubble sort 
