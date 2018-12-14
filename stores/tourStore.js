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
      object3dPosition: { transform: [{ translateZ: -15 }, { rotateY: 10 }] },
    };
    this.bindActions(TourActions);
    this.exportPublicMethods({
      getStepData: this.getStepData,
      isFetching: this.isFetching,
      displayInfoPanelStatus: this.displayInfoPanelStatus,
      getInfoPanelData: this.getInfoPanelData,
      getInfoPanelIdx: this.getInfoPanelIdx,
      getObject3dPosition: this.getObject3dPosition,
    });
  }

  getStepData() {
    return this.state.step;
  }

  getInfoPanelIdx() {
    return this.state.idx;
  }

  getObject3dPosition() {
    return this.state.object3dPosition;
  }

  isFetching() {
    return this.state.isFetching;
  }

  onNavigateTo() {
    this.setState({ isFetching: true });
  }

  onNavigateToSuccess(step) {
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
    this.setState({ displayInfoPanel: false });
  }

  onSet3dObjectPositionSuccess(object3dPosition) {
    this.setState({ object3dPosition });
  }
}
export default alt.createStore(TourStore, 'TourStore');
