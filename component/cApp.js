import * as THREE from "three";
import PThree from '../parent/pThree'
export default class CApp extends PThree {
  constructor() {
    super({wrapper: '#app', isFitScreen: true})
  }

  init() {
    this.initMesh();
    this.now = {
      x: 0,
      y: 0,
    };
    this.ease = 0.1;
  }

  initMesh() {
    const geo = new THREE.OctahedronGeometry(30., 2)
    const mat = new THREE.MeshPhongMaterial({
      color: 0xaabbee,
      emissive: 0x072534,
      flatShading: true,
    });
    this.mesh = new THREE.Mesh(geo, mat)
    this.initialDir = new THREE.Vector3(0.0, 1.0, 0.0).normalize()
    this.mesh.position.set(0, 0, 0)
    this.scene.add(this.mesh)
  }
  onMousemove({x, y}) {
    // console.log('onMousemove');
  }

  render() {
    this.now.x += (this.mouse.x - this.now.x) * this.ease;
    this.now.y += (this.mouse.y - this.now.y) * this.ease;

    const dx = this.mouse.x - this.now.x;
    const dy = this.mouse.y - this.now.y;
    const distance = Math.sqrt(dx * dx + dy * dy) / (30 * 2 * Math.PI * 1.5);
    this.mesh.position.set(this.now.x, this.now.y);

    if (distance < 0.001) return;

    //=========
    // Quaternionの処理

    const nowPoint = new THREE.Vector3(this.now.x, this.now.y, 0.0);
    const targetPoint = new THREE.Vector3(this.mouse.x, this.mouse.y, 0.0);

    const subVec = new THREE.Vector3().subVectors(targetPoint, nowPoint);

    const axisVec = new THREE.Vector3().crossVectors(
      subVec,
      new THREE.Vector3(0, 0, 1)
    );
    axisVec.normalize();
    axisVec.negate();

    const qtn = new THREE.Quaternion()
      .setFromAxisAngle(axisVec, distance)
      .normalize();
    this.mesh.quaternion.premultiply(qtn);

    //=========
  }

  onResize() {
    // console.log('onResize');
  }
}
