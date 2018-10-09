// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import { Math as VRMath, ReactInstance, Surface } from 'react-360-web';

function init(bundle, parent, options = {}) {
  const infoPanel = new Surface(1400, 800, Surface.SurfaceShape.Flat);
  const closeButton = new Surface(200, 200, Surface.SurfaceShape.Flat);
  const cameraDirection = [0, 0, -1];

  const r360 = new ReactInstance(bundle, parent, {
    // Add custom options here
    fullScreen: true,
    frame: () => {
      const cameraQuat = r360.getCameraQuaternion();
      cameraDirection[0] = 0;
      cameraDirection[1] = 0;
      cameraDirection[2] = -1;
      // cameraDirection will point out from the view of the camera,
      // we can use it to compute surface angles
      VRMath.rotateByQuaternion(cameraDirection, cameraQuat);
      const cx = cameraDirection[0];
      const cy = cameraDirection[1];
      const cz = cameraDirection[2];
      const horizAngle = Math.atan2(cx, -cz);
      const vertAngle = Math.asin(cy / Math.sqrt(cx * cx + cy * cy + cz * cz));
      infoPanel.setAngle(horizAngle, vertAngle);
      closeButton.setAngle(horizAngle, vertAngle - 0.6);
    },
    ...options,
  });

  const cylinderSurface = new Surface(4096, 720, Surface.SurfaceShape.Cylinder /* shape */);
  r360.compositor.setCursorVisibility('visible');
  r360.renderToSurface(r360.createRoot('TemplateTour'), cylinderSurface);

  r360.renderToSurface(r360.createRoot('InfoPanel'), infoPanel);
  r360.renderToSurface(r360.createRoot('CloseButton'), closeButton);
}

window.React360 = { init };
