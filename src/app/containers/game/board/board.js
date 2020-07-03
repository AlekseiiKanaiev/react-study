import React, { useState, useEffect } from 'react';
import { Square } from './square/square';
import './board.scss'

export const Board = (props) => {
    const [gameState, setState] = useState(props.gameState);

    const renderSquare = (i) => {
        const value = gameState.find(el => el[i]) ? gameState.find(el => el[i])[i] : '';
        let isWinVal = false;
        if (props.winArr) isWinVal = props.winArr.includes(i);
        return <Square value = {value} player = {props.player} isWinVal = {isWinVal} handleClick = {() => props.handleClick(i)}/>;
    }

    useEffect(() => {
        if (gameState !== props.gameState) {
            setState(props.gameState);
        }
    }, [gameState, props.gameState]);

    return (
        <div>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    );
}