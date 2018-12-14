import React from 'react';
import { AppRegistry, asset, Image, VrButton, View } from 'react-360';
import { shape, string } from 'prop-types';
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
  static propTypes = {
    stepData: shape({
      sceneId: string,
    }).isRequired,
  };

  handlePinClick = sceneId => {
    if (this.props.stepData.sceneId !== sceneId) {
      TourActions.navigateTo(sceneId);
      TourActions.hideInfoPanel();
    }
  };

  render() {
    return (
      <View style={styles.panel}>
        <Image style={styles.image} source={asset('images/plaszow-map.png')} />
        {pins.map((pin, idx) => {
          const pinStyle = _.extend({}, styles.pin, pin.location);
          if (!this.props.stepData) {
            return null;
          }
          if (pin.sceneId === this.props.stepData.sceneId) {
            return (
              <VrButton
                style={pinStyle}
                disabled={true}
                onClick={() => this.handlePinClick(pin.sceneId)}>
                <Image style={styles.pinImage} source={asset('icons/pin-youarehere.svg')} />
              </VrButton>
            );
          } else {
            return (
              <VrButton style={pinStyle} onClick={() => this.handlePinClick(pin.sceneId)}>
                <Image style={styles.pinImage} source={asset('icons/pin.svg')} />
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
    width: 40,
    height: 40,
    position: 'absolute',
    top: 10,
  },
  pinImage: {
    width: 80,
    height: 80,
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
