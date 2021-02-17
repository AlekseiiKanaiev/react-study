import React, { useState, useEffect, Fragment } from 'react';

import { Board } from './board/board';
import { Table } from '../table/table';
import './game.scss';

export const Game = () => {
    const winStates = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    const [player, setPlayer] = useState('X');
    const [gameState, setGameState] = useState([]);
    const [winner, setWinner] = useState({player: null, array: null});

    useEffect(() => {
        if (gameState.length >= 5 && !winner.player) {
            // console.log(this.state.winStates.filter(state => state.every(index => this.state.gameState.find(el => el[index] === 'X')))[0]);
            const arr = winStates.filter(state => state.every(index => gameState.find(el => el[index] === 'X')))[0];
            if (arr) {
                console.log('X');
                setWinner({player: 'X', array: arr})
                return;
            }
        }
        if (gameState.length >= 6 && !winner.player) {
            const arr = winStates.filter(state => state.every(index => gameState.find(el => el[index] === 'O')))[0];
            if (arr) {
                console.log('O');
                setWinner({player: 'O', array: arr});
                return;
            }
        }
        if (gameState.length >= 9 && !winner.player) {
            setWinner({player: 'Draw', array: null});
        }
    }, [gameState, winner, winStates]);

    const handleClick = (index) => {
        if (winner.player || gameState.find(el => el[index])) {
            return;
        }
        setGameState([...gameState].concat({[index]: player}));
        setPlayer(player === 'X' ? 'O' : 'X');
    }

    const reset = () => {
        setGameState([]);
        setPlayer(player === 'X' ? 'O' : 'X');
        setWinner({player: null, array: null});
    }

    const goToState = (index) => {
        if (index === gameState.length) {
            return;
        }
        setGameState([...gameState].slice(0, index));
        const player = Object.values(gameState[gameState.length - 1])[0];
        // console.log(player);
        setPlayer(player)
        setWinner({player: null, array: null});
    }

    const status = winner.player ? `Winner: ${winner.player}` : `Next player: ${player}`;
    return (
        <Fragment>
            <h1>Game</h1>
            <div className="game">
                <div className="game-board">
                    <Board player = {player} handleClick = {handleClick} gameState = {gameState} winArr = {winner.array}/>
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <div className="status">{status}</div>
                    <ol>
                        <li>
                            <button onClick = {reset}>
                                Go to game start
                            </button>
                        </li>
                        {
                            gameState.map((state, index) => {
                            return (<li key = {index}>
                                <button onClick = {() => goToState(index + 1)}>
                                    Go to move #{ index + 1 }
                                </button>
                            </li>);
                            })
                        }
                    </ol>
                </div>
            </div>
            <hr/>
        </Fragment>
    );
}
