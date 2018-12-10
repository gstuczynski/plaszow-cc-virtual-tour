import React from 'react';
import { func, shape, number } from 'prop-types';
import { StyleSheet, View, Image, asset, Animated } from 'react-360';

const ANIMATION_DURATION = 500;

export default class Hint extends React.Component {
  static propTypes = {
    onClick: func,
    location: shape({
      top: number,
      left: number,
    }),
  };

  state = {
    infoCardOpacity: new Animated.Value(0),
  };

  handleInfoEnter = () => {
    Animated.timing(this.state.infoCardOpacity, {
      toValue: 1,
      duration: ANIMATION_DURATION,
    }).start();
  };

  handleInfoExit = () => {
    Animated.timing(this.state.infoCardOpacity, {
      toValue: 0,
      duration: ANIMATION_DURATION,
    }).start();
  };

  handleButtonClick = () => {
    if (this.props.onClick) {
      this.props.onClick();
    }
  };

  renderInfoIcon = () => {
    return <Image source={asset('info.png')} style={styles.image} onEnter={this.handleInfoEnter} />;
  };

  renderInfoCard = () => {
    return (
      <Animated.View style={[styles.box, { opacity: this.state.infoCardOpacity }]}>
        {/* {<Text style={styles.title}>{`${this.props.description}sss`}</Text>} */}
        <Image source={asset('bimg.jpg')} style={styles.image} onEnter={this.handleInfoEnter} />
      </Animated.View>
    );
  };

  render() {
    const locationStyle = {
      left: this.props.location.left,
      top: this.props.location.top,
      position: 'absolute',
    };

    return (
      <View style={locationStyle} onExit={this.handleInfoExit} onClick={this.handleButtonClick}>
        {this.renderInfoCard()}
        {this.renderInfoIcon()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 32,
    height: 32,
  },
  box: {
    padding: 10,
    borderRadius: 10,
    width: 300,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderColor: '#639dda',
    borderWidth: 2,
  },
  title: {
    fontSize: 20,
  },
});
