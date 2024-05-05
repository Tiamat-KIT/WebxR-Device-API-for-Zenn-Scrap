if("xr" in window.navigator){
  navigator.xr.isSessionSupported("immersive-ar").then((isSupported) => {
    if(isSupported){
      navigator.xr.requestSession("immersive-ar").then((session) => {
        console.log("Session Started!")
      })
    }
  })
} else {
  console.error("Can't Used WebxR")
}