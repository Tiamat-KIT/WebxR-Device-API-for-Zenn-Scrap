import './style.css'


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    
  </div>
`

const xr = window.navigator.xr;
if(xr !== undefined){
  xr.isSessionSupported("immersive-ar").then((isSupported) => {
    if(isSupported){
      xr.requestSession("immersive-ar").then((session) => {
        console.log("Session Started!")
      })
    }
  })
} else {
  console.error("Can't Used WebxR")
}