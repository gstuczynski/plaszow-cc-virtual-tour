import alt from '../alt';

class TourActions {

  constructor() {
    this.generateActions('navigateToError', 'navigateToSuccess', 'displayInfoPanel', 'hideInfoPanel')
  }

  navigateTo(step) {
    return(dispatch) => {
      dispatch();
      fetch('../tour_config/' + step + '.json').then(response => {
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
