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
    stepData = this.props.stepData ? this.props.stepData : null;
    infoPanel = stepData ? stepData.infoPanels[this.props.infoPanelIdx] : null;
    infoPanelContent = infoPanel ? infoPanel.content : null;
    img = infoPanel ? infoPanel.img : null;
    style = infoPanel ? infoPanel.style : {};
    console.log(this.props.displayInfoPanel);
    return (
      <View style={this.props.displayInfoPanel ? styles.panel : styles.hidden} pointerEvents="none">
        {img && (
          <Image source={asset('bimg.jpg')} style={styles.image} onEnter={this.handleInfoEnter} />
        )}

        {/* TourActions.hideInfoPanel() */}
        <View>
          <Text style={styles.panelText}>{`${infoPanelContent}`}</Text>
          <View>
            <Text>Read more...</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: 'red',
    display: 'flex',
    flexDirection: 'row',
    // transform: [
    //   {translateY: 5000}
    // ]
  },
  panelText: {
    color: 'white',
    fontSize: 50,
    textAlign: 'justify',
    width: 500,
  },
  hidden: {
    display: 'none',
    zIndex: -10,
  },
  image: {
    width: 500,
    height: 600,
  },
  closeButton: {
    backgroundColor: 'red',
  },
});

const InfoPanelWithStore = connectToStores(InfoPanel, [TourStore], storeConnector);

AppRegistry.registerComponent('InfoPanel', () => InfoPanelWithStore);
export default InfoPanelWithStore;
