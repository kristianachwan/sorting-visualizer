// merge sort algorithm 
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

function finishing (array, animations) {
    animations.push(...array.map((e, i) => [i, i ,'FIX']))

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



// Bubble sort algorithm 

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

function swap (array, idx1, idx2) { 
    [array[idx1], array[idx2]] = [array[idx2], array[idx1]]
}

// end of bubble sort 


// insertion sort 


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



// quicksort 

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

// end of quickSort (unfinished)


// selection sort 

export function selectionSortAnimations (array) { 
    const animations = [] 
    for(let i = 0; i < array.length; i++) {
        animations.push([i, i, 'TENTATIVE_MIN'])
        let min = [array[i], i]
        for( let j = i+1; j < array.length; j++){
            if ( array[j] < min[0] ){
                animations.push([min[1], min[1] , 'CANCEL_TENTATIVE_MIN'])
                min = [array[j], j]
                animations.push([min[1], min[1], 'TENTATIVE_MIN'])
            } 
            else {
                animations.push([j, j, 'COMPARE'])
                animations.push([j, j, 'UNCOMPARE'])
            }
        }
        if ( i == min[1] ) {
            // means no swap 
        }
        else {
            animations.push([i, i, 'TENTATIVE_MIN'])
            animations.push([i, min[1], 'SWAP'])
            swap(array, i, min[1])
            animations.push([min[1], min[1], 'CANCEL_TENTATIVE_MIN'])
        }
    }
    finishing(array, animations)
    console.log(animations)
    return animations

    
}
