import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Environment,
  asset,
  Text,
  Image,
  Animated,
  VrButton,
} from 'react-360';

import connectToStores from '../connectToStores';
import TourStore from '../stores/tourStore';
import TourActions from '../actions/tourActions';

const storeConnector = {
  TourStore(Store) {
    return {
      stepData: Store.getStepData(),
      displayInfoPanel: Store.displayInfoPanelStatus(),
      infoPanelData: Store.getInfoPanelData(),
      infoPanelIdx: Store.getInfoPanelIdx(),
    };
  },
};

class InfoPanel extends React.Component {
  render() {
    const stepData = this.props.stepData ? this.props.stepData : null;
    const infoPanel = stepData ? stepData.infoPanels[this.props.infoPanelIdx] : null;
    const contentBeside = infoPanel ? infoPanel.contentBeside : null;
    const contentBottom = infoPanel ? infoPanel.contentBottom : null;
    const image = infoPanel ? infoPanel.image : null;
    const style = infoPanel ? infoPanel.style : {};
    return (
      <View
        style={this.props.displayInfoPanel ? style.panel : { display: 'none' }}
        pointerEvents="none">
        <View style={{ flexDirection: 'row' }}>
          {image && <Image style={style.image} source={asset(`images/${image}`)} />}
          <Text style={style.contentBeside}>{`${contentBeside}`}</Text>
        </View>
        <Text style={style.contentBottom}>{`${contentBottom}`}</Text>
      </View>
    );
  }
}

const InfoPanelWithStore = connectToStores(InfoPanel, [TourStore], storeConnector);

AppRegistry.registerComponent('InfoPanel', () => InfoPanelWithStore);
export default InfoPanelWithStore;
