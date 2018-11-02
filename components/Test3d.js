import React from 'react';
import { AppRegistry, StyleSheet, asset, Image, VrButton, View, Text } from 'react-360';
import Entity from 'Entity';

import connectToStores from '../connectToStores';
import TourStore from '../stores/tourStore';
import TourActions from '../actions/tourActions';

const storeConnector = {
  TourStore(Store) {
    return {
      object3dPosition: Store.getObject3dPosition(),
    };
  },
};

class Test3d extends React.Component {
  render() {
    return (
      <View>
        {console.log('3dpos', this.props.object3dPosition)}
        <Entity
          style={this.props.object3dPosition}
          source={{ obj: asset('3dmodels/tomb/tomb.obj'), mtl: asset('3dmodels/tomb/tomb.mtl') }}
        />
      </View>
    );
  }
}

const Test3dWithStore = connectToStores(Test3d, [TourStore], storeConnector);

AppRegistry.registerComponent('Test3d', () => Test3dWithStore);
export default Test3dWithStore;
