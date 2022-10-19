

export const bfs = (grid,ROW_START,ROW_END,COL_START,COL_END,ROW_SIZE,COL_SIZE) => {

    if(ROW_START < 0 || ROW_END >= ROW_SIZE || COL_START < 0 || COL_END >= COL_SIZE || (ROW_START === ROW_END && COL_START === COL_END)){
        return;
    }

    let queue = [[ROW_START,COL_START,-1]];
    const visitedNodes = [];
    
    while(queue.length > 0) {
        const [rowIndex,colIndex,previousNode] = queue.shift();

        if(rowIndex < 0 || rowIndex >= ROW_SIZE || colIndex < 0 || colIndex >= COL_SIZE){
            continue;
        }

        const node = grid[rowIndex][colIndex];
        const {row,col,isVisited,isWall} = node;

        if(isWall) {
            continue;
        }

        if(isVisited) {
            continue;
        }
        node.isVisited = true;
        node.previousNode = previousNode;
        visitedNodes.push([rowIndex,colIndex]);



        if(rowIndex === ROW_END && colIndex === COL_END) {
            break;
        }

        queue.push([row-1,col,node]); //up
        queue.push([row+1,col,node]); //down
        queue.push([row,col+1,node]); //right
        queue.push([row,col-1,node]); //left
    }

    return visitedNodes;




}

// export const getSolutionPath = (grid,ROW_END,COL_END) => {

//     let currentNode = grid[ROW_END][COL_END];
//     const solutionPath = [];
//     while(currentNode.previousNode !== -1) {
//         solutionPath.unshift(currentNode);
//         currentNode = currentNode.previousNode;
//     }
    
//     return solutionPath;
// }
