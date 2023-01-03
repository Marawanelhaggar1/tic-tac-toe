import React , {useState} from 'react';
import ReactDOM from'react-dom';
import './index.css';

const Square= function(props){
  
  return(
    <button className='square'
    onClick={props.onClickEvent}>
    {props.value}
    </button>
    ) 
  }
  
  const Board =function(){
    let initialSquares=[
      null, null, null,
      null, null, null,
      null, null, null
    ]
    const [squares, setSquares] = useState(initialSquares);
    const [isXplayerNext, setXplayerNext] = useState(true);
    
    const squareHandeller=function(i){
      const s =[...squares]
      const calculateWinner=Boolean(getWinner(s));
      const filledSquare= Boolean(s[i])

      if(calculateWinner || filledSquare){
        return;
      }
      
      s[i]=`${isXplayerNext ? 'X' : 'O'}`;
      setSquares(s)
      setXplayerNext(!isXplayerNext);


    } 

  const renderSquare = (i) => {
    return(
      <Square
      value={squares[i]}
      onClickEvent={()=>squareHandeller(i)}
      />
      )
  }


  const winner=getWinner(squares);
  const Player= winner ? `the Winner Is ${winner}` : 
  `the Next player is ${isXplayerNext ? 'X' : 'O'}`
  return(
    <div className='board'>
    <p>{Player}</p>
    <div className='board-row'>
    {renderSquare(0)} {renderSquare(1)} {renderSquare(2)}
    </div>
    <div className='board-row'>
    {renderSquare(3)} {renderSquare(4)} {renderSquare(5)}
    </div>
    <div className='board-row'>
    {renderSquare(6)} {renderSquare(7)} {renderSquare(8)}
    </div>
    
    </div>
    )
  }
  
const Game = function(){
  return(
    <div className='game'>
    Tic Tac Toe Game
    <Board/>
    </div>
  )
}

ReactDOM.render(
  <Game />,
  document.getElementById('root'));
  
function getWinner(square)  {
    const lines = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];
  
    for(let line of lines){
      const [a,b,c] = line ;
      if(square[a]&& square[a] === square[b] && square[a] === square[c]){
        return square[a];
      }
    }
    return null;
  }