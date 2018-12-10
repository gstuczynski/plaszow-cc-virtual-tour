import React from 'react';
import { AppRegistry, asset, VrButton } from 'react-360';
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

const MapPanelButton = () => (
  <VrButton onClick={() => TourActions.displayMap()}>
    <Entity source={{ obj: asset('3dmodels/earth.obj'), mtl: asset('3dmodels/earth.mtl') }} />
  </VrButton>
);

const MapPanelButtonWithStore = connectToStores(MapPanelButton, [TourStore], storeConnector);

AppRegistry.registerComponent('MapPanelButton', () => MapPanelButtonWithStore);
export default MapPanelButtonWithStore;
