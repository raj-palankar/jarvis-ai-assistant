import * as THREE from 'three';

// Setup scene, camera, renderer
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x0a0f1f, 0.008);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 30;

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('bgCanvas'), alpha: false });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Create particle system
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 2000;
const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i += 3) {
    posArray[i] = (Math.random() - 0.5) * 200;
    posArray[i+1] = (Math.random() - 0.5) * 100;
    posArray[i+2] = (Math.random() - 0.5) * 100;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.2,
    color: 0x00f7ff,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Create a torus knot (3D object)
const geometry = new THREE.TorusKnotGeometry(5, 1.5, 200, 32, 3, 4);
const material = new THREE.MeshStandardMaterial({
    color: 0x00f7ff,
    emissive: 0x005566,
    roughness: 0.3,
    metalness: 0.8,
    wireframe: false
});
const torusKnot = new THREE.Mesh(geometry, material);
scene.add(torusKnot);

// Create a second torus knot with wireframe
const geometry2 = new THREE.TorusKnotGeometry(6, 1.8, 200, 32, 3, 4);
const material2 = new THREE.MeshStandardMaterial({
    color: 0xff00ff,
    emissive: 0x330033,
    roughness: 0.3,
    metalness: 0.8,
    wireframe: true,
    transparent: true,
    opacity: 0.3
});
const torusKnot2 = new THREE.Mesh(geometry2, material2);
scene.add(torusKnot2);

// Create floating spheres
const sphereGroup = [];
const sphereCount = 30;

for (let i = 0; i < sphereCount; i++) {
    const sphereGeo = new THREE.SphereGeometry(0.3, 16, 16);
    const sphereMat = new THREE.MeshStandardMaterial({
        color: 0x00f7ff,
        emissive: 0x004444,
        metalness: 0.9,
        roughness: 0.1
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    
    sphere.userData = {
        speedX: (Math.random() - 0.5) * 0.02,
        speedY: (Math.random() - 0.5) * 0.02,
        speedZ: (Math.random() - 0.5) * 0.02,
        range: 15
    };
    
    sphere.position.x = (Math.random() - 0.5) * 40;
    sphere.position.y = (Math.random() - 0.5) * 30;
    sphere.position.z = (Math.random() - 0.5) * 40;
    
    scene.add(sphere);
    sphereGroup.push(sphere);
}

// Create stars background
const starGeometry = new THREE.BufferGeometry();
const starCount = 1500;
const starPositions = new Float32Array(starCount * 3);

for (let i = 0; i < starCount * 3; i += 3) {
    starPositions[i] = (Math.random() - 0.5) * 500;
    starPositions[i+1] = (Math.random() - 0.5) * 300;
    starPositions[i+2] = (Math.random() - 0.5) * 150 - 50;
}

starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));

const starMaterial = new THREE.PointsMaterial({
    size: 0.15,
    color: 0xffffff,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

// Create ring of light
const ringGeometry = new THREE.TorusGeometry(8, 0.1, 100, 200);
const ringMaterial = new THREE.MeshStandardMaterial({
    color: 0x00f7ff,
    emissive: 0x00f7ff,
    emissiveIntensity: 0.5
});
const ring = new THREE.Mesh(ringGeometry, ringMaterial);
scene.add(ring);

// Lighting
const ambientLight = new THREE.AmbientLight(0x111122);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0x00f7ff, 1, 100);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

const pointLight2 = new THREE.PointLight(0xff00ff, 0.5, 100);
pointLight2.position.set(-10, -5, 10);
scene.add(pointLight2);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(5, 10, 7);
scene.add(directionalLight);

// Mouse interaction
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = (event.clientY / window.innerHeight) * 2 - 1;
});

// Animation loop
let time = 0;

function animate() {
    requestAnimationFrame(animate);
    time += 0.005;
    
    // Rotate main torus knot
    torusKnot.rotation.x += 0.005;
    torusKnot.rotation.y += 0.01;
    torusKnot.rotation.z += 0.007;
    
    // Rotate second torus knot in opposite direction
    torusKnot2.rotation.x -= 0.003;
    torusKnot2.rotation.y -= 0.007;
    torusKnot2.rotation.z -= 0.005;
    
    // Rotate ring
    ring.rotation.x = Math.sin(time * 0.5) * 0.5;
    ring.rotation.y = time * 0.3;
    ring.rotation.z = Math.cos(time * 0.5) * 0.5;
    
    // Animate particles
    particlesMesh.rotation.y += 0.0005;
    particlesMesh.rotation.x += 0.0003;
    
    // Rotate stars slowly
    stars.rotation.y += 0.0002;
    stars.rotation.x += 0.0001;
    
    // Animate spheres
    sphereGroup.forEach(sphere => {
        sphere.position.x += sphere.userData.speedX;
        sphere.position.y += sphere.userData.speedY;
        sphere.position.z += sphere.userData.speedZ;
        
        // Bounce back if out of range
        if (Math.abs(sphere.position.x) > sphere.userData.range) {
            sphere.userData.speedX *= -1;
        }
        if (Math.abs(sphere.position.y) > sphere.userData.range) {
            sphere.userData.speedY *= -1;
        }
        if (Math.abs(sphere.position.z) > sphere.userData.range) {
            sphere.userData.speedZ *= -1;
        }
        
        // Pulse effect
        const scale = 1 + Math.sin(time * 2 + sphere.position.x) * 0.3;
        sphere.scale.set(scale, scale, scale);
    });
    
    // Camera movement based on mouse
    camera.position.x += (mouseX * 2 - camera.position.x) * 0.05;
    camera.position.y += (-mouseY * 2 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);
    
    // Change colors based on time
    const hue = (time * 0.1) % 1;
    torusKnot.material.color.setHSL(hue, 1, 0.5);
    ring.material.color.setHSL(hue, 1, 0.5);
    
    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}