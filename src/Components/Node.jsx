import React from 'react'
import './node.css';

const Node = ({row,col,isStart,isFinish,isWall,onMouseDrag,onMouseEnter,changeLocation,endLocation}) => {

    let dynClass = isStart ? 'start-node' : isFinish ? 'finish-node' : isWall ? 'wall-node' : '';


  return (
    // onDragEnterCapture={() => onMouseDrag(isStart,isFinish,row,col)} onClick={() => onMouseDrag(isStart,isFinish,row,col)}
    <div className={`node ${dynClass}`} id={`node-${row}-${col}`} onMouseUp={()=> endLocation(row,col)} onMouseDown={() => changeLocation(isStart,isFinish,row,col)} onMouseEnter={() => onMouseEnter(isStart,isFinish,row,col)} >
      
    </div>
  )
}

export default Node