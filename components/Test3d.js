import React from 'react';
import { AppRegistry, StyleSheet, asset, Image, VrButton, View, Text } from 'react-360';
import Entity from 'Entity';


import connectToStores from '../connectToStores';
import TourStore from '../stores/tourStore';
import TourActions from '../actions/tourActions';

const storeConnector = {
  TourStore(Store) {
    return {
      displayInfoPanel: Store.displayInfoPanelStatus(),
    };
  },
};

class Test3d extends React.Component {
  render() {
    return (
        <View>
        {/*<Entity source={{obj: asset('3dmodels/Z3_OBJ.obj')}} />*/}
        <Text>ssdsd</Text>
        </View>
    );
  }
  }

const Test3dWithStore = connectToStores(Test3d, [TourStore], storeConnector);

AppRegistry.registerComponent('Test3d', () => Test3dWithStore);
export default Test3dWithStore;
