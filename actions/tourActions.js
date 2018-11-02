import alt from '../alt';
import { asset, NativeModules } from 'react-360';
import _ from 'underscore';

const { SurfacesController } = NativeModules;

class TourActions {
  constructor() {
    this.generateActions(
      'navigateToError',
      'navigateToSuccess',
      'displayInfoPanelSuccess',
      'set3dObjectPositionSuccess'
    );
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
    try {
      SurfacesController.displayPanel();
    } catch (err) {
      console.err(err);
    }
    this.displayInfoPanelSuccess(idx);
  }

  hideInfoPanel() {
    SurfacesController.hidePanel();
  }

  displayMap() {
    SurfacesController.displayMap();
  }

  set3dObjectPosition(pos, direction) {
    const newPosition = {};
    console.log(direction);

    switch (direction) {
      case 'left': {
        let y = pos.transform[1].rotateY ? pos.transform[1].rotateY : 0;
        newPosition.transform = [pos.transform[0], { rotateY: y + 10 }];
        break;
      }
      case 'right': {
        let y = pos.transform[1].rotateY ? pos.transform[1].rotateY : 0;
        newPosition.transform = [pos.transform[0], { rotateY: y - 10 }];
        break;
      }
      case 'zoomin': {
        let z = pos.transform[0].translateZ ? pos.transform[0].translateZ : 0;
        newPosition.transform = [{ translateZ: z + 1 }, pos.transform[1]];
        break;
      }
    }
    this.set3dObjectPositionSuccess(newPosition);
  }
}

export default alt.createActions(TourActions);
