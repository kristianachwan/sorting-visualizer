// selection sort 
import { swap, finishing } from "./commonFunctionsHelper" 

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
