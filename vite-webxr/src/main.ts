import './style.css'
import * as THREE from 'three'

// https://gaprot.jp/2023/11/27/webxr-device-api-three-js-webar/

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.01,
  20,
)
const light = new THREE.DirectionalLight(0xffffff)
light.position.set(1, 1, 1).normalize()
scene.add(light)
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
// XRのレンダリングを有効化
renderer.xr.enabled = true
renderer.xr.setReferenceSpaceType('local')


// ヒットテスト用のreticleを用意
const reticle = new THREE.Mesh(
  new THREE.RingGeometry(0.15, 0.2, 32).rotateX(-Math.PI / 2),
  new THREE.MeshBasicMaterial(),
)
reticle.matrixAutoUpdate = false
reticle.visible = false
scene.add(reticle)


window.onload = () => {

  const xRSessionOption: XRSessionInit = {
    requiredFeatures: ['hit-test'],
    optionalFeatures: ['dom-overlay'],
    domOverlay: {
      root: document.body
    }
  }
  
  const xr = window.navigator.xr;
  if(xr !== undefined){
    xr.isSessionSupported("immersive-ar").then((isSupported) => {
      if(isSupported){
        xr.requestSession("immersive-ar",xRSessionOption).then((session) => {
          console.log("Session Started!")
          renderer.xr.setSession(session).then(() => {
            console.log('xR View!')
          })
          /* session.requestAnimationFrame(() => {}) */
        })
      }
    })
  } else {
    console.error("Can't Used WebxR")
  }
}

let hitTestSource: XRHitTestSource | null  = null

function animate() {
  // レンダリング処理をループ
  renderer.setAnimationLoop(render)
}

async function render(_: number, frame?: XRFrame) {
  
  if (!frame) return

  const referenceSpace = renderer.xr.getReferenceSpace()
  const session = renderer.xr.getSession()
  if (!hitTestSource && referenceSpace && session) {
    const space = await session.requestReferenceSpace('viewer')
    // ヒットテストソースの設定
    hitTestSource = await session.requestHitTestSource!({
      space,
    })!

    session.addEventListener('end', () => {
      hitTestSource = null
    })
  }
  if (hitTestSource) {
    // ヒットテスト結果の取得
    const hitTestResults = frame.getHitTestResults(hitTestSource)
    if (hitTestResults.length && referenceSpace) {
      const hit = hitTestResults[0]
      // ヒット位置にreticleを表示
      reticle.visible = true
      reticle.matrix.fromArray(hit.getPose(referenceSpace)!.transform.matrix)
    } else {
      reticle.visible = false
    }
  }

  renderer.render(scene, camera)
}

animate()
