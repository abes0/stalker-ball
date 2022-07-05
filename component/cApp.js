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
    this.initialDir = new THREE.Vector3(0.0, 0.0, 0.0)
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
    const distance = Math.sqrt(dx * dx + dy * dy) / 100;
    this.mesh.position.set(this.now.x, this.now.y);

    if(distance < 0.001) return

    // //=========
    // const vecX = new THREE.Vector3(this.now.x, 0.0, 1.0).normalize();
    // const vecY = new THREE.Vector3(0.0, this.now.y, 1.0).normalize();
    // const _tangent = new THREE.Vector3().crossVectors(vecX, vecY);
    // _tangent.normalize()


    const nowDir = new THREE.Vector3(this.now.x, this.now.y, 1.0).normalize();
    const targetDir = new THREE.Vector3(
      this.mouse.x,
      this.mouse.y,
      1.0
    ).normalize();
    const tangent = new THREE.Vector3().crossVectors(nowDir, targetDir);
    tangent.normalize();
    console.log(tangent);

    const cos = nowDir.dot(targetDir);

    const radians = Math.acos(cos);

    const qtn = new THREE.Quaternion()
      .setFromAxisAngle(tangent, -distance)
      .normalize();
    this.mesh.quaternion.premultiply(qtn);

    //=========

    if (dx > 0) {
    } else {
    }

    if (dy < 0) {
    } else {
    }
  }

  onResize() {
    // console.log('onResize');
  }
}
