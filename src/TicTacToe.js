import React, { useState, useEffect } from 'react';
import './Style.css';

const initialBoard = Array(9).fill(null);

const TicTacToe = () => {
    const [board, setBoard] = useState(initialBoard);
    const [player, setPlayer] = useState('X');
    const [winner, setWinner] = useState(null);

    useEffect(() => {
        function makeComputerMove (){
            let bestMove = -1;

            // Check for a winning move for 'O'
            for (let i = 0; i < board.length; i++) {
                if (board[i] === null) {
                    const newBoard = [...board];
                    newBoard[i] = 'O';
                    if (checkWinner(newBoard) === 'O') {
                        bestMove = i;
                        break;
                    }
                }
            }

            // If no winning move, check for a blocking move for 'X'
            if (bestMove === -1) {
                for (let i = 0; i < board.length; i++) {
                    if (board[i] === null) {
                        const newBoard = [...board];
                        newBoard[i] = 'X';
                        if (checkWinner(newBoard) === 'X') {
                            bestMove = i;
                            break;
                        }
                    }
                }
            }

            // If no blocking move, select a random available move
            if (bestMove === -1) {
                const availableMoves = board.reduce((acc, curr, index) => {
                    if (!curr) {
                        acc.push(index);
                    }
                    return acc;
                }, []);

                bestMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
            }

            setTimeout(() => {
                handleClick(bestMove);
            }, 800);
        }

        if (!winner && player === 'O') {
            makeComputerMove();
        }
    }, );

    const checkWinner = (currentBoard) => {
        const winningLines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let i = 0; i < winningLines.length; i++) {
            const [a, b, c] = winningLines[i];
            if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
                return currentBoard[a];
            }
        }

        const checkDraw = (currentBoard) => {
            return currentBoard.filter((square) => square !== null).length === currentBoard.length;
        };

        if (checkDraw(currentBoard)) {
            return 'Draw';
        }

        return null;
    };

    const handleClick = (index) => {
        if (board[index] || winner) {
            return;
        }

        const newBoard = [...board];
        newBoard[index] = player;
        setBoard(newBoard);

        const gameResult = checkWinner(newBoard);
        if (gameResult) {
            setWinner(gameResult);
        } else {
            setPlayer(player === 'X' ? 'O' : 'X');
        }
    };



    const resetGame = () => {
        setBoard(initialBoard);
        setPlayer('X');
        setWinner(null);
    };

    const renderSquare = (index) => {
        return (
            <button className="square" onClick={() => handleClick(index)}>
                {board[index]}
            </button>
        );
    };

    return (
        <div className="App">
            <h1>Tic Tac Toe play vs Computer!!!</h1>
            {!winner && <h2>Can you beat AI? </h2>}
            <div className="board">
                {board.map((square, index) => (
                    <div key={index} className="square-container">
                        {renderSquare(index)}
                    </div>
                ))}
            </div>
            {winner && (
                <div className="winner">
                    {winner === 'Draw' ? (
                        <p>It's a draw!</p>
                    ) : (
                        <p>{`Player ${winner} wins!`}</p>
                    )}
                    <button onClick={resetGame}>Play Again</button>
                </div>
            )}
        </div>
    );
};

export default TicTacToe;
