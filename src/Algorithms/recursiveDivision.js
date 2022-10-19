
    // const chooseOrientation = (width, height) => {
    //     if(width > height) {
    //         return "vertical";
    //     }
        
    //     return "horizontal"
    // }

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
    // return Math.floor(Math.random() * max+1);
}
// let counter = 0;

export const recursiveDivision = (grid,surroundingWalls,rowStart,rowEnd,colStart,colEnd,orientation,walls) => {
    
    
    
    // if(counter > 10) {
    //     return;
    // }

    // counter+=1;
    
    if (rowEnd < rowStart || colEnd < colStart) {
        return;
      }
    
    if(!surroundingWalls) {

        for(let i=0;i<grid.length;i++) {
            grid[i][0].isWall = true;
            grid[i][grid[0].length-1].isWall = true;

            walls.push([i,0]);
            walls.push([i,grid[0].length-1]);
            
        }
        for(let i=1;i<grid[0].length-1;i++) {
            grid[0][i].isWall = true;
            grid[grid.length-1][i].isWall = true;

            walls.push([0,i]);
            walls.push([grid.length-1,i]);

            
        }
    }


    

    if(orientation === "horizontal") {

    let possibleRows = [];
    for(let number =rowStart;number<=rowEnd;number+=2) {
        possibleRows.push(number);
    }
    let possibleCols = [];
    for(let number =colStart-1;number<=colEnd+1;number+=2) {
        possibleCols.push(number);
    }
    let randowRowIndex = getRandomInt(0,possibleRows.length-1);
    let randowColIndex = getRandomInt(0,possibleCols.length-1);
    
    // console.log(possibleRows)
    // console.log(possibleCols)

    // console.log(randowRowIndex,randowColIndex)

    // console.log("==================")
    
    let currentRow = possibleRows[randowRowIndex];
    let currentCol = possibleCols[randowColIndex];
    // console.log(orientation)
    // console.log(currentRow)
    // console.log(colStart-1,colEnd+1);
        for(let col = colStart-1;col <= colEnd+1;col++) {
            if(col!==currentCol && !grid[currentRow][col].isStart && !grid[currentRow][col].isFinish) {
                grid[currentRow][col].isWall = true;
                walls.push([currentRow,col]);
            }
        }
        if((currentRow-2-rowStart) > (colEnd - colStart)) {
            recursiveDivision(grid,true,rowStart,currentRow-2,colStart,colEnd,"horizontal",walls);
        }else{
            recursiveDivision(grid,true,rowStart,currentRow-2,colStart,colEnd,"vertical",walls);
        }

        if((rowEnd-(currentRow+2)) > (colEnd - colStart)) {
            recursiveDivision(grid,true,currentRow+2,rowEnd,colStart,colEnd,"horizontal",walls);
        }else{
            recursiveDivision(grid,true,currentRow+2,rowEnd,colStart,colEnd,"vertical",walls);
        }

    }
    else{

    let possibleRows = [];
    for(let number =rowStart-1;number<=rowEnd+1;number+=2) {
        possibleRows.push(number);
    }
    let possibleCols = [];
    for(let number =colStart;number<=colEnd;number+=2) {
        possibleCols.push(number);
    }
    let randowRowIndex = getRandomInt(0,possibleRows.length-1);
    let randowColIndex = getRandomInt(0,possibleCols.length-1);
    
    
    
    let currentRow = possibleRows[randowRowIndex];
    let currentCol = possibleCols[randowColIndex];

    // console.log(orientation)
    // console.log(currentCol)
    // console.log(rowStart-1,rowEnd+1);

        for(let row=rowStart-1;row <= rowEnd+1 ;row++) {
            if(row!==currentRow && !grid[row][currentCol].isStart && !grid[row][currentCol].isFinish) {
                grid[row][currentCol].isWall = true;
                walls.push([row,currentCol]);
            }   
        }
        if((rowEnd-rowStart) > (currentCol-2-colStart)) {
            recursiveDivision(grid,true,rowStart,rowEnd,colStart,currentCol-2,"horizontal",walls);
        }else{
            recursiveDivision(grid,true,rowStart,rowEnd,colStart,currentCol-2,"vertical",walls);
        }

        if((rowEnd-rowStart) > (colEnd - (currentCol+2))) {
            recursiveDivision(grid,true,rowStart,rowEnd,currentCol+2,colEnd,"horizontal",walls);
        }else{
            recursiveDivision(grid,true,rowStart,rowEnd,currentCol+2,colEnd,"vertical",walls);
        }
    }

    
}