<template>
  <canvas id="three"></canvas>
</template>
<script lang="ts" setup>
import * as THREE from 'three'
import { onMounted } from 'vue'
import { OrbitControls } from "three/addons/controls/OrbitControls.js"
// import { FontLoader } from 'three/addons/loaders/FontLoader.js'
// import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'
let canvas: HTMLCanvasElement, renderer: THREE.WebGLRenderer
// import GUI from 'three/examples/jsm/libs/lil-gui.module.min.js'
// import { gsap } from 'gsap'

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x000000)
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 10
scene.add(camera)

// helper
const axesHelp = new THREE.AxesHelper()
scene.add(axesHelp)
axesHelp.visible = false

//font
// const fontLoader = new FontLoader()
// fontLoader.load(
//   '/fonts/helvetiker_regular.typeface.json',
//   (font) => {
//     const textGeometry = new TextGeometry('Virious', {
//       font: font,
//       size: 5,
//       depth: 0.05,
//       curveSegments: 0.1,
//       bevelEnabled: true,
//       bevelThickness: 1,
//       bevelSize: 0.1,
//       bevelOffset: 0,
//       bevelSegments: 1
//     })
//     textGeometry.center()
//     const textMesh = new THREE.Mesh(textGeometry, new THREE.MeshBasicMaterial({
//       color: new THREE.Color('red'),
//       wireframe: true
//     }))
//     scene.add(textMesh)
//     console.log(gsap)
//     gsap.to(textMesh.position, { rotation: Math.PI, x: -30, y: 20, duration: 1 })
//     gsap.to(textMesh.rotation, { x: Math.PI * 0.15, duration: 1 })
//     // gsap.to(textMesh, { scale:100, duration: 1 })
//     // gsap.to(textGeometry, { rotation: 27, x: -10, scale: 10, duration: 1 })


//     /**
//  * debug
//  */
//     const gui = new GUI()
//     gui.add(textMesh.position, 'x').min(0).max(10)
//   },
//   (xhr) => {
//     console.log(xhr)
//   },
//   (err) => {
//     console.log(err)
//   }
// )

// loadTextures
const textureLoader = new THREE.TextureLoader()
const scorch = textureLoader.load('./textures/PNG (Transparent)/circle_01.png')


// particles
const particlesGeometry = new THREE.BufferGeometry()
const count = 10000
const positions = new Float32Array(count * 3)
for (let i = 0; i < count * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 50
}
const particlesMaterial = new THREE.PointsMaterial({
  size: 0.2,
  sizeAttenuation: true,
  color: '#45a9ff',
  transparent:true,
  alphaMap:scorch,
  depthWrite:false,
  // blending:THREE.AdditiveBlending
})
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
const mesh = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(mesh)


onMounted(() => {
  canvas = document.getElementById('three') as HTMLCanvasElement
  const orbitControls = new OrbitControls(camera, canvas)
  orbitControls.update()
  renderer = new THREE.WebGLRenderer({
    canvas: canvas
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  render()
})

const clock = new THREE.Clock()
clock.start()

const render = () => {
  const t = clock.getElapsedTime() / 10
  camera.position.set(Math.sin(t)*10, 0, Math.cos(t)*10)
  camera.lookAt(0, 0, 0)
  renderer.render(scene, camera)
  requestAnimationFrame(() => {
    render()
  })
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})
</script>

<style lang="scss" scoped>
#three {
  position: fixed;
}
</style>