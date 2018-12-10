import React from 'react';
import { string, func, shape, object } from 'prop-types';
import { Image, VrButton, View } from 'react-360';
import _ from 'underscore';

class Arrow extends React.Component {
  static propTypes = {
    style: shape(object).isRequired,
    onClick: func.isRequired,
    source: string.isRequired,
  };

  constructor() {
    super();
    this.state = {
      hover: false,
    };
  }

  onEnter = () => {
    this.setState({
      hover: true,
    });
  };

  onExit = () => {
    this.setState({
      hover: false,
    });
  };

  render() {
    const arrowStyle = _.extend(
      {},
      this.props.style,
      this.state.hover ? { backgroundColor: 'white' } : { backgroundColor: 'grey' }
    );
    return (
      <View onEnter={this.onEnter} onExit={this.onExit} style={arrowStyle}>
        <VrButton onClick={this.props.onClick} style={arrowStyle}>
          <Image style={arrowStyle} source={this.props.source} />
        </VrButton>
      </View>
    );
  }
}

export default Arrow;
