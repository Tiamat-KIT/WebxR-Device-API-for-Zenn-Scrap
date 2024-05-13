import './style.css'
import { renderer, animate } from './three.view';

window.onload = async() => {
  const xRSessionOption: XRSessionInit = {
    requiredFeatures: ['hit-test'],
    optionalFeatures: ['dom-overlay'],
    domOverlay: {
      root: document.body
    }
  }
  
  const xr = window.navigator.xr;
  if(xr !== undefined){
    const isSupported = await xr.isSessionSupported("immersive-ar")
    if(isSupported){
      const XRSession = await xr.requestSession("immersive-ar",xRSessionOption)
      renderer.xr.setSession(XRSession).then(() => {
        animate()
      })
    }
  } else {
    console.error("Can't Used WebxR")
  }
}
