import React from 'react';
import { StyleSheet, View, Environment, asset, VrButton, Text, Scene } from 'react-360';
import _ from 'underscore';

import SceneTitle from './SceneTitle';
import InfoPanelButton from './InfoPanelButton';
import Hint from './Hint';
import Door from './Door';

import connectToStores from '../connectToStores';
import TourStore from '../stores/tourStore';
import TourActions from '../actions/tourActions';
import test from './test.module.styl';

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
  componentDidMount() {
    console.log(this.props.stepData.uri);
    this.updateScene({});
  }

  componentDidUpdate(prevProps, prevState) {
    // this.updateScene(prevState);
  }

  updateScene = prevState => {
    Environment.setBackgroundImage(asset(this.props.stepData.uri), { format: '3DTB' });
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

  renderInfoPanels = (infoPanels = []) => {
    return infoPanels.map((infoPanel, idx) => {
      const top = infoPanel.location.top;
      const left = infoPanel.location.left;

      return (
        <InfoPanelButton
          key={idx}
          location={{ top, left }}
          onClick={() => TourActions.displayInfoPanel(idx)}
          icon={infoPanel.icon}
        />
      );
    });
  };

  renderDoors = (doors = []) => {
    return doors.map((door, idx) => {
      const top = door.location.top;
      const left = door.location.left;

      const styles = _.extend({}, test.test, { top, left });

      return (
        <VrButton key={idx} style={styles} onClick={this.handleDoorClick.bind(this, door.sceneId)}>
          <View>
            <Text>{door.title}</Text>
          </View>
        </VrButton>
      );
    });
  };

  render() {
    // const top = this.props.stepData ? this.props.stepData.infoPanel.location.top : 0
    // const left = this.props.stepData ? this.props.stepData.infoPanel.location.left : 0

    const styles = StyleSheet.create({
      panel: {
        width: 200,
        height: 120,
        backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center',
        // top,
        // left,
      },
    });

    return (
      <Scene style={{ flex: 1 }}>
        {/* {<SceneTitle title={this.props.stepData.uri} />} */}
        <View>
          {/*this.renderHints(this.props.stepData.hints)*/}
          {/*this.renderDoors(this.props.stepData.doors)*/}
          {this.props.stepData.infoPanels && this.renderInfoPanels(this.props.stepData.infoPanels)}
        </View>
      </Scene>
    );
  }
}

const SceneManagerWithStore = connectToStores(SceneManager, [TourStore], storeConnector);

export default SceneManagerWithStore;
