// Create scene, camera, renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('car-canvas') });
renderer.setSize(1200, 600);

renderer.setClearColor(0xffffff1);

// Load car model
const loader = new THREE.GLTFLoader();
loader.load('amclaren.gltf', function (gltf) {
    const car = gltf.scene;
    scene.add(car);

    camera.position.set(5, 5, 11); // Set camera position
    car.scale.set(3, 3, 3);
    camera.lookAt(car.position);

}, undefined, function (error) {
    console.error(error);
});

// Add lights
const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Ambient light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Directional light
directionalLight.position.set(5, 10, 5);
scene.add(directionalLight);

// Add orbit controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
camera.position.z = 5;

// Function to change car color
function changeColor(color) {
    let hexColor;
    switch (color) {
        case 'violet':
            hexColor = 0x8B33CF;
            break;
        case 'white':
            hexColor = 0xffffff;
            break;
        case 'blue':
            hexColor = 0x0000ff;
            break;
        case 'red':
            hexColor = 0xff0000;
            break;
        default:
            hexColor = 0x000000; // Default to black
    }
    // Adjust material color of the car model
    scene.traverse(function (node) {
        if (node.isMesh) {
            node.material.color.setHex(hexColor);
        }
    });
}

// Render function
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);

    
}


animate();
