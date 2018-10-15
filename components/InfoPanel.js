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
  Video,
  VideoControl,
  MediaPlayerState,
} from 'react-360';
import _ from 'underscore';

import Arrow from './Arrow';
import connectToStores from '../connectToStores';
import TourStore from '../stores/tourStore';
import TourActions from '../actions/tourActions';
import renderFromJson from '../utils/renderFromJson'

const storeConnector = {
  TourStore(Store) {
    return {
      stepData: Store.getStepData(),
      infoPanelData: Store.getInfoPanelData(),
      infoPanelIdx: Store.getInfoPanelIdx(),
    };
  },
};

class InfoPanel extends React.Component {
  constructor() {
    super();
    this.state = {
      section: 0,
    };
  }

  renderArrow = (numberOfSections, arr) => {
    return (
      <Arrow
        style={arr.style}
        onClick={() => this.changeSection(arr.direction, numberOfSections - 1)}
        source={asset(`icons/${arr.img}`)}
      />
    );
  };

  arrows = [
    {
      style: styles.arrowLeft,
      direction: 'left',
      img: 'arrow-left.svg',
    },
    {
      style: styles.arrowRight,
      direction: 'right',
      img: 'arrow-right.svg',
    },
  ];

  changeSection = (direction, numerOfSections) => {
    if (!this.state) {
      return null;
    }
    console.log('wloz', numerOfSections);
    const { section } = this.state;
    const currentSection = section;
    let nextSection;

    if (direction === 'left') {
      nextSection = currentSection - 1;
    } else {
      nextSection = currentSection + 1;
    }
    if (nextSection > numerOfSections) {
      nextSection = 0;
    } else if (nextSection < 0) {
      nextSection = numerOfSections;
    }
    console.log('nextSection', nextSection);
    this.setState({ section: nextSection });
  };

  render() {
    const stepData = this.props.stepData ? this.props.stepData : null;
    const infoPanel = stepData ? stepData.infoPanels[this.props.infoPanelIdx] : null;

    if (!infoPanel || !this.state) {
      return null;
    }

    let contentBeside;
    let contentBottom;
    let image;
    let style;
    let numberOfSections = false;
    let video;
    let infoSource;



    if (infoPanel && infoPanel.sections) {
      console.log('ss', infoPanel.sections[this.state.section]);
      contentBeside = infoPanel.sections[this.state.section].contentBeside;
      contentBottom = infoPanel.sections[this.state.section].contentBottom;
      image = infoPanel.sections[this.state.section].image;
      video = infoPanel.sections[this.state.section].video;
      style = infoPanel.sections[this.state.section].style;
      infoSource = infoPanel.sections[this.state.section].infoSource;
      numberOfSections = infoPanel.sections.length;
    } else {
      contentBeside = infoPanel ? infoPanel.contentBeside : null;
      contentBottom = infoPanel ? infoPanel.contentBottom : null;
      infoSource = infoPanel ? infoPanel.infoSource : null;
      image = infoPanel ? infoPanel.image : null;
      style = infoPanel ? infoPanel.style : {};
    }

    const panelStyle = _.extend({}, style, { position: 'relative' });

    return (
      <View style={style.panel}>
      {}
        {video && <VideoTooltip style={style.image} source={asset(`videos/${video}`)} />}
        <View style={{ flexDirection: 'row' }}>
          {image && <Image style={style.image} source={asset(`images/${image}`)} />}
          <Text style={style.contentBeside}>{`${contentBeside}`}</Text>
        </View>
        <Text style={style.contentBottom}>{`${contentBottom}`}</Text>
        <VrButton style={styles.close} onClick={() => TourActions.hideInfoPanel()}>
          <Image style={styles.close} source={asset('icons/close-button.png')} />
        </VrButton>
        {infoSource && <Text style={styles.infoSource}>{`${infoSource}`}</Text>}
        {numberOfSections && this.arrows.map(this.renderArrow.bind(null, numberOfSections))}
      </View>
    );
  }
}

class VideoTooltip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerState: new MediaPlayerState({ autoPlay: true, muted: true }),
    };
  }

  render() {
    return (
      <View>
        <Video
          style={{ width: 800, height: 500 }}
          source={this.props.source}
          playerState={this.state.playerState}
        />
        <VideoControl
          style={{ width: 800, height: 20 }}
          fontSize={18}
          playerState={this.state.playerState}
        />
      </View>
    );
  }
}

const styles = {
  close: {
    position: 'absolute',
    width: 50,
    height: 50,
    top: 0,
    right: 0,
  },
  arrowLeft: {
    position: 'absolute',
    width: 40,
    height: 40,
    left: 0,
    padding: 18,
    top: '50%',
  },
  arrowRight: {
    position: 'absolute',
    right: 0,
    width: 40,
    height: 40,
    padding: 18,
    top: '50%',
  },
  infoSource: {
    position: 'absolute',
    fontSize: 14,
    fontStyle: 'italic',
    bottom: 0,
    right: 10,
  },
};

const InfoPanelWithStore = connectToStores(InfoPanel, [TourStore], storeConnector);
AppRegistry.registerComponent('InfoPanel', () => InfoPanelWithStore);

export default InfoPanelWithStore;
