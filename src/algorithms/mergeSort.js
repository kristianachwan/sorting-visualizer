// merge sort algorithm 
import { finishing } from "./commonFunctionsHelper" 

// this function just handle the case where the length is 1 and less, and create a deep copy
export function mergeSortAnimations (array) {
    if (array.length <=1) { 
        return array 
    }
    const animations = [] 
    // main functionality 
    // clone the array (deep copy) and store it into auxArray 
    let auxArray = [...array]
    mergeSort (array, 0, array.length-1, auxArray, animations) 
    finishing (array, animations)
    return animations
} 


/*
General procedure: 
1. We return every pair we compare TWICE (to color and re-color it back)
2. Then after we finish comparing, we put the sorted version in. 
*/ 
function mergeSort (mainArray, left, right, auxArray, animations) { 
    // base case 
    if (left === right) return; 
    // get the middle index
    const mid = left + Math.floor((right-left)/2)
    
    mergeSort(mainArray, left, mid, auxArray, animations)
    mergeSort(mainArray, mid+1, right, auxArray, animations)

    merge(mainArray, left, mid, right, auxArray, animations)
}


function merge (mainArray, left, mid, right, auxArray, animations) { 

    // we make 3 pointers 
    // for putting the correct value in the correct place 
    let k = left 

    // left pointer and right pointer 
    let i = left 
    let j = mid+1

    while ( i <= mid && j <= right ) {
        // we push this pair 2 times to color and re-color it back 
        animations.push([i,j, 'COMPARE'], [i,j, 'UNCOMPARE'])
        if ( auxArray[i] < auxArray[j]) {
            // in this case, we animate not the COMPARING but we OVERWRITE kth position with auxArray[i] value 
            animations.push([k, auxArray[i], 'OVERWRITE'])
            // we put the correct position in mainArray 
            mainArray[k++] = auxArray[i++]
        } else { 
            // in this case, we animate not the COMPARING but we OVERWRITE kth position with auxArray[j] value 
            animations.push([k, auxArray[j], 'OVERWRITE'])
            // we put the correct position in mainArray
            mainArray[k++] = auxArray[j++]
        }
    }

    // for a part that we have not 'discovered' yet, we need to push the 'animation' like before, but only specific to that 1 pointer 
    if (j>right) {
        // meaning that the right part is finished, then the left part is unfinished
        while (i <= mid) {
            animations.push([i, i, 'COMPARE'], [i,i, 'UNCOMPARE']); 
            animations.push([k, auxArray[i], 'OVERWRITE']);
            mainArray[k++] = auxArray[i++];
        }
    } else { 
        while (j <= right) {
            animations.push([j, j, 'COMPARE'], [j,j, 'UNCOMPARE']);
            animations.push([k, auxArray[j], 'OVERWRITE']);
            mainArray[k++] = auxArray[j++];
        }   
    }
    // after we do all these stuffs, we need to retreive assign the auxArray to be this somewhat correct mainArray for the next phase 
    for (i = 0; i < auxArray.length; i++){ 
        auxArray[i] = mainArray[i]
    }
}

