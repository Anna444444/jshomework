import * as THREE from 'three';
import * as CANNON from 'cannon'

export class Object3d {
  constructor(layer, type, size, color, mass) {
    this.layer = layer;
    this.type = type;
    this.size = size;
    this.color = color;
    this.mass = mass;
    this.mesh = this.createMesh();
    this.physicsMaterial = new CANNON.Material();
    this.physicsBody = this.createPhysicsBody();
    this.frictionMap = new Map();
  }

  createMesh() {
    let geometry;
    switch (this.type) {
      case 'sphere':
        geometry = new THREE.SphereGeometry(...this.size);
        break;
      case 'box':
        geometry = new THREE.BoxGeometry(...this.size);
        break;
      case 'plane':
        geometry = new THREE.PlaneGeometry(...this.size);
        break;
      default:
        throw new Error(`Invalid object type: ${this.type}`);
    }
    const material = new THREE.MeshBasicMaterial({ color: this.color, side: THREE.DoubleSide });
    return new THREE.Mesh(geometry, material);
  }

  createPhysicsBody() {
    let shape;
    switch (this.type) {
      case 'sphere':
        shape = new CANNON.Sphere(this.size[0]);
        break;
      case 'box':
        shape = new CANNON.Box(new CANNON.Vec3().copy(new CANNON.Vec3(...this.size).scale(0.5)));
        break;
      case 'plane':
        shape = new CANNON.Plane();
        break;
      default:
        throw new Error(`Invalid object type: ${this.type}`);
    }
    const body = new CANNON.Body({ mass: this.mass, shape });
    return body;
  }

  setFriction(otherObject, value) {
    const contactMaterial = new CANNON.ContactMaterial(
      this.physicsMaterial,
      otherObject.physicsMaterial,
      {
        friction: value
      }
    );
    this.layer.getWorld().addContactMaterial(contactMaterial);
    this.frictionMap.set(otherObject, contactMaterial);
  }

  rotate(x, y, z) {
    this.mesh.rotation.set(x, y, z);
    this.physicsBody.quaternion.setFromEuler(x, y, z, 'XYZ');
  }

  move(x, y, z) {
    this.mesh.position.set(x, y, z);
    this.physicsBody.position.set(x, y, z);
  }

  force(x, y, z) {
    const force = new CANNON.Vec3(x, y, z);
    this.physicsBody.force.copy(force);
  }

  applyForce(x, y, z) {
    const force = new CANNON.Vec3(x, y, z);
    this.physicsBody.applyForce(force, this.physicsBody.position);
  }

  setPosition(x, y, z) {
    this.mesh.position.set(x, y, z);
    this.physicsBody.position.set(x, y, z);
  }

  setFixedRotation(value) {
    this.physicsBody.fixedRotation = value;
  }

  isFixedRotation() {
    return this.physicsBody.fixedRotation;
  }

  setDamping(value) {
    this.physicsBody.linearDamping = value;
  }

  getMesh() {
    return this.mesh;
  }

  getPhysicsBody() {
    return this.physicsBody;
  }

  getPhysicsMaterial() {
    return this.physicsMaterial;
  }

  update() {
    this.mesh.position.copy(this.physicsBody.position);
    this.mesh.quaternion.copy(this.physicsBody.quaternion);
  }

  addEventListener(type, listener) {
    this.physicsBody.addEventListener(type, listener);
  }

  removeEventListener(type, listener) {
    this.physicsBody.removeEventListener(type, listener);
  }
}
