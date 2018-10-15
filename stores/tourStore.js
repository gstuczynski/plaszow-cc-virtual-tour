import alt from '../alt';
import TourActions from '../actions/tourActions';

class TourStore {
  constructor() {
    this.state = {
      isFetching: true,
      step: null,
      displayInfoPanel: false,
      idx: 0,
      infoPanelSection: 0,
    };
    this.bindActions(TourActions);
    this.exportPublicMethods({
      getStepData: this.getStepData,
      isFetching: this.isFetching,
      displayInfoPanelStatus: this.displayInfoPanelStatus,
      getInfoPanelData: this.getInfoPanelData,
      getInfoPanelIdx: this.getInfoPanelIdx,
    });
  }

  getStepData() {
    return this.state.step;
  }

  getInfoPanelIdx() {
    return this.state.idx;
  }

  isFetching() {
    return this.state.isFetching;
  }

  onNavigateTo() {
    this.setState({ isFetching: true });
  }

  onNavigateToSuccess(step) {
    console.log('onNavigateToSuccess', step);
    this.setState({ step, isFetching: false });
  }

  displayInfoPanelStatus() {
    return this.state.displayInfoPanel;
  }

  getInfoPanelData() {
    return this.state.step ? this.state.step.infoPanels[this.state.idx] : null;
  }

  onDisplayInfoPanelSuccess(idx) {
    this.setState({ idx });
  }

  onHideInfoPanel() {
    console.log('xxx');
    this.setState({ displayInfoPanel: false });
  }
}
export default alt.createStore(TourStore, 'TourStore');
