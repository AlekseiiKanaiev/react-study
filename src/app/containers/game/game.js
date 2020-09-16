import React, { useState, useEffect, Fragment } from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Board } from './board/board';
import { Table } from './table';
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
    const mochWeeks = 12;
    const [curWeek, setCurWeek] = useState(0);
    const mochRows = [{}, {}, {}, {}];
    const mochData = [
        {
            day: 5,
            name: 'ex1'
        },
        {
            day: 5,
            name: 'ex2'
        },
        {
            day: 31,
            name: 'ex3'
        }
    ];
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
            <div className='table-component'>
                <div className='header'>
                    <button  className='decreaseWeeks' onClick = {() => setCurWeek(curWeek - 1)} disabled = {curWeek === 0}>
                        <ArrowBackIosIcon />
                    </button>

                    <span>Weeks {curWeek*4 + 1} - {curWeek*4 + 4}</span>
                    <button  className='increaseWeeks' onClick = {() => setCurWeek(curWeek + 1)} disabled = {curWeek >= mochWeeks / 4 - 1}>
                        <ArrowForwardIosIcon />
                    </button>
                </div>

                <div className = 'table'>
                    <div className = 'weekRows'>
                        {mochRows.map((el, index) => <span key = {index} className='weekRow'>{`W${(index + curWeek*4) + 1}`}</span>)}
                    </div>
                    <Table rows = {mochRows} curWeek = {curWeek} data = {mochData}/>
                </div>

            </div>
        </Fragment>
    );
}
