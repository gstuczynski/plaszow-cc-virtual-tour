import { Math as VRMath, ReactInstance, Surface, Module, Location } from 'react-360-web';

const infoPanel = new Surface(1440, 850, Surface.SurfaceShape.Flat);
const mapPanel = new Surface(850, 800, Surface.SurfaceShape.Flat);
const mapPanelButton = new Surface(1400, 50, Surface.SurfaceShape.Flat);
const controlButtons3d = new Surface(400, 400, Surface.SurfaceShape.Flat);
const cylinderSurface = new Surface(4096, 720, Surface.SurfaceShape.Cylinder);
const mapButtonLocation = new Location([100, 40, -180])

class SurfacesController extends Module {
  constructor() {
    super('SurfacesController');
  }
  displayPanel() {
    infoPanel.setVisibility(true);
  }
  hidePanel() {
    infoPanel.setVisibility(false);
    mapPanel.setVisibility(false);
  }
  displayMap() {
    mapPanel.setVisibility(true);
  }
}

function init(bundle, parent, options = {}) {
  const cameraDirection = [0, 0, -1];
  const mapButtoncameraDirection = [0.85, 0.45, -1];

  const r360 = new ReactInstance(bundle, parent, {
    fullScreen: true,
    nativeModules: [new SurfacesController()],
    frame: () => {
      const cameraQuat = r360.getCameraQuaternion();
      const testcameraDirection = [15, 7.5, -15];

      //console.log('cameraQuat', cameraQuat)
      cameraDirection[0] = 0;
      cameraDirection[1] = 0;
      cameraDirection[2] = -1;
      const mapBtnDirX = 0;
      const mapBtnDirY = 0.5;
      const mapBtnDirZ = -1;
      const mapBtnDirMgn = Math.sqrt(
        mapBtnDirX * mapBtnDirX + mapBtnDirY * mapBtnDirY + mapBtnDirZ * mapBtnDirZ
      );
      mapButtoncameraDirection[0] = mapBtnDirX / mapBtnDirMgn;
      mapButtoncameraDirection[1] = mapBtnDirY / mapBtnDirMgn;
      mapButtoncameraDirection[2] = mapBtnDirZ / mapBtnDirMgn;

      VRMath.rotateByQuaternion(cameraDirection, cameraQuat);
      VRMath.rotateByQuaternion(mapButtoncameraDirection, cameraQuat);
      //console.log('before rotateByQuaternion', testcameraDirection)
      VRMath.rotateByQuaternion(testcameraDirection, cameraQuat);
      //console.log('after rotateByQuaternion', testcameraDirection)
      const cx = cameraDirection[0];
      const cy = cameraDirection[1];
      const cz = cameraDirection[2];
        // const mcx = mapButtoncameraDirection[0];
        // const mcy = mapButtoncameraDirection[1];
        // const mcz = mapButtoncameraDirection[2];
      //console.log(mapButtoncameraDirection)
       const mcx = testcameraDirection[0];
       const mcy = testcameraDirection[1];
       const mcz = testcameraDirection[2];

//console.log(testcameraDirection)

      const horizAngle = Math.atan2(cx, -cz);
      const vertAngle = Math.asin(cy / Math.sqrt(cx * cx + cy * cy + cz * cz));
      const mapHorizAngle = Math.atan2(mcx, -mcz);
      const mapvertAngle = Math.asin(mcy / Math.sqrt(mcx * mcx + mcy * mcy + mcz * mcz));
      infoPanel.setAngle(horizAngle, vertAngle);
      mapPanel.setAngle(horizAngle, vertAngle);
     // const x = mcx * Math.cos(horizAngle) + mcz * Math.sin(horizAngle);
      //const y = mcx * Math.sin(vertAngle) *  Math.sin(horizAngle) + mcy * Math.cos(vertAngle) - mcz * Math.sin(vertAngle) * Math.cos(horizAngle); 
     // const z = -mcx * Math.sin(horizAngle) * Math.cos(vertAngle) + mcy * Math.sin(vertAngle) + mcz * Math.cos(vertAngle) * Math.cos(horizAngle);
      
     
      mapButtonLocation.setWorldPosition(mcx, mcy, mcz );
      //mapButtonLocation.setWorldRotation(mcx, mcy, mcz, 0 );
      //console.log('horizAngle', horizAngle, 'vertAngle', vertAngle)

      
      //mapPanelButton.setAngle(mapHorizAngle, mapvertAngle);
    },
    ...options,
  });

  cylinderSurface.setRadius(360);
  r360.renderToLocation(r360.createRoot('MapPanelButton'), mapButtonLocation)
  r360.renderToLocation(r360.createRoot('Test3d'), new Location([0, -1, -2]))
  //r360.renderToLocation(r360.createRoot('ControlButtons3d'), new Location([0, -2, -2]))


  //r360.renderToSurface(r360.createRoot('ControlButtons3d'), controlButtons3d);

  r360.renderToSurface(r360.createRoot('TemplateTour'), cylinderSurface);
  r360.renderToSurface(r360.createRoot('InfoPanel'), infoPanel);
  r360.renderToSurface(r360.createRoot('MapPanel'), mapPanel);
  //r360.renderToSurface(r360.createRoot('MapPanelButton'), mapPanelButton);

  infoPanel.setVisibility(false);
  mapPanel.setVisibility(false);
}

window.React360 = { init };
