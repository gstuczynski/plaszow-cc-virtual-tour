import React from 'react';
import { StyleSheet, View, Environment, asset, VrButton, Text, Scene } from 'react-360';
import _ from 'underscore';

import SceneTitle from './SceneTitle';
import InfoPanelButton from './InfoPanelButton';
import Hint from './Hint';
import Door from './Door';
import MapPanelButton from './MapPanelButton';
import MapPanel from './MapPanel';

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
  componentDidMount() {
    console.log(this.props.stepData.uri);
    this.updateScene({});
  }

  componentDidUpdate(prevProps, prevState) {
    // this.updateScene(prevState);
  }

  updateScene = prevState => {
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
      if (!infoPanel.sections) {
        return this.renderPanel(infoPanel, idx);
      } else {
        console.log('else', infoPanel);
        return this.renderPanel(infoPanel.sections[0], idx);
      }
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

  // renderDoors = (doors = []) => {
  //   return doors.map((door, idx) => {
  //     const top = door.location.top;
  //     const left = door.location.left;

  //     const styles = _.extend({}, test.test, { top, left });

  //     return (
  //       <VrButton key={idx} style={styles} onClick={this.handleDoorClick.bind(this, door.sceneId)}>
  //         <View>
  //           <Text>{door.title}</Text>
  //         </View>
  //       </VrButton>
  //     );
  //   });
  // };

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
      <View style={{ flex: 1, zIndex: -1 }}>
        {/* {<SceneTitle title={this.props.stepData.uri} />} */}
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
