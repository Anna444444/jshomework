import * as THREE from 'three';
import { OrbitControls } from 'addons/controls/OrbitControls.js';
import * as Dat from './dat.gui.module.js';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const textureLoader = new THREE.TextureLoader();
scene.background = textureLoader.load('./space.jpeg');

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const orbitCtrl = new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);

// const gridHelper = new THREE.GridHelper(30, 50);
// scene.add(gridHelper);

camera.position.set(10, 10, 20);
orbitCtrl.update();

const earthGeometry = new THREE.SphereGeometry(5, 32, 32);
const earthMaterial = new THREE.MeshStandardMaterial({
                    map: textureLoader.load('./earth.png')
});
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earth);

const moonGeometry = new THREE.SphereGeometry(2, 32, 32);
const moonMaterial = new THREE.MeshStandardMaterial({
    map: textureLoader.load('./moon.png')
});
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
scene.add(moon);

moon.position.set(12, 2, 0);

const moonPivot = new THREE.Object3D();
moonPivot.add(moon);
scene.add(moonPivot);

const light = new THREE.PointLight(0xffffff, 1);
light.position.set(8, 50, 0);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const spotLight = new THREE.SpotLight(0xffffff, 1);
spotLight.position.set(8, 10, 0);
spotLight.target = earth;
spotLight.angle = Math.PI / 4;
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
scene.add(spotLight);

const gui = new Dat.GUI();
const options = {
    earthRotationSpeed: 0.01,
    moonRotationSpeed: 0.05
};


gui.add(options, 'earthRotationSpeed', 0, 0.1);
gui.add(options, 'moonRotationSpeed', 0, 0.1);

function animate() {
    earth.rotation.y += options.earthRotationSpeed;
    moonPivot.rotation.y += options.moonRotationSpeed;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();


