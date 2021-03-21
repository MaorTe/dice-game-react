import React from 'react';
import './App.css';
import PlayerPanel from './components/PlayerPanel';
import Button from './components/Button';
import DiceImage from './components/DiceImage';
import dice1 from './img/dice-1.png';
import dice2 from './img/dice-2.png';
import dice3 from './img/dice-3.png';
import dice4 from './img/dice-4.png';
import dice5 from './img/dice-5.png';
import dice6 from './img/dice-6.png';
import ScoreInput from './components/ScoreInput';
class App extends React.Component {
	state = {
		isP1Winner: '',
		isP2Winner: '',
		disabledPanel: '',
		activePanel: 'active',
		turnSwapped: true,
		GameStarted: false,
		scoreP1: 0,
		scoreP2: 0,
		currentScoreP1: 0,
		currentScoreP2: 0,
		randNum1: 1,
		randNum2: 1,
		images: [dice1, dice2, dice3, dice4, dice5, dice6],
		scoreLimit: 100,
	};
	isWinnerP1 = () => {
		if (this.state.activePanel === 'active') return 'Winner!';
	};
	isWinnerP2 = () => {
		if (this.state.disabledPanel === 'active') return 'Winner!';
	};
	componentDidMount() {
		//save initial state for a new game
		this.initialState = this.state;
	}

	renderNewGame = () => {
		return (
			<div className="wrapper clearfix">
				<PlayerPanel
					classes={`player-1-panel ${this.state.activePanel} ${
						this.isPlayerWon() && !this.isWinnerP2() ? 'winner' : ''
					}`}
					nameId="name-1"
					scoreId="score-1"
					currentId="current-1"
					playerName={
						this.isPlayerWon() && !this.isWinnerP2()
							? this.isWinnerP1()
							: 'Player 1'
					}
					winner={
						this.isPlayerWon() && !this.isWinnerP2()
							? 'player-name-winner winner'
							: ''
					}
					score={this.state.scoreP1}
					currentScore={this.state.currentScoreP1}></PlayerPanel>
				<PlayerPanel
					classes={`player-2-panel ${this.state.disabledPanel} ${
						this.isPlayerWon() && !this.isWinnerP1() ? 'winner' : ''
					}`}
					nameId="name-2"
					scoreId="score-2"
					currentId="current-2"
					playerName={
						this.isPlayerWon() && !this.isWinnerP1()
							? this.isWinnerP2()
							: 'Player 2'
					}
					winner={
						this.isPlayerWon() && !this.isWinnerP1()
							? 'player-name-winner winner'
							: ''
					}
					score={this.state.scoreP2}
					currentScore={this.state.currentScoreP2}></PlayerPanel>

				<Button
					classes="btn-new"
					icon="ion-ios-plus-outline"
					btnName="New game"
					onClick={() => {
						this.setState(this.initialState);
					}}></Button>
				{!this.isPlayerWon() && (
					<Button
						classes="btn-roll"
						icon="ion-ios-loop"
						btnName="Roll dice"
						onClick={this.randomNumber}></Button>
				)}
				{!this.isPlayerWon() && (
					<Button
						classes="btn-hold"
						icon="ion-ios-download-outline"
						btnName="Hold"
						name="scoreLimit"
						onClick={this.setScoreAndSwapTurn}></Button>
				)}
				{this.swapTurnOrGameStarted() && (
					<DiceImage
						classes="dice"
						diceNum={this.state.images[this.state.randNum1 - 1]}></DiceImage>
				)}
				{this.swapTurnOrGameStarted() && (
					<DiceImage
						classes="dice dice-2"
						diceNum={this.state.images[this.state.randNum2 - 1]}></DiceImage>
				)}
				<ScoreInput
					name="scoreLimit"
					value={this.state.scoreLimit}
					onChange={this.handleChange}
					disabled={this.state.GameStarted}></ScoreInput>
			</div>
		);
	};
	swapTurnOrGameStarted = () => {
		return this.state.turnSwapped && this.state.GameStarted;
	};
	activePlayerPanel = () => {
		if (this.state.activePanel === '' && this.state.disabledPanel === 'active')
			this.setState({ activePanel: 'active', disabledPanel: '' });
		else this.setState({ activePanel: '', disabledPanel: 'active' });
	};

	setScoreAndSwapTurn = () => {
		this.state.activePanel === 'active'
			? this.setState({
					scoreP1: this.state.currentScoreP1 + this.state.scoreP1,
					currentScoreP1: 0,
					turnSwapped: false,
			  })
			: this.setState({
					scoreP2: this.state.currentScoreP2 + this.state.scoreP2,
					currentScoreP2: 0,
					turnSwapped: false,
			  });
		this.activePlayerPanel();
	};
	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	isPlayerWon = () => {
		if (
			this.state.scoreP1 + this.state.currentScoreP1 >= this.state.scoreLimit ||
			this.state.scoreP2 + this.state.currentScoreP2 >= this.state.scoreLimit
		)
			return true;
	};
	randomNumber = () => {
		//random number between 1 and 6
		const randNum1 = Math.floor(Math.random() * (6 - 1 + 1) + 1);
		const randNum2 = Math.floor(Math.random() * (6 - 1 + 1) + 1);
		this.setState({
			randNum1,
			randNum2,
			GameStarted: true,
			turnSwapped: true,
		});
		this.state.activePanel === 'active'
			? this.setState({
					currentScoreP1: this.state.currentScoreP1 + randNum1 + randNum2,
			  })
			: this.setState({
					currentScoreP2: this.state.currentScoreP2 + randNum1 + randNum2,
			  });
		this.isDoubleSix(randNum1, randNum2);
	};
	isDoubleSix(randNum1, randNum2) {
		if (randNum1 === 6 && randNum2 === 6) {
			this.setScoreAndSwapTurn();
			this.state.activePanel === 'active'
				? this.setState({
						scoreP1: 0,
				  })
				: this.setState({
						scoreP2: 0,
				  });
		}
	}
	render() {
		return this.renderNewGame();
	}
}
export default App;
