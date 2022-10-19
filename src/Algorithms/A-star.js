


const manHattanDistance = (x1,y1,x2,y2) => {
    const distance = Math.abs(x1-x2) + Math.abs(y1-y2);
    
    return distance;
}
const calcNodeDistance = (currentNode,rowIndex,colIndex,ROW_END,COL_END) => {

    let actualR = Math.abs(ROW_END - currentNode.row);
    let actualC = Math.abs(COL_END - currentNode.col);

    let r = Math.abs(ROW_END - rowIndex);
    let c = Math.abs(COL_END - colIndex);
    let distance =0;

    if(actualR < r) {
        distance += 1;
    }
    if(actualC < c) {
        distance += 1;
    }

    if(actualR >= r) {
        distance +=.5;
    }

    if(actualC >= c) {
        distance +=.5;
    }

    return distance


}


const isValid = (rowIndex,colIndex,ROW_SIZE,COL_SIZE) => {
    if(rowIndex < 0 || rowIndex >= ROW_SIZE || colIndex < 0 || colIndex >= COL_SIZE){
        return false;
    }
    return true;
}

// let counter = 0;


export const aStar = (grid,ROW_START,ROW_END,COL_START,COL_END,ROW_SIZE,COL_SIZE) => {


    

    if(ROW_START < 0 || ROW_END >= ROW_SIZE || COL_START < 0 || COL_END >= COL_SIZE || (ROW_START === ROW_END && COL_START === COL_END)){
        return;
    }
    const visitedNodes = []; //closed List

    const startNode = grid[ROW_START][COL_START];

    startNode.distance = 0;
    // startNode.heuristicDistance = manHattanDistance(ROW_START,COL_START,ROW_END,COL_END);
    // startNode.calculatedDistance = startNode.distance + startNode.heuristicDistance;
    // startNode.heuristicDistance = 0;
    // startNode.calculatedDistance = 0;
    
    //start (r,c),distance,prevNode
    const queue = [[ROW_START,COL_START,0,-1,0]]; //open list
    
    while(queue.length > 0) {
        sortByDistance(queue) //impl min heap    

        // console.log(queue.slice())
        
        // if(counter++ > 2) {
        //     break
        // }

        // console.log(queue.slice())
        
        const [rowIndex,colIndex,distance,previousNode] = queue.shift();

        // if(rowIndex < 0 || rowIndex >= ROW_SIZE || colIndex < 0 || colIndex >= COL_SIZE){
        //     continue;
        // }

        const node = grid[rowIndex][colIndex];
        const {isVisited,isWall} = node;

        if(isWall) {
            continue;
        }

        if(isVisited) {
            continue;
        }
        node.distance = distance;
        node.isVisited = true;
        node.previousNode = previousNode;

       

        if(isValid(rowIndex+1,colIndex,ROW_SIZE,COL_SIZE)) {
            const h = manHattanDistance(rowIndex+1,colIndex,ROW_END,COL_END);
            // const g = distance +1
            const g = calcNodeDistance(node,rowIndex,colIndex,ROW_END,COL_END)
            const f = h+g
            
            // if(temp[f] === undefined)
                // temp[f] = [rowIndex+1,colIndex]
                queue.push([rowIndex+1,colIndex,distance+1,node,f])
        }

        if(isValid(rowIndex,colIndex+1,ROW_SIZE,COL_SIZE)) {
            const h = manHattanDistance(rowIndex,colIndex+1,ROW_END,COL_END);
            // const g = distance +1
            const g = calcNodeDistance(node,rowIndex,colIndex,ROW_END,COL_END)
            const f = h+g
            
            // if(temp[f] === undefined)
                // temp[f] = [rowIndex,colIndex+1]
            queue.push([rowIndex,colIndex+1,distance+1,node,f])
        }
        if(isValid(rowIndex-1,colIndex,ROW_SIZE,COL_SIZE)) {
            const h = manHattanDistance(rowIndex-1,colIndex,ROW_END,COL_END);
            // const g = distance +1
            const g = calcNodeDistance(node,rowIndex,colIndex,ROW_END,COL_END)
            const f = h+g
            
            // if(temp[f] === undefined)
                // temp[f] = [rowIndex-1,colIndex]
            queue.push([rowIndex-1,colIndex,distance+1,node,f])
        }

        if(isValid(rowIndex,colIndex-1,ROW_SIZE,COL_SIZE)) {
            const h = manHattanDistance(rowIndex,colIndex-1,ROW_END,COL_END);
            // const g = distance +1
            const g = calcNodeDistance(node,rowIndex,colIndex,ROW_END,COL_END)
            const f = h+g
            
            // if(temp[f] === undefined)
                // temp[f] = [rowIndex,colIndex-1]
                queue.push([rowIndex,colIndex-1,distance+1,node,f])
        }

        
        // node.heuristicDistance = manHattanDistance(rowIndex,colIndex,ROW_END,COL_END);
        // node.calculatedDistance = minDistance;
        

        

        visitedNodes.push([rowIndex,colIndex]);



        
        
        

        



        


        if(rowIndex === ROW_END && colIndex === COL_END) {
            break;
        }

        // queue.push([row-1,col,distance+1,node,node.calculatedDistance]); //up
        // queue.push([row+1,col,distance+1,node,node.calculatedDistance]); //down
        // queue.push([row,col+1,distance+1,node,node.calculatedDistance]); //right
        // queue.push([row,col-1,distance+1,node,node.calculatedDistance]); //left

    }

    



    return visitedNodes;

    
}

export const getSolutionPath = (grid,ROW_END,COL_END) => {

    let currentNode = grid[ROW_END][COL_END];
    const solutionPath = [];
    while(currentNode.previousNode !== -1) {
        solutionPath.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    
    return solutionPath;
}

const sortByDistance = (queue) => {
    queue.sort((a,b) => a[4] - b[4])
}