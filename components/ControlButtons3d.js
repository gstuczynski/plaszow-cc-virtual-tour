import React from 'react';
import { AppRegistry, StyleSheet, Text, VrButton, View } from 'react-360';

import connectToStores from '../connectToStores';
import TourStore from '../stores/tourStore';
import Button from './Buttons';
import { spinAnimation, zoom, move } from '../utils/transformations';
import TourActions from '../actions/tourActions';

const storeConnector = {
  TourStore(Store) {
    return {
      object3dPosition: Store.getObject3dPosition(),
    };
  },
};

class ControlButtons3d extends React.Component {
  changePosition = direction => {
    let { object3dPosition } = this.props;
    TourActions.set3dObjectPosition(object3dPosition, direction);
  };

  styles = StyleSheet.create({
    emptySpace: {
      margin: 5,
      height: 50,
      width: 50,
    },
    text: {
      height: 20,
      fontSize: 10,
      textAlign: 'center',
    },
  });
  render() {
    return (
      <View
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          borderColor: '#303050',
          borderWidth: 2,
          padding: 10,
          flexDirection: 'row',
          top: 0,
          left: 1200,
          alignItems: 'stretch',
        }}>
        <Button text="LEFT" callback={() => this.changePosition('left')} />
        <View>
          <Button text="Zoom Out" callback={() => this.changePosition('zoomin')} />
          <Button text="Zoom In" />
        </View>
        <Button text="RIGHT" callback={() => this.changePosition('right')} />
      </View>
    );
  }
}

const ControlButtons3dWithStore = connectToStores(ControlButtons3d, [TourStore], storeConnector);

AppRegistry.registerComponent('ControlButtons3d', () => ControlButtons3dWithStore);
export default ControlButtons3dWithStore;
