# WebXRのライフサイクル
1. WebxR Device APIが使用可能かどうかを確認する
  1. navigator.xrがあるかどうかを調べる
  2. navigator.xr.isSessionSupported()を実行する
2. navigator.xr.requestSession()を実行してセッションをリクエストする
3. 2によって返されたXRSessionから、requestAnimationFrame()を呼び出す

![Life Cycle](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API/Lifecycle)
