// quicksort 
import { swap, finishing } from "./commonFunctionsHelper" 

// using swap 
function partition (array, left, right, animations) { 
    let pivot = array[right]
    let lo = left 
    animations.push([lo, lo, 'POINT'])
    let hi = right 
    animations.push([hi, hi, 'POINT'])
    while ( lo < hi ) {
        while ( lo < hi && array[lo] <= pivot) {
            lo++
            animations.push([lo, lo, 'POINT'])
            animations.push([lo-1, lo-1, 'UNPOINT'])
        }        
        while ( lo < hi && array[hi] >= pivot) {
            hi-- 
            animations.push([hi, hi, 'POINT'])
            animations.push([hi+1, hi+1, 'UNPOINT'])
        }
        if (lo < hi){
            animations.push([lo, hi, 'SWAP'])
            animations.push([lo, hi, 'UNPOINT'])
            swap(array, lo, hi)
        }
    }
    animations.push([lo, lo, 'UNPOINT'])
    animations.push([hi, hi, 'UNPOINT'])

    if (array[hi] > pivot) {
        animations.push([hi, right, 'POINT'])
        animations.push([hi, right, 'SWAP'])
        swap(array, hi, right)
        animations.push([hi, right, 'UNPOINT'])
    } else {
        // case pivot is the largest value
        hi = right
    }
    return hi
}

function quickSort(array, left, right, animations) {
    if (left < right ){
        let index = partition(array, left, right, animations)
        quickSort(array, left, index-1, animations)
        quickSort(array, index+1, right, animations)
    }


}

export function quickSortAnimations (array) { 
    const animations = [] 
    quickSort(array, 0, array.length-1, animations)
    finishing(array, animations)
    return animations

}

// end of quickSort