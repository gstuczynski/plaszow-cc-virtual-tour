import { Math as VRMath, ReactInstance, Surface, Module, Location } from 'react-360-web';

const infoPanel = new Surface(1440, 850, Surface.SurfaceShape.Flat);
const mapPanel = new Surface(850, 800, Surface.SurfaceShape.Flat);
const cylinderSurface = new Surface(4096, 720, Surface.SurfaceShape.Cylinder);
const mapButtonLocation = new Location([100, 40, -180]);

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
      VRMath.rotateByQuaternion(testcameraDirection, cameraQuat);
      const cx = cameraDirection[0];
      const cy = cameraDirection[1];
      const cz = cameraDirection[2];
      const mcx = testcameraDirection[0];
      const mcy = testcameraDirection[1];
      const mcz = testcameraDirection[2];
      const horizAngle = Math.atan2(cx, -cz);
      const vertAngle = Math.asin(cy / Math.sqrt(cx * cx + cy * cy + cz * cz));
      infoPanel.setAngle(horizAngle, vertAngle);
      mapPanel.setAngle(horizAngle, vertAngle);

      mapButtonLocation.setWorldPosition(mcx, mcy, mcz);
    },
    ...options,
  });

  cylinderSurface.setRadius(360);
  r360.renderToLocation(r360.createRoot('MapPanelButton'), mapButtonLocation);
  r360.renderToSurface(r360.createRoot('TemplateTour'), cylinderSurface);
  r360.renderToSurface(r360.createRoot('InfoPanel'), infoPanel);
  r360.renderToSurface(r360.createRoot('MapPanel'), mapPanel);

  infoPanel.setVisibility(false);
  mapPanel.setVisibility(false);
}

window.React360 = { init };
