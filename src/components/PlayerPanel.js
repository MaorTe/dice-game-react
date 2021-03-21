import React from 'react';

class PlayerPanel extends React.Component {
	render() {
		return (
			<div className={this.props.classes}>
				<div className={`player-name ${this.props.winner}`} id={this.props.id}>
					{this.props.playerName}
				</div>
				<div className="player-score" id={this.props.scoreId}>
					{this.props.score}
				</div>
				<div className="player-current-box">
					<div className="player-current-label">Current</div>
					<div className="player-current-score" id={this.props.currentId}>
						{this.props.currentScore}
					</div>
				</div>
			</div>
		);
	}
}

export default PlayerPanel;
