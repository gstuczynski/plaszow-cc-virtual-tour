import React from 'react';
import { AppRegistry, StyleSheet, asset, Image, VrButton, View, Text } from 'react-360';

import connectToStores from '../connectToStores';
import TourStore from '../stores/tourStore';
import TourActions from '../actions/tourActions';
import { pins } from '../tour_config/map.json';
import _ from 'underscore';

const storeConnector = {
  TourStore(Store) {
    return {
      displayInfoPanel: Store.displayInfoPanelStatus(),
      stepData: Store.getStepData(),
    };
  },
};

class MapPanel extends React.Component {
  handlePinClick = sceneId => {
    console.log('sss', this.props, sceneId);
    if (this.props.stepData.sceneId !== sceneId) {
      TourActions.navigateTo(sceneId);
      TourActions.hideInfoPanel();
    }
  };

  render() {
    console.log(pins);
    return (
      <View style={styles.panel}>
        <Image style={styles.image} source={asset('images/plaszow-map.png')} />
        {pins.map((pin, idx) => {
          console.log(pin);
          console.log(styles.pin);
          const pinStyle = _.extend({}, styles.pin, pin.location);
          console.log('pinstyle', pinStyle);
          if (!this.props.stepData) {
            return null;
          }
          if (pin.sceneId === this.props.stepData.sceneId) {
            return (
              <View style={pinStyle}>
                <Text>You are here!</Text>
              </View>
            );
          } else {
            return (
              <VrButton style={pinStyle} onClick={() => this.handlePinClick(pin.sceneId)}>
                <Image style={styles.pinImage} source={asset('icons/pin.jpg')} />
              </VrButton>
            );
          }
        })}
        <VrButton style={styles.close} onClick={() => TourActions.hideInfoPanel()}>
          <Image style={styles.close} source={asset('icons/close-button.png')} />
        </VrButton>
      </View>
    );
  }
}

const styles = {
  panel: {
    width: 850,
    height: 800,
    position: 'relative',
  },
  image: {
    width: 800,
    height: 800,
  },
  pin: {
    width: 20,
    height: 20,
    position: 'absolute',
    // zIndex: 100,
    top: 10,
  },
  pinImage: {
    width: 20,
    height: 20,
  },
  close: {
    position: 'absolute',
    width: 50,
    height: 50,
    top: 0,
    right: 0,
  },
};

const MapPanelWithStore = connectToStores(MapPanel, [TourStore], storeConnector);

AppRegistry.registerComponent('MapPanel', () => MapPanelWithStore);
export default MapPanelWithStore;
