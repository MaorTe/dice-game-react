import React from 'react';

class ScoreInput extends React.Component {
	render() {
		return (
			<div className="input-wrapper">
				<span className="input-wrapper-desc">Score to collect:</span>
				<input
					type="text"
					className="score-input"
					id={this.props.name}
					name={this.props.name}
					value={this.props.value}
					onChange={this.props.onChange}
					disabled={this.props.disabled}
				/>
			</div>
		);
	}
}
ScoreInput.defaultProps = {
	scoreLimit: 100,
};
export default ScoreInput;
