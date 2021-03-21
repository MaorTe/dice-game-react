import React from 'react';

class Button extends React.Component {
	render() {
		return (
			<button className={this.props.classes} onClick={this.props.onClick}>
				<i className={this.props.icon}></i>
				{this.props.btnName}
			</button>
		);
	}
}

export default Button;
