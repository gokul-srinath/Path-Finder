import React, { useEffect, useRef, useState } from "react";
import Node from "./Node";
import "./PathFinder.css";
import { djikstra, getSolutionPath } from "../Algorithms/djkistra";
import { recursiveDivision } from "../Algorithms/recursiveDivision";
import { bfs } from "../Algorithms/bfs";
import { dfs } from "../Algorithms/dfs";
import { aStar } from "../Algorithms/A-star";

const PathFinder = () => {

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

  const getRowSize = () => {
    const {height} = getWindowDimensions();
    
    return Math.round(height/31.67);
  }

  const getColSize = () => {
    const {width} = getWindowDimensions();
    
    return Math.round(width/25.2);
  }
  const [algorithm,setAlgorithm] = useState("djikstra");

  const [grid, setGrid] = useState([]);
  // const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  
  

  // const [ROW_SIZE,setRowSize] = useState(getRowSize());
  // const [COL_SIZE,setColSize] = useState(getColSize());

  const ROW_SIZE = useRef(0);
  const COL_SIZE = useRef(0);
  const ROW_START = useRef(0);
  const COL_START = useRef(0);
  const ROW_END = useRef(0);
  const COL_END = useRef(0);

  const mouse = useRef(false);
  const startMoved = useRef(null);

  useEffect(() => {
     ROW_SIZE.current = getRowSize();
     COL_SIZE.current = getColSize()-5;
    //  ROW_SIZE = 30
    //  COL_SIZE = 50
     ROW_START.current = getRandomInt(1,ROW_SIZE.current-1);
     COL_START.current = getRandomInt(1,COL_SIZE.current-1);
     ROW_END.current = getRandomInt(1,ROW_SIZE.current-1);
     COL_END.current = getRandomInt(1,COL_SIZE.current-1);
 // eslint-disable-next-line
  }, []);


  const functionMap = {
    "djikstra":djikstra,
    "aStar":aStar,
    "bfs":bfs,
    "dfs":dfs
  }
const handleEventChange = (event) => {
    setAlgorithm(event.target.value)
}
  const generateNewGrid = () => {
    let outer = [];
    for (let row = 0; row < ROW_SIZE.current; row++) {
        let inner = [];
      for (let col = 0; col < COL_SIZE.current; col++) {
        inner.push(createNode(row,col));
      }
      outer.push(inner)
    }
    return outer;
  }

  const clearPath = () => {
    const outer = generateNewGrid();
    setGrid(outer);
  }

  

  

  useEffect(() => {
    const outer = generateNewGrid();
    setGrid(outer);
     // eslint-disable-next-line
  }, []);

  const createNode = (row,col) => {
    return {
        row: row,
        col: col,
        isStart : row === ROW_START.current && col === COL_START.current,
        isFinish : row === ROW_END.current && col === COL_END.current,
        distance: Infinity,
        isVisited : false,
        isWall : false,
        previousNode : null,
        // heuristicDistance : Infinity,
        // calculatedDistance : Infinity
    };
  }

  const animateWalls = (walls) => {
    for(let i=0;i<walls.length;i++) {
      setTimeout(()=>{
        const [row,col] = walls[i];
        const node = grid[row][col];
        document.getElementById(`node-${node.row}-${node.col}`).className = 'node wall-node';    
      },10*i)
    }
    
  }

  const animateDjikstra = (visitedNodes,solutionPath) => {
    
    for(let i=1;i<visitedNodes.length;i++) {
        if(i === visitedNodes.length-1 ) {
          setTimeout(()=>{
            for(let j=0;j<solutionPath.length;j++) {
                  setTimeout(()=>{
                    const node = solutionPath[j];
                    if(j === solutionPath.length -1) {
                      document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-solution finish-node';    
                    }else{
                      document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-solution';    
                    }
                  },50*j)
              }
          }, (10*i)+100);
            
        }else{
            setTimeout(()=>{
                const [row,col] = visitedNodes[i];
                const node = grid[row][col];
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';    
            }, 10 * i);
        }
    }
  }



  const buildMaze = () => {
  
    // const outer = generateNewGrid();
    // setGrid(outer);
    // renderNodes();
    
    const walls = [];
    recursiveDivision(grid,false,2,ROW_SIZE.current-3,2,COL_SIZE.current-3,"horizontal",walls);
    animateWalls(walls)
    
  }


  const findPath = () => {
    
    // const walls = [];

    // recursiveDivision(grid,false,2,ROW_SIZE.current-3,2,COL_SIZE.current-3,"horizontal",walls);
    // animateWalls(walls)
    // const wallTime = (walls.length * 10)
    const wallTime = 0

    const visitedNodes = functionMap[algorithm](grid,ROW_START.current,ROW_END.current,COL_START.current,COL_END.current,ROW_SIZE.current,COL_SIZE.current);
    // const visitedNodes = djikstra(grid,ROW_START.current,ROW_END.current,COL_START.current,COL_END.current,ROW_SIZE.current,COL_SIZE.current);
    // const visitedNodes = bfs(grid,ROW_START.current,ROW_END.current,COL_START.current,COL_END.current,ROW_SIZE.current,COL_SIZE.current);
    // const visitedNodes = dfs(grid,ROW_START.current,ROW_END.current,COL_START.current,COL_END.current,ROW_SIZE.current,COL_SIZE.current);
    // const visitedNodes = aStar(grid,ROW_START.current,ROW_END.current,COL_START.current,COL_END.current,ROW_SIZE.current,COL_SIZE.current)
    
    try {
      const solutionPath = getSolutionPath(grid,ROW_END.current,COL_END.current);  
      
      setTimeout(()=>{
        animateDjikstra(visitedNodes,solutionPath)
      },wallTime)
    } catch (error) {
      
      const solutionPath = []  
      setTimeout(()=>{
        animateDjikstra(visitedNodes,solutionPath)
    },wallTime)
    }
  }

  const onMouseDrag = (isStart,isFinish,row,col)=>{
    if(!isStart && !isFinish && !mouse.current) {
      const newGrid = getNewGrid(row,col);
      setGrid(newGrid);
    }
  }
  


  const getNewGrid = (row,col) => {
    const newGrid = grid.slice();
  
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall : !node.isWall
    }

    newGrid[row][col] = newNode;

    return newGrid;
  }

  const changeLocation = (isStart,isFinish,row,col) => {
    const newGrid = grid.slice();
    // const currentNode = grid[row][col];
    const currentHHtmlNode = document.getElementById(`node-${row}-${col}`);
    setTimeout(()=>{
      if(isStart) {
        currentHHtmlNode.className = "node";
        grid[row][col].isStart = false
        startMoved.current = "start";
        
      }else if(isFinish) {
        currentHHtmlNode.className = "node";
        grid[row][col].isStart = false
        startMoved.current = "end";
      }else{
        grid[row][col].isWall = !grid[row][col].isWall
        let dynClass = grid[row][col].isWall ? 'wall-node' : '';
        currentHHtmlNode.className = `node ${dynClass}`;
        // return
      }
      setGrid(newGrid)
      mouse.current = true;
    },100)
  }

  const onMouseEnter = (isStart,isFinish,row,col) => {

    
    if(mouse.current && !isStart && !isFinish && !startMoved.current) {
      setTimeout(()=>{
        const newGrid = grid.slice();
        const currentNode = newGrid[row][col];
        const currentHHtmlNode = document.getElementById(`node-${row}-${col}`);
        currentNode.isWall = !currentNode.isWall
        let dynClass = currentNode.isWall ? 'wall-node' : '';
        currentHHtmlNode.className = `node ${dynClass}`;
        setGrid(newGrid)
      },120)
    }
    
  }

  

  const endLocation = (row,col) => {
    const newGrid = grid.slice();
    const currentHHtmlNode = document.getElementById(`node-${row}-${col}`);

    if(mouse.current) {
      setTimeout(()=>{
      if(startMoved.current === "start") {
        currentHHtmlNode.className = "node start-node";
        newGrid[row][col].isStart = true
        ROW_START.current = row;
        COL_START.current = col;
      }else if(startMoved.current === "end"){
        currentHHtmlNode.className = "node finish-node";
        newGrid[row][col].isFinish = true
        ROW_END.current = row;
        COL_END.current = col;
      }
      startMoved.current = null;
      mouse.current = false;
      setGrid(newGrid)
    },100)
    }
  }

  const renderNodes = () => {
    return grid.map((row,rowIndex)=> {
      return row.map((node,nodeIndex)=>{
          const {row,col,isFinish,isStart,isWall} = node;
          return <Node key={`${rowIndex}-${nodeIndex}`} row={row} col={col} changeLocation={changeLocation} endLocation={endLocation} isWall={isWall} isFinish={isFinish} isStart={isStart} onMouseDrag={onMouseDrag} onMouseEnter={onMouseEnter} />
      })
    })
  }

  return (
    <div className="pathfinder">    
    <div className="header">
      <div className="other">
      <div className="topic">Path Finder</div>
      
      <div className="select">
        <select value={algorithm} onChange={handleEventChange}>
            <option value={"djikstra"}>Djikstra</option>
            <option value={"aStar"}>A* Search</option>
            <option value={"bfs"}>BFS</option>
            <option value={"dfs"}>DFS</option>
          </select>
      </div>
      </div>
      <div className="button">
        <button onClick={clearPath}>clear Path</button>  
        <button onClick={findPath}>Find Path</button>
        <button onClick={buildMaze}>Build Walls</button>
      </div>
    </div>
    
    <div className="grid" style={{gridTemplateColumns: `repeat(${COL_SIZE.current},0fr)`}}>
      {renderNodes()}
    </div>
    </div>
  );

};

export default PathFinder;
