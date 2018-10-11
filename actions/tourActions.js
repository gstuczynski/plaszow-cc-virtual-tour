import alt from '../alt';
import { asset, NativeModules } from 'react-360';

const { SurfacesController } = NativeModules;

class TourActions {
  constructor() {
    this.generateActions('navigateToError', 'navigateToSuccess', 'displayInfoPanelSuccess');
  }

  navigateTo(step) {
    return dispatch => {
      dispatch();
      fetch('tour_config/' + step + '.json')
        .then(response => {
          // console.log('res', asset('sss'))
          if (!response.ok) {
            this.navigateToError(response.body);
          } else {
            response.json().then(this.navigateToSuccess);
          }
        })
        .catch(this.navigateToError);
    };
  }
  displayInfoPanel(idx) {
    try{
      SurfacesController.displayPanel();
    }catch(err){
      console.err(err);
    }
    this.displayInfoPanelSuccess(idx);
  }

  hideInfoPanel() {
    SurfacesController.hidePanel();
  }

  displayMap(){
    SurfacesController.displayMap();
  }

}

export default alt.createActions(TourActions);
