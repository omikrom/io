import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';

const render = function() {

    const scene = new THREE.Scene();
    let myCanvas = document.querySelector('#cvs');
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    let model = [];

    const renderer = new THREE.WebGLRenderer({ canvas: myCanvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    const loader = new STLLoader();
    loader.load('../logo.stl', function(geo) {
            const mat = new THREE.MeshPhongMaterial({ color: 0xffffff, reflectivity: 1 });
            const mesh = new THREE.Mesh(geo, mat)
            mesh.position.set(-2.5, 1, 0);
            mesh.rotation.set(-Math.PI / 2, 0, 0);
            mesh.scale.set(10, 10, 10);
            scene.add(mesh);
            model.push(mesh);
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        (error) => {
            console.log('An error happened');
        }
    )

    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(10, 20, 10);
    scene.add(light);
    const lightHelper = new THREE.PointLightHelper(light, 1);
    scene.add(lightHelper);

    let pivotPoint = new THREE.Object3D();
    pivotPoint.position.set(0, 0, 0);
    scene.add(pivotPoint);
    pivotPoint.add(light);


    const geometry = new THREE.SphereGeometry(0.1, 8, 8);

    let particles = [];
    let particlePositions = [];
    var seperation = 1;
    var amountX = 100;
    var amountY = 100;

    for (let i = 0; i < amountX; i++) {
        for (let j = 0; j < amountY; j++) {
            let mat = new THREE.MeshPhongMaterial({ color: 0xffffff, reflectivity: 1 });
            var particle = new THREE.Mesh(geometry, mat);
            particle.position.x = i * seperation - ((seperation * amountX) / 2);
            particle.position.z = j * seperation - ((seperation * amountY) / 2);
            scene.add(particle);
            particles.push(particle);
            particlePositions.push(particle.position);
        }
    }




    console.log(scene.children);

    camera.position.z = 30;
    camera.position.y = 15;
    camera.position.x = 10;

    function animate() {
        requestAnimationFrame(animate);
        animRotation();
        TWEEN.update();
        renderRipple();
        render();
        renderer.render(scene, camera);
    }


    let speed = 1500;
    let frequency = 2;
    let amplitude = 2;


    function renderWave() {
        for (let i = 0; i < particles.length; i++) {
            let particle = particles[i];
            particle.position.y = Math.sin(i / frequency + (Date.now() / speed)) * amplitude;
        }
    }

    function renderWaves() {
        for (let i = 0; i < particles.length; i++) {
            let particle = particles[i];
            particle.position.y = Math.sin(i / frequency + (Date.now() / speed)) * amplitude;
        }

    }

    const bounce = () => {
        new TWEEN.Tween(model[0].position)
            .to({ y: 2 }, 4500)
            .easing(TWEEN.Easing.Quadratic.Out)
            .start()
            .onComplete(() => {
                new TWEEN.Tween(model[0].position)
                    .to({ y: -0.5 }, 4500)
                    .easing(TWEEN.Easing.Quadratic.In)
                    .start()
            })
    }

    setInterval(bounce, 9000);


    // render rippleWave from particle array 
    function renderRipple() {
        // loop through array from middle to edges
        for (let i = 0; i < particles.length; i++) {
            let particle = particles[i];
            let distance = Math.sqrt(Math.pow(particle.position.x, 2) + Math.pow(particle.position.z, 2));
            particle.position.y = Math.sin(distance / frequency + (Date.now() / speed)) * amplitude;
        }

    }

    function animRotation() {
        pivotPoint.rotation.y += 0.005;
        pivotPoint.rotation.z += 0.0005;
        pivotPoint.rotation.x += 0.0005;
    }

    function render() {
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
    }

    function renderCameraMovement() {
        camera.position.x += (-mouse.x - camera.position.x) * 0.05;
        camera.position.y += (-mouse.y - camera.position.y) * 0.05;
        camera.lookAt(scene.position);
    }
    var mouse = new THREE.Vector2();
    const pointer = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();

    window.addEventListener('mousemove', onMouseMove);

    function onMouseMove(event) {
        mouse.x = -(event.clientX / (window.innerWidth / 2) - 1) * 10;
        mouse.y = (event.clientY / (window.innerHeight / 2) - 1) * 10;
        pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(pointer, camera);
        const intersects = raycaster.intersectObjects(scene.children, false);
        if (intersects.length > 0) {
            const intersect = intersects[0];
            intersect.object.userData.hover = true;
            intersect.object.material.color.set(0x000000);
        }


        console.log(mouse);
    }

    animate();


}

export default render;