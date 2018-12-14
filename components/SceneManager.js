import React from 'react';
import { View, Environment, asset } from 'react-360';
import InfoPanelButton from './InfoPanelButton';
import Hint from './Hint';
import Door from './Door';
import scenePropTypes from './ScenePropTypes';
import connectToStores from '../connectToStores';
import TourStore from '../stores/tourStore';
import TourActions from '../actions/tourActions';

const storeConnector = {
  TourStore(Store) {
    return {
      stepData: Store.getStepData(),
      isLoading: Store.isFetching(),
      displayInfoPanel: Store.displayInfoPanelStatus(),
    };
  },
};

class SceneManager extends React.Component {
  static propTypes = scenePropTypes;

  componentDidMount() {
    this.updateScene({});
  }

  updateScene = () => {
    Environment.setBackgroundImage(asset(this.props.stepData.uri), { format: '2D' });
  };

  getCurrentScene = () => {
    return this.getSceneById(this.state.currentSceneId);
  };

  getSceneById = sceneId => {
    return this.props.scenes.find(scene => scene.id === sceneId);
  };

  handleDoorClick = sceneToGo => {
    TourActions.navigateTo(sceneToGo);
  };

  renderHints = (hints = []) => {
    return hints.map((hint, i) => (
      <Hint
        key={i}
        title={hint.title}
        description={hint.description}
        location={hint.location}
        onClick={() => TourActions.chanegeInfoPanelStatus(true)}
      />
    ));
  };

  renderPanel = (panel, idx) => {
    const top = panel.location.top;
    const left = panel.location.left;
    return (
      <InfoPanelButton
        key={idx}
        location={{ top, left }}
        onClick={() => TourActions.displayInfoPanel(idx)}
        icon={panel.icon}
      />
    );
  };

  renderInfoPanels = (infoPanels = []) => {
    return infoPanels.map((infoPanel, idx) => {
      return this.renderPanel(infoPanel, idx);
    });
  };

  renderDoors = (doors = []) => {
    return doors.map((door, i) => {
      return (
        <Door
          key={i}
          onClick={() => this.handleDoorClick(door.sceneId)}
          title={door.title}
          preview={door.preview}
          location={door.location}
        />
      );
    });
  };

  render() {
    return (
      <View style={{ flex: 1, zIndex: -1 }}>
        <View>
          {this.renderHints(this.props.stepData.hints)}
          {this.renderDoors(this.props.stepData.doors)}
          {this.props.stepData.infoPanels && this.renderInfoPanels(this.props.stepData.infoPanels)}
        </View>
      </View>
    );
  }
}

const SceneManagerWithStore = connectToStores(SceneManager, [TourStore], storeConnector);

export default SceneManagerWithStore;
