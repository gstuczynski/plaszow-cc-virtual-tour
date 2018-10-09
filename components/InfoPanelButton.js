import React from 'react';
import { Image, VrButton, asset } from 'react-360';
import _ from 'underscore';
import { func, shape, number, string } from 'prop-types';

class InfoPanelButton extends React.Component {
  static propTypes = {
    onClick: func.isRequired,
    location: shape({
      top: number,
      left: number,
    }),
    icon: string,
  };

  constructor() {
    super();
    this.state = {
      hover: false,
    };
  }

  render() {
    const iconSize = this.state.hover ? { width: 80, height: 80 } : { width: 50, height: 50 };
    const styles = _.extend({}, { position: 'absolute' }, iconSize, this.props.location);
    return (
      <VrButton onClick={this.props.onClick}>
        {this.props.icon && (
          <Image
            onEnter={() => this.setState({ hover: true })}
            onExit={() => this.setState({ hover: false })}
            style={styles}
            source={asset(`icons/${this.props.icon}`)}
          />
        )}
      </VrButton>
    );
  }
}

export default InfoPanelButton;
