<template>
  <canvas id="three"></canvas>
</template>

<script lang="ts" setup>
import * as THREE from 'three'
import { onMounted } from 'vue'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
let canvas: HTMLCanvasElement, renderer: THREE.WebGLRenderer

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x000000)
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 10
scene.add(camera)


const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const cube = new THREE.Mesh(boxGeometry, new THREE.MeshBasicMaterial({
  color: new THREE.Color(0xff0000)
}))
scene.add(cube)


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

const render = () => {
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