import React from 'react';
import { AppRegistry, Text } from 'react-360';
import { bool } from 'prop-types';
import SceneManager from './components/SceneManager.js';
import InfoPanel from './components/InfoPanel.js';

import config from './tour_config/config.json';

import TourStore from './stores/tourStore';
import TourActions from './actions/tourActions';
import connectToStores from './connectToStores';

const storeConnector = {
  TourStore(Store) {
    return {
      isFetching: Store.isFetching(),
    };
  },
};

class TemplateTour extends React.Component {
  static propTypes = {
    isFetching: bool,
  };
  componentDidMount() {
    TourActions.navigateTo(config.firstStep);
  }
  render() {
    const { isFetching } = this.props;
    if (isFetching) return <Text>Loading...</Text>;
    return <SceneManager />;
  }
}

const TemplateTourWithStores = connectToStores(TemplateTour, [TourStore], storeConnector);

AppRegistry.registerComponent('TemplateTour', () => TemplateTourWithStores);
AppRegistry.registerComponent('InfoPanel', () => InfoPanel);

export default TemplateTourWithStores;
