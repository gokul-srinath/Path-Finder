let completed = false;

export const dfs = (grid,ROW_START,ROW_END,COL_START,COL_END,ROW_SIZE,COL_SIZE,previousNode = -1) => {

    if( ROW_START < 0 || ROW_START >= ROW_SIZE || COL_START < 0 || COL_START >= COL_SIZE){
        return [];
    }
    
    if(completed) {
        return [];
    }



    
    let visitedNodes = [];

    const node = grid[ROW_START][COL_START];
    const {isVisited,isWall} = node;

    if(isWall || isVisited) {
        return [];
    }
    node.isVisited = true;

    node.previousNode = previousNode;

    if((ROW_START === ROW_END && COL_START === COL_END)) {
        completed = true;
        return [[ROW_END,COL_END]];
    }
    
    visitedNodes.push([ROW_START,COL_START]); 

    visitedNodes = [
        ...visitedNodes,
        ...dfs(grid,ROW_START+1,ROW_END,COL_START,COL_END,ROW_SIZE,COL_SIZE,node),
        ...dfs(grid,ROW_START,ROW_END,COL_START+1,COL_END,ROW_SIZE,COL_SIZE,node),
        ...dfs(grid,ROW_START-1,ROW_END,COL_START,COL_END,ROW_SIZE,COL_SIZE,node),
        ...dfs(grid,ROW_START,ROW_END,COL_START-1,COL_END,ROW_SIZE,COL_SIZE,node)
    ];
    
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
