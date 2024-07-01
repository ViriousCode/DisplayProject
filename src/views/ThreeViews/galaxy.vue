<template>
  <div id="root">
  </div>
</template>
<script setup lang="ts">
import * as THREE from 'three'
import { onMounted } from 'vue'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

/**
 * init
 */
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 10000)
camera.position.z = 15
const renender = new THREE.WebGLRenderer({
  precision: 'highp',
  antialias: true
})
renender.setSize(window.innerWidth, window.innerHeight)
renender.render(scene, camera)
new OrbitControls(camera, renender.domElement)

/**
 * params
 */
const params = {
  count: 5000,
  colorInside: 0xf31212,
  colorOutside: 0x12c6f3,
  size: 0.02,
  galaxyRadius: 10,
  branch: 5,
  curveVal: 0.5
}

/**
 * debug
 */
const gui = new GUI()
gui.add(params, 'count').min(100).max(10000).step(1).onFinishChange(() => spawnGalaxy())
gui.add(params, 'size').min(0.01).max(0.1).step(0.01).onFinishChange(() => spawnGalaxy())
gui.add(params, 'galaxyRadius').min(1).max(1000).step(1).onFinishChange(() => spawnGalaxy())
gui.add(params, 'branch').min(1).max(100).step(1).onFinishChange(() => spawnGalaxy())
gui.add(params, 'curveVal').min(0.01).max(1).step(0.01).onFinishChange(() => spawnGalaxy())
gui.addColor(params, 'colorInside').onFinishChange(() => spawnGalaxy())
gui.addColor(params, 'colorOutside').onFinishChange(() => spawnGalaxy())

/**
 * galaxy
 */
let geometry: THREE.BufferGeometry
let material: THREE.PointsMaterial
let galaxy: THREE.Points
const spawnGalaxy = () => {
  geometry && geometry.dispose()
  material && material.dispose()
  scene.remove(galaxy)
  const colorInside = new THREE.Color(params.colorInside)
  const colorOutside = new THREE.Color(params.colorOutside)
  const positions = new Float32Array(params.count * 3)
  const colors = new Float32Array(params.count * 3)
  geometry = new THREE.BufferGeometry()
  material = new THREE.PointsMaterial({
    // color: params.color,
    depthWrite: false,
    size: params.size,
    vertexColors: true
  })
  for (let i = 0; i < params.count; i++) {
    const radius = Math.random() * params.galaxyRadius
    const angle = i % params.branch / params.branch * Math.PI * 2
    const curveAngle = radius * params.curveVal

    positions[i * 3] = Math.cos(angle + curveAngle) * radius
    positions[i * 3 + 1] = Math.sin(angle + curveAngle) * radius + Math.pow((Math.random() - 0.5), 2) * 15
    positions[i * 3 + 2] = 0 + Math.pow(Math.random() - 0.5, 2) * 5

    const color = colorInside.clone().lerp(colorOutside.clone(), radius / params.galaxyRadius)
    colors[i * 3 + 0] = color.r
    colors[i * 3 + 1] = color.g
    colors[i * 3 + 2] = color.b
  }
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  galaxy = new THREE.Points(geometry, material)
  scene.add(galaxy)
}

/**
 * time
 */
const clock = new THREE.Clock()

const animation = () => {
  const t = clock.getElapsedTime()
  galaxy.rotation.z = -t * 0.1
  renender.render(scene, camera)
  requestAnimationFrame(animation)
}

onMounted(() => {
  document.getElementById('root')!.append(renender.domElement)
  renender.render(scene, camera)
  spawnGalaxy()
  animation()
})
</script>
<style lang="scss" scoped>
#root {
  position: fixed;
}
</style>
