import React from 'react';
import { View, asset, Text, Image, VrButton } from 'react-360';
import scenePropTypes from './ScenePropTypes';
import Arrow from './Arrow';
import connectToStores from '../connectToStores';
import TourStore from '../stores/tourStore';
import TourActions from '../actions/tourActions';
import renderFromJson from '../utils/renderFromJson';

const styles = {
  close: {
    position: 'absolute',
    width: 50,
    height: 50,
    top: 20,
    right: 1,
    zIndex: 100,
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
  static propTypes = scenePropTypes;

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
    return this.setState({ section: nextSection });
  };

  render() {
    const stepData = this.props.stepData ? this.props.stepData : null;
    const infoPanel = stepData ? stepData.infoPanels[this.props.infoPanelIdx] : null;

    if (!infoPanel || !this.state) {
      return null;
    }

    const numberOfSections = infoPanel.sections.length;
    const infoSource = infoPanel.sections[this.state.section].infoSource;
    const title = infoPanel.title;

    return (
      <View style={{ width: '100%' }}>
        {title && (
          <Text style={{ backgroundColor: 'grey', fontSize: 28, textAlign: 'center' }}>
            {title}
          </Text>
        )}
        {renderFromJson(infoPanel.sections[this.state.section])}
        {numberOfSections > 1 && this.arrows.map(this.renderArrow.bind(null, numberOfSections))}
        {infoSource && (
          <Text style={{ position: 'absolute', bottom: 10, right: 10, margin: 10 }}>
            {infoSource}
          </Text>
        )}
        <VrButton style={styles.close} onClick={() => TourActions.hideInfoPanel()}>
          <Image style={styles.close} source={asset('icons/close-button.png')} />
        </VrButton>
      </View>
    );
  }
}

const InfoPanelWithStore = connectToStores(InfoPanel, [TourStore], storeConnector);
export default InfoPanelWithStore;
