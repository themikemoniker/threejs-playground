import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js"

const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const fov = 75; //in degrees
const aspect = w / h;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 5;
const scene = new THREE.Scene();

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true;
controls.dampingFactor = 0.03;

const loader = new THREE.TextureLoader();
const geo = new THREE.IcosahedronGeometry(1,12);
const mat = new THREE.MeshStandardMaterial({
    map: loader.load("./assets/earthmap1k.jpg")
});
const earthMesh = new THREE.Mesh(geo, mat);
scene.add(earthMesh);


const hemiLight = new THREE.HemisphereLight()
scene.add(hemiLight);

function animate(t = 0){
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
    controls.update();
}
animate();
