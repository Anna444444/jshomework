import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as CANNON from 'cannon';
import { Layer3d } from './layer3d.js';
import { Object3d } from './object3d.js';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const layer = new Layer3d(renderer);

const floor = new Object3d(layer, 'plane', [30, 30], 0x113333, 0);
floor.setPosition(0, 0, 0);
floor.rotate(-Math.PI / 2, 0, 0);
layer.add(floor);

const ball = new Object3d(layer, 'sphere', [2], 0x993311, 0);
ball.setPosition(0, 2, 0);
ball.setDamping(0.5);
ball.setFixedRotation(false);
layer.add(ball);

ball.createPhysicsBody(new CANNON.Sphere(1), 1);
ball.setPosition(0, 2, 0);

const block = new Object3d(layer, 'box', [1, 10, 1], 0x666666, 0);
block.setPosition(4, 5, 0);
layer.add(block);

const world = layer.getWorld();

const floorToBlockContact = new CANNON.ContactMaterial(
    floor.getPhysicsMaterial(),
    block.getPhysicsMaterial(),
    {
        friction: 0.01
    }
);
world.addContactMaterial(floorToBlockContact);

const worldTimeStep = 1 / 60;
renderer.setAnimationLoop(() => {
    world.step(worldTimeStep);
    layer.animationLoop();
});

window.addEventListener('keydown', (ev) => {
    const force = 20;
    const { x, y, z } = ball.getPhysicsBody().position;
    switch (ev.code) {
        case 'ArrowUp':
            ball.getPhysicsBody().applyImpulse(new CANNON.Vec3(0, 0, -force), new CANNON.Vec3(x, y, z));
            break;
        case 'ArrowDown':
            ball.getPhysicsBody().applyImpulse(new CANNON.Vec3(0, 0, force), new CANNON.Vec3(x, y, z));
            break;
        case 'ArrowLeft':
            ball.getPhysicsBody().applyImpulse(new CANNON.Vec3(-force, 0, 0), new CANNON.Vec3(x, y, z));
            break;
        case 'ArrowRight':
            ball.getPhysicsBody().applyImpulse(new CANNON.Vec3(force, 0, 0), new CANNON.Vec3(x, y, z));
            break;
    }
});

this.getPhysicsBody().addEventListener('collide', (ev) => {
    console.log(ev);
});
