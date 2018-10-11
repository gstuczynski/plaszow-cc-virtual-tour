import { Math as VRMath, ReactInstance, Surface, Module } from 'react-360-web';

const infoPanel = new Surface(1340, 800, Surface.SurfaceShape.Flat);
const closeButton = new Surface(1420, 800, Surface.SurfaceShape.Flat);
const mapPanel = new Surface(800, 800, Surface.SurfaceShape.Flat);
const mapPanelButton = new Surface(50, 50, Surface.SurfaceShape.Flat);
const cylinderSurface = new Surface(4096, 720, Surface.SurfaceShape.Cylinder);

class SurfacesController extends Module {
  constructor() {
    super('SurfacesController');
  }
  displayPanel() {
    infoPanel.setVisibility(true);
    closeButton.setVisibility(true);
  }
  hidePanel() {
    infoPanel.setVisibility(false);
    closeButton.setVisibility(false);
    mapPanel.setVisibility(false);
  }
  displayMap() {
    mapPanel.setVisibility(true);
    closeButton.setVisibility(true);
  }
}

function init(bundle, parent, options = {}) {
  const cameraDirection = [0, 0, -1];
  const mapButtoncameraDirection = [0.85, 0.45, -1]

  const r360 = new ReactInstance(bundle, parent, {
    fullScreen: true,
    nativeModules: [new SurfacesController()],
    frame: () => {
      const cameraQuat = r360.getCameraQuaternion();
      cameraDirection[0] = 0;
      cameraDirection[1] = 0;
      cameraDirection[2] = -1;
      mapButtoncameraDirection[0] = 1;
      mapButtoncameraDirection[1] = 0.5;
      mapButtoncameraDirection[2] = -1;
      VRMath.rotateByQuaternion(cameraDirection, cameraQuat);
      VRMath.rotateByQuaternion(mapButtoncameraDirection, cameraQuat);
      const cx = cameraDirection[0];
      const cy = cameraDirection[1];
      const cz = cameraDirection[2];
      const mcx = mapButtoncameraDirection[0];
      const mcy = mapButtoncameraDirection[1];
      const mcz = mapButtoncameraDirection[2];
      const horizAngle = Math.atan2(cx, -cz);
      const vertAngle = Math.asin(cy / Math.sqrt(cx * cx + cy * cy + cz * cz));
      const mapHorizAngle = Math.atan2(mcx, -mcz);
      const mapvertAngle = Math.asin(mcy / Math.sqrt(mcx * mcx + mcy * mcy + mcz * mcz));
      infoPanel.setAngle(horizAngle, vertAngle);
      closeButton.setAngle(horizAngle, vertAngle);
      mapPanel.setAngle(horizAngle, vertAngle);
      mapPanelButton.setAngle(mapHorizAngle, mapvertAngle);

    },
    ...options,
  });

  
  cylinderSurface.setRadius(360);
  r360.renderToSurface(r360.createRoot('TemplateTour'), cylinderSurface);
  r360.renderToSurface(r360.createRoot('InfoPanel'), infoPanel);
  r360.renderToSurface(r360.createRoot('CloseButton'), closeButton);
  r360.renderToSurface(r360.createRoot('MapPanel'), mapPanel);
  r360.renderToSurface(r360.createRoot('MapPanelButton'), mapPanelButton);

  infoPanel.setVisibility(false);
  closeButton.setVisibility(false);
  mapPanel.setVisibility(false);
}

window.React360 = { init };
