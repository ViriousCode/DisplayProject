<!-- <template>
  <canvas id="three"></canvas>
</template>

<script lang="ts" setup>
import * as THREE from 'three'
import { onMounted } from 'vue'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
let canvas: HTMLCanvasElement, renderer: THREE.WebGLRenderer

const textureLoader = new THREE.TextureLoader()
const doorColorTexture = textureLoader.load('./textures/door/Color.png')
const doorAmbientOcclusionTexture = textureLoader.load('./textures/door/AmbientOcclusion.png')
const doorDisplacementTexture = textureLoader.load('./textures/door/Displacement.png')
const doorMetalnessTexture = textureLoader.load('./textures/door/Metalness.png')
const doorNormalDXTexture = textureLoader.load('./textures/door/NormalDX.png')
const doorOpacityTexture = textureLoader.load('./textures/door/Opacity.png')
const doorRoughnessTexture = textureLoader.load('./textures/door/Roughness.png')


const bricksColorTexture = textureLoader.load('./textures/bricks/Color.png')
const bricksAmbientOcclusionTexture = textureLoader.load('./textures/bricks/AmbientOcclusion.png')
// const bricksDisplacementTexture = textureLoader.load('./textures/bricks/Displacement.png')
const bricksNormalTexture = textureLoader.load('./textures/bricks/Normal.png')
const bricksRoughnessTexture = textureLoader.load('./textures/bricks/Roughness.png')

const grassColorTexture = textureLoader.load('./textures/grass/Color.jpg')
const grassAmbientOcclusionTexture = textureLoader.load('./textures/grass/AmbientOcclusion.jpg')
const grassHeightTexture = textureLoader.load('./textures/bricks/Displacement.jpg')
const grassBUMPTexture = textureLoader.load('./textures/grass/BUMP.jpg')
const grassNormalTexture = textureLoader.load('./textures/grass/Normal.jpg')

const scene = new THREE.Scene()
// scene.background = new THREE.Color(0x000000)
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 20, 20)
scene.add(camera)

// fog
const fogColor = '#65859f'
const fog = new THREE.Fog(fogColor, 5, 50)
scene.fog = fog

// light
const ambientLight = new THREE.AmbientLight('#ffffff', 0.2)
scene.add(ambientLight)
const pointLight = new THREE.PointLight('#e2c09f', 0.5, 10)
pointLight.position.set(0, 2, 2.5)
scene.add(pointLight)
const directionalLight = new THREE.DirectionalLight('#ffffff',0.2)
scene.add(directionalLight)


// helper
const pointLightHelper = new THREE.PointLightHelper(pointLight)
pointLightHelper.visible = false
scene.add(pointLightHelper)

// house
const house = new THREE.Group()
scene.add(house)

// door
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2, 2, 100, 100),
  new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    transparent: true,
    alphaMap: doorOpacityTexture,
    aoMap: doorAmbientOcclusionTexture,
    displacementMap: doorDisplacementTexture,
    displacementScale: 0.1,
    normalMap: doorNormalDXTexture,
    metalnessMap: doorMetalnessTexture,
    roughnessMap: doorRoughnessTexture
    // color: new THREE.Color('#ff0000')
  })
)
door.position.y = 1
door.position.z = 2 + 0.01
door.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2))
house.add(door)

// wall
const wallGeometry = new THREE.BoxGeometry(4, 2.5, 4)
const wall = new THREE.Mesh(wallGeometry, new THREE.MeshStandardMaterial({
  map: bricksColorTexture,
  aoMap: bricksAmbientOcclusionTexture,
  normalMap: bricksNormalTexture,
  roughnessMap: bricksRoughnessTexture,
  // displacementMap:bricksDisplacementTexture,
  // displacementScale:1
}))
wall.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(wall.geometry.attributes.uv.array, 2))
wall.position.y = 2.5 / 2 - 0.01
house.add(wall)


// cone
const coneGeometry = new THREE.ConeGeometry(4, 1.5, 4)
const cone = new THREE.Mesh(coneGeometry, new THREE.MeshStandardMaterial({
  color: new THREE.Color(0xa2147f)
}))
cone.rotation.y = Math.PI / 4
cone.position.y = 2.5 + 1.5 / 2 - 0.01
house.add(cone)

// grass
const grassGeometry = new THREE.PlaneGeometry(20, 20)
const grass = new THREE.Mesh(grassGeometry, new THREE.MeshStandardMaterial({
  map: grassColorTexture,
  aoMap: grassAmbientOcclusionTexture,
  normalMap: grassNormalTexture,
  displacementMap:grassHeightTexture,
  bumpMap: grassBUMPTexture,
  side:THREE.DoubleSide,
}))
grass.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(grass.geometry.attributes.uv.array, 2))
grass.rotation.x = Math.PI / 2
scene.add(grass)

onMounted(() => {
  canvas = document.getElementById('three') as HTMLCanvasElement
  const orbitControls = new OrbitControls(camera, canvas)
  orbitControls.update()
  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  render()
})

const render = () => {
  renderer.setClearColor(fogColor, 1)
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
</style> -->