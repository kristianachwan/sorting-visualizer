export function swap (array, idx1, idx2) { 
    [array[idx1], array[idx2]] = [array[idx2], array[idx1]]
}
export function finishing (array, animations) {
    animations.push(...array.map((e, i) => [i, i ,'FIX']))

}