import './style.css'

import * as THREE from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);
renderer.render(scene, camera);
//Shape 
const geometry = new THREE.TorusKnotGeometry(10, 3, 16, 100)
const material = new THREE.MeshStandardMaterial({ color: 0xacb7d4,wireframe: true });
const torus = new THREE.Mesh(geometry,material);

scene.add(torus)

//Lights
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)

//helpers
/*const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper)*/

const controls = new OrbitControls(camera, renderer.domElement);

//stars
function addStar(){
    const geometry = new THREE.SphereGeometry(0.25, 24 , 24);
    const material = new THREE.MeshStandardMaterial({color: 0xffffff});
    const star = new THREE.Mesh(geometry, material);

    const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x,y,z);
    scene.add(star)
}
Array(500).fill().forEach(addStar)
//Background
const spaceTexture = new THREE.TextureLoader().load('Space.jpg');
scene.background = spaceTexture;

//Avatar 

const logoTexture = new THREE.TextureLoader().load('Saif.jpg');

const saif = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map:logoTexture})
);

scene.add(saif)
//Moon
const moonTexture = new THREE.TextureLoader().load('Moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture
  })
);
moon.position.z = 30;
moon.position.setX(-10);
scene.add(moon)
saif.position.z = -5;
saif.position.x = 2;
//Scrolling animation
function moveCamera(){
    const currScrolling = document.body.getBoundingClientRect().top; //user currently scrolling there
    moon.rotation.x += 0.05;
    moon.rotation.y += 0.075;
    moon.rotation.z += 0.05;

    saif.rotation.y += 0.01;
    saif.rotation.z += 0.01;

    camera.position.z = currScrolling * -0.01;
    camera.position.x = currScrolling *  -0.0002;
    camera.rotation.y = currScrolling *  -0.0002;
}
document.body.onscroll = moveCamera;
moveCamera();
//animation loop
function animate(){
    requestAnimationFrame(animate);
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

    moon.rotation.x += 0.005;
    controls.update();
    renderer.render(scene, camera);    
}
animate()