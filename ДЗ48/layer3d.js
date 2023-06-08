import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as CANNON from 'cannon'

export class Layer3d {
    constructor(renderer) {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.orbitCtrl = new OrbitControls(this.camera, renderer.domElement);
        this.objects = [];
        this.world = new CANNON.World({
            gravity: new CANNON.Vec3(0, 5, 30)
        });
        this.renderer = renderer;
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        this.camera.position.set(0, 5, 30);
        this.orbitCtrl.update();
    }

    add(object) {
        this.objects.push(object);
        this.scene.add(object.getMesh());
        this.world.addBody(object.getPhysicsBody());
    }

    remove(object) {
        const index = this.objects.indexOf(object);
        if (index !== -1) {
            this.objects.splice(index, 1);
            this.scene.remove(object.getMesh());
            this.world.removeBody(object.getPhysicsBody());
        }
    }

    animationLoop() {
        for (const object of this.objects) {
            object.update();
        }
        this.renderer.render(this.scene, this.camera);
    }

    getWorld() {
        return this.world;
    }
}