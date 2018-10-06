import React from "react";
import { StyleSheet, View, Environment, asset, VrButton, Text, Scene } from "react-360";
import cn from 'classnames';

import SceneTitle from "./SceneTitle";
import Hint from "./Hint";
import Door from "./Door";

import connectToStores from '../connectToStores';
import TourStore from "../stores/tourStore";
import TourActions from "../actions/tourActions";

const storeConnector = {
  TourStore(Store) {
    return {
      stepData: Store.getStepData(),
      isLoading: Store.isFetching(),
      displayInfoPanel: Store.displayInfoPanelStatus(),
    };
  }
};

class SceneManager extends React.Component {

  componentDidMount() {
   console.log(this.props.stepData.uri)
    this.updateScene({});
  }

  componentDidUpdate(prevProps, prevState) {
    //this.updateScene(prevState);
  }

  updateScene = prevState => {
    Environment.setBackgroundImage(asset(this.props.stepData.uri),  {format: '2D'},);
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
        onClick={()=>TourActions.chanegeInfoPanelStatus(true)}
      />
    ));
  };

  renderInfoPanels = (infoPanels = []) => {
    
    return infoPanels.map((infoPanel, idx) => {
      const top = infoPanel.location.top
      const left = infoPanel.location.left
  
      const styles = StyleSheet.create({
        panel: {
          width: 200,
          height: 120,
          backgroundColor: "black",
          justifyContent: "center",
          alignItems: "center",
          top,
          left,
        }
      });

      return (
        <VrButton key={idx} style={styles.panel} onClick={()=>TourActions.displayInfoPanel(idx)}  >
          <View >
              <Text>Read more...</Text>
          </View>
        </VrButton>
     )
    });
  };



  renderDoors = (doors = []) => {
    return doors.map((door, idx) => {
      const top = door.location.top
      const left = door.location.left
  
      const styles = StyleSheet.create({
        panel: {
          width: 200,
          height: 120,
          backgroundColor: "black",
          justifyContent: "center",
          alignItems: "center",
          top,
          left,
        }
      });
      return (
        <VrButton key={idx} style={styles.panel} onClick={this.handleDoorClick.bind(this, door.sceneId)}  >
          <View >
              <Text>{door.title}</Text>
          </View>
      </VrButton>
      );
    });
  };

  render() {

    //const top = this.props.stepData ? this.props.stepData.infoPanel.location.top : 0
    //const left = this.props.stepData ? this.props.stepData.infoPanel.location.left : 0

    const styles = StyleSheet.create({
      panel: {
        width: 200,
        height: 120,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
        //top,
        //left,
      }
    });

    const panelClassNames = cn(styles.panel, {top: 300})
    return (
      <Scene style={{ flex: 1 }}>

       <SceneTitle title={this.props.stepData.uri} />
       <View>
        {this.renderHints(this.props.stepData.hints)}
        {this.renderDoors(this.props.stepData.doors)}
        {this.props.stepData.infoPanels &&
          this.renderInfoPanels(this.props.stepData.infoPanels)
        }
      </View>
      </Scene>
    );
  }
}

const SceneManagerWithStore = connectToStores(
  SceneManager, [TourStore], storeConnector
);

export default SceneManagerWithStore;
