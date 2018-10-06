import alt from '../alt';
import {asset} from "react-360";


class TourActions {

  constructor() {
    this.generateActions('navigateToError', 'navigateToSuccess', 'displayInfoPanel', 'hideInfoPanel')
  }

  navigateTo(step) {
    return(dispatch) => {
      dispatch();
      fetch('tour_config/' + step + '.json').then(response => {
        console.log('res', asset('sss'))
        if (!response.ok) {
          this.navigateToError(response.body);
        } else {
          response.json().then(this.navigateToSuccess)
        }
      }).catch(this.navigateToError)
    };
  }

}

export default alt.createActions(TourActions);
