import './style.css'


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    
  </div>
`

window.onload = () => {
  const xRSessionOption: XRSessionInit = {
    optionalFeatures: ["hand-tracking"],
  }
  
  const xr = window.navigator.xr;
  if(xr !== undefined){
    xr.isSessionSupported("immersive-ar").then((isSupported) => {
      if(isSupported){
        xr.requestSession("immersive-ar",xRSessionOption).then((session) => {
          
          console.log("Session Started!")
        })
      }
    })
  } else {
    console.error("Can't Used WebxR")
  }
}