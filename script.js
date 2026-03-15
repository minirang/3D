const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 5;
const light = new THREE.PointLight(0xffffff, 2);
light.position.set(5, 5, 5);
scene.add(light);
const light2 = new THREE.AmbientLight(0x404040);
scene.add(light2);
let shape;
const material = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.8, roughness: 0.2 });
function createShape(type) {
    if (shape) scene.remove(shape);
    let geometry;
    switch (type) {
        case "box":
            geometry = new THREE.BoxGeometry(2, 2, 2);
            break;
        case "sphere":
            geometry = new THREE.SphereGeometry(1.5, 32, 32);
            break;
        case "cylinder":
            geometry = new THREE.CylinderGeometry(1, 1, 3, 32);
            break;
        case "cone":
            geometry = new THREE.ConeGeometry(1.5, 3, 32);
            break;
        case "torus":
            geometry = new THREE.TorusGeometry(1.2, 0.5, 16, 100);
            break;
    }
    shape = new THREE.Mesh(geometry, material);
    scene.add(shape);
}
createShape("box"); // 초기 도형
const selector = document.getElementById("shapeSelector");
selector.addEventListener("change", (e) => createShape(e.target.value));
let mouseDown = false;
document.addEventListener("mousedown", () => mouseDown = true);
document.addEventListener("mouseup", () => mouseDown = false);
document.addEventListener("mousemove", (e) => {
    if (mouseDown && shape) {
        shape.rotation.y += e.movementX * 0.01;
        shape.rotation.x += e.movementY * 0.01;
    }
});
function animate() {
    requestAnimationFrame(animate);

    if (shape) {
        // 자동회전
        shape.rotation.y += 0.0015;
        shape.rotation.x += 0.0015;
    }

    renderer.render(scene, camera);
}
animate();
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
