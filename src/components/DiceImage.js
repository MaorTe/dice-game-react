import React from 'react';

class DiceImage extends React.Component {
	render() {
		return (
			<img src={this.props.diceNum} alt="Dice" className={this.props.classes} />
		);
	}
}
export default DiceImage;
