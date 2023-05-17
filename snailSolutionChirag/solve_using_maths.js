// This started out to show that each location in the spiral can know its destination at the end
// Also with the assumption that the fastest way to traverse the lists is via the for in mechanism

// But it is all quite involved.
// Only chance this would be performant is if the array was massive and/or the cost of changing the list was expensive

// So this is really just an academic piece.
// F
function solve(arr){
    const listOfRings = breakGridIntoRings(arr);

    const unwound = [];

    for (const rowId in arr) {
        const row = arr[rowId];

        for (const colId in row) {
            const unwoundId = convertToUnwoundId(arr.length,  listOfRings, rowId, colId);​
            unwound[unwoundId] = row[colId];
        }
    }

    return unwound;
}
// Represents a single ring of cells
// sizeOfRing = number of cells along one side
// numberOfCellInRing = number of cells across all 4 side, i.e. (side length -1) * 4
// totalNumberOfCellsSoFar = how many cells there are in the rings outside of the current ring
class RingData{
    constructor(sizeOfRing, totalNumberOfCellsSoFar){
        this.sizeOfRing = sizeOfRing;

        if(sizeOfRing === 1){
            this.numberOfCellInRing = 1;
        }else{
            this.numberOfCellInRing = 4 * (sizeOfRing-1);
        }
        this.totalNumberOfCellsSoFar = totalNumberOfCellsSoFar;
    }
}
// Turn the grid into a set of concentric rings
function breakGridIntoRings(arr){
    const listOfRings = [];
    let runningTotal = 0;

    for (let index = arr.length, ringId = 0; index > 0; index -= 2, ringId++) {
        listOfRings[ringId] = new RingData(index, runningTotal);
        runningTotal += listOfRings[ringId].numberOfCellInRing;
    }
    return listOfRings;
}

function getMaxPossibleRingId(length, position){
    if(Math.floor(length/2)> position){
        return position;
    }else{
        return length - position - 1;
    }
}

// isFirstSide = () => ;  // i.e. top /// Don't need to impl this
isSecondSide = (y, sizeOfRing) => (y+1) === sizeOfRing; // i.e. right hand side of ring
isThirdSaid  = (x, sizeOfRing) => (x + 1) === sizeOfRing; // i.e. bottom of ring
isFourthSide = (x, y) => y === 0 && x !== 0; // i.e. left hand side of ring

function convertToUnwoundId( length, listOfRings, rowId, colId ){
    const ringId = Math.min(getMaxPossibleRingId(length, rowId), getMaxPossibleRingId(length, colId));

    const ring = listOfRings[ringId];

    const x = rowId - ringId;
    const y = colId - ringId;

    if(isFourthSide(x,y)) {
        return (ring.sizeOfRing - x) + ring.totalNumberOfCellsSoFar + ((ring.sizeOfRing-1) * 3)-1;
    }else if(isThirdSaid(x, ring.sizeOfRing)){
        return (ring.sizeOfRing - y) + ring.totalNumberOfCellsSoFar + ((ring.sizeOfRing-1) * 2)-1;
    }else if(isSecondSide(y, ring.sizeOfRing)){
        return x + ring.totalNumberOfCellsSoFar + (ring.sizeOfRing-1);
    }else {
        return y + ring.totalNumberOfCellsSoFar;
    } 
}


const arr = [[ 1, 2, 3,4]
            ,[12,13,14,5]
            ,[11,16,15,6]
            ,[10, 9, 8,7]];


console.log(solve(arr));
