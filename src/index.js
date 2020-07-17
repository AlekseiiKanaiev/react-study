import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { rootReducer } from './redux/rootReducer'; 
import { forbiddenWordMiddleware } from './redux/middleware';
import { sagaWatcher } from './redux/posts/saga';
import createSagaMiddleware from 'redux-saga'
import { App } from './app/app';
import './index.scss';
import { spawn } from 'redux-saga/effects';
import { menuSaga } from './redux/menu/saga';

const saga = createSagaMiddleware();

const store = createStore(rootReducer, compose(
        applyMiddleware(thunk, forbiddenWordMiddleware, saga),
        // cause error in build version -> comment for deploy
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ));

function* rootSaga() {
    yield spawn(sagaWatcher);
    yield spawn(menuSaga);
}

saga.run(rootSaga);

const app = (
    <Provider store = {store}>
        <App />
    </Provider>
);

ReactDOM.render(
    app,
    document.getElementById('root')
);



// class Square extends React.Component {
//     state = {
//         value: this.props.value
//     }

//     componentWillReceiveProps(nextProps) {
//         if (nextProps.value !== this.props.value) {
//             this.setState({value: nextProps.value});
//         }
//     }
    
//     render() {
//         const style = this.props.isWinVal ? 'square winner' : 'square';
//       return (
//         <button className = {style} onClick = {() => this.props.handleClick()}>
//           {this.state.value}
//         </button>
//       );
//     }
// }
  
// class Board extends React.Component {
//     state = {
//         gameState: this.props.gameState
//     }

//     componentWillReceiveProps(nextProps) {
//         if (nextProps.gameState !== this.props.gameState) {
//             this.setState({gameState: nextProps.gameState});
//         }
//     }

//     renderSquare(i) {
//         const value = this.state.gameState.find(el => el[i]) ? this.state.gameState.find(el => el[i])[i] : '';
//         let isWinVal = false;
//         if (this.props.winArr) isWinVal = this.props.winArr.includes(i);
//         return <Square value = {value} player = {this.props.player} isWinVal = {isWinVal} handleClick = {() => this.props.handleClick(i)}/>;
//     }

//     render() {
//         return (
//             <div>
//                 <div className="board-row">
//                     {this.renderSquare(0)}
//                     {this.renderSquare(1)}
//                     {this.renderSquare(2)}
//                 </div>
//                 <div className="board-row">
//                     {this.renderSquare(3)}
//                     {this.renderSquare(4)}
//                     {this.renderSquare(5)}
//                 </div>
//                 <div className="board-row">
//                     {this.renderSquare(6)}
//                     {this.renderSquare(7)}
//                     {this.renderSquare(8)}
//                 </div>
//             </div>
//         );
//     }
// }
  
// class Game extends React.Component {
//     state = {
//         player: 'X',
//         gameState: [],
//         winStates: [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]],
//         winner: {player: null, array: null}
//     }

//     componentDidUpdate() {
//         console.log(this.state);
//         if (this.state.gameState.length >= 5 && !this.state.winner.player) {
//             console.log(this.state.winStates.filter(state => state.every(index => this.state.gameState.find(el => el[index] === 'X')))[0]);
//             const arr = this.state.winStates.filter(state => state.every(index => this.state.gameState.find(el => el[index] === 'X')))[0];
//             if (arr) {
//                 console.log('X');
//                 this.setState({winner: {player: 'X', array: arr}});
//             }
//         } 
//         if (this.state.gameState.length >= 6 && !this.state.winner.player) {
//             const arr = this.state.winStates.filter(state => state.every(index => this.state.gameState.find(el => el[index] === 'O')))[0];
//             if (arr) {
//                 console.log('O');
//                 this.setState({winner: {player: 'O', array: arr}});
//             }
//         }
//         if (this.state.gameState.length >= 9 && !this.state.winner.player) {
//             this.setState({winner: {player: 'Draw', array: null}});
//         }
//     }

//     handleClick = (index) => {
//         if (this.state.winner.player || this.state.gameState.find(el => el[index])) {
//             return;
//         }
//         this.setState(state => ({
//             gameState: [...state.gameState].concat({[index]: state.player}),
//             player: state.player === 'X' ? 'O' : 'X'
//         }));
//     }

//     reset = () => {
//         this.setState({player: 'X', gameState: [], winner: {player: null, array: null}});
//     }

//     goToState = (index) => {
//         if (index === this.state.gameState.length) {
//             return;
//         }
//         this.setState(state => ({gameState: [...state.gameState].slice(0, index)}));
//         const player = Object.values(this.state.gameState[this.state.gameState.length - 1])[0];
//         console.log(player);
//         this.setState({player: player, winner: {player: null, array: null}});
//     }

//     render() {
//         const status = this.state.winner.player ? `Winner: ${this.state.winner.player}` : `Next player: ${this.state.player}`;
//         return (
//         <div className="game">
//             <div className="game-board">
//                 <Board player = {this.state.player} handleClick = {this.handleClick} gameState = {this.state.gameState} winArr = {this.state.winner.array}/>
//             </div>
//             <div className="game-info">
//                 <div>{/* status */}</div>
//                 <div className="status">{status}</div>
//                 <ol>
//                     <li>
//                         <button onClick = {this.reset}>
//                             Go to game start
//                         </button>
//                     </li>
//                     { 
//                         this.state.gameState.map((state, index) => {
//                         return (<li key = {index}>
//                             <button onClick = {() => this.goToState(index + 1)}>
//                                 Go to move #{ index + 1 }
//                             </button>
//                         </li>);
//                         })
//                     }
//                 </ol> 
//             </div>
//         </div>
//         );
//     }
// }
  
// ========================================



  
