<template>
  <div id="root"></div>
  <div class="title">
    <span>TorusKnotGeometry</span>
  </div>
  <div class="title">
    <span>ConeGeometry</span>
  </div>
  <div class="title">
    <span>IcosahedronGeometry</span>
  </div>
  <!-- <div class="btn-route" @click="jump">Go Galaxy</div> -->
</template>
<script setup lang="ts">
import * as THREE from 'three'
import { onMounted, onBeforeUnmount } from 'vue'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
// import router from '../../router'

/**
 * init
 */
const size = {
  width: window.innerWidth,
  height: window.innerHeight
}
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(50, size.width / size.height, 0.1, 10000)
camera.position.z = 5
const renderer = new THREE.WebGLRenderer({
  precision: 'highp',
  antialias: true
})
renderer.setSize(size.width, size.height)
renderer.render(scene, camera)
// const controls = new OrbitControls(camera, renderer.domElement)

/**
 * geometryParams
 */
const geometryDistance = 4
const geometryParams = {
  color: 0x3ca8ec
}

/**
 * light
 */
const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
scene.add(directionalLight)

/**
 * textures
 */
const textureLoader = new THREE.TextureLoader()
const gradientMap = textureLoader.load('./textures/gradientTexture/3.jpg')
gradientMap.minFilter = THREE.NearestFilter
gradientMap.magFilter = THREE.NearestFilter

/**
 * material
 */
const material = new THREE.MeshToonMaterial({
  color: new THREE.Color(geometryParams.color),
  gradientMap: gradientMap,
  side: THREE.FrontSide
})

/**
 * geometry
 */
const torusKnotGeometry = new THREE.TorusKnotGeometry(0.8, 0.32)
const torusKnot = new THREE.Mesh(torusKnotGeometry, material)
scene.add(torusKnot)

const coneGeometry = new THREE.ConeGeometry(0.8, 1.8, 7)
const cone = new THREE.Mesh(coneGeometry, material)
scene.add(cone)

const icosahedronGeometry = new THREE.IcosahedronGeometry(1, 0)
const icosahedron = new THREE.Mesh(icosahedronGeometry, material)
scene.add(icosahedron)

torusKnot.position.y = -geometryDistance * 0
cone.position.y = -geometryDistance * 1
icosahedron.position.y = -geometryDistance * 2
torusKnot.position.x = geometryDistance * 0.5
cone.position.x = geometryDistance * -0.5
icosahedron.position.x = geometryDistance * 0.5

/**
 * particle
 */
const particleParams = {
  color: 0x08dfe2,
  count: 5000,
  size: 0.1
}
let particle: THREE.Points
let pointMaterial: THREE.PointsMaterial
let bufferGeometry: THREE.BufferGeometry
const alphaMap = textureLoader.load('./textures/PNG (Transparent)/circle_01.png')
const spawnParticle = () => {
  pointMaterial && pointMaterial.dispose()
  bufferGeometry && bufferGeometry.dispose()
  particle && scene.remove(particle)
  const positions = new Float32Array(particleParams.count * 3)
  bufferGeometry = new THREE.BufferGeometry()
  pointMaterial = new THREE.PointsMaterial({
    color: particleParams.color,
    size: particleParams.size,
    depthWrite: false,
    transparent: true,
    alphaMap: alphaMap
  })
  for (let i = 0; i < particleParams.count; i++) {
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    positions[i * 3 + 0] = (Math.random() - 0.5) * 10
  }
  bufferGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  particle = new THREE.Points(bufferGeometry, pointMaterial)
  scene.add(particle)
}
spawnParticle()

/**
 * debug
 */
const gui = new GUI()

const particleCtrl = gui.addFolder('particle')
particleCtrl.add(particleParams, 'count').min(1).max(50000).step(1).onFinishChange(() => spawnParticle())
particleCtrl.addColor(particleParams, 'color').onChange(() => pointMaterial.color.set(new THREE.Color(particleParams.color)))

const geometryCtrl = gui.addFolder('geometry')
geometryCtrl.addColor(geometryParams, 'color').onChange(() => material.color.set(new THREE.Color(geometryParams.color)))

const clock = new THREE.Clock()

const animation = () => {
  renderer.render(scene, camera)

  cone.rotation.x = clock.getElapsedTime() * 0.01
  icosahedron.rotation.x = clock.getElapsedTime() * 0.01
  torusKnot.rotation.x = clock.getElapsedTime() * 0.01

  cone.rotation.y = clock.getElapsedTime() * 0.05
  icosahedron.rotation.y = clock.getElapsedTime() * 0.05
  torusKnot.rotation.y = clock.getElapsedTime() * 0.05

  particle.rotation.y = clock.getElapsedTime() * 0.05

  requestAnimationFrame(animation)
}
animation()

const pos = {
  x: 0,
  y: 0
}
const setCameraPosition = () => {
  camera.position.x = pos.x / size.width / geometryDistance
  camera.position.y = -pos.y / size.width / geometryDistance - window.scrollY / size.height * geometryDistance
  particle.position.set(camera.position.x, camera.position.y, 0)
}
window.addEventListener('scroll', () => {
  setCameraPosition()
})
window.addEventListener('mousemove', (event: MouseEvent) => {
  pos.x = event.clientX
  pos.y = event.clientY
  setCameraPosition()
})
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

// const jump = () => {
//   router.push('/galaxy')
// }

onMounted(() => {
  document.getElementById('root')!.append(renderer.domElement)
  renderer.render(scene, camera)
})
onBeforeUnmount(() => {
  console.log('aaa')
  gui&&gui.destroy()
})
</script>
<style lang="scss" scoped>
#root {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: fixed;
  z-index: 1;
}

.btn-route {
  position: absolute;
  font-size: 40px;
  top: 5vh;
  left: 2vw;
  z-index: 2;
  color: aqua;
  cursor: pointer;
}

.title {
  pointer-events: none;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  padding: 0 10vw;
  box-sizing: border-box;
  color: aliceblue;
  font-size: 70px;
  font-weight: bold;
  position: relative;
  z-index: 2;
}

.title:nth-child(3) {
  span {
    margin-left: auto;
  }
}
</style>
