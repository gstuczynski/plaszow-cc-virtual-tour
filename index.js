import React from "react";
import { AppRegistry, View, Text, StyleSheet } from "react-360";

import SceneManager from "./components/SceneManager.js";
import InfoPanel from "./components/InfoPanel.js";
import CloseButton from "./components/CloseButton.js";


import config from './tour_config/config.json';

import TourStore from './stores/tourStore';
import TourActions from "./actions/tourActions";
import connectToStores from './connectToStores';


const storeConnector = {
  TourStore(Store) {
    return {
      isFetching: Store.isFetching()
    };
  }
};

class TemplateTour extends React.Component {
  componentDidMount() {
    TourActions.navigateTo(config.firstStep);
  }
  render() {
    const { isFetching } = this.props;
    if (isFetching) return <Text>Loading...</Text>;
    return <SceneManager />;
  }
}

TemplateTourWithStores = connectToStores(
  TemplateTour, [TourStore], storeConnector
);

AppRegistry.registerComponent('TemplateTour', () => TemplateTourWithStores);
export default TemplateTourWithStores