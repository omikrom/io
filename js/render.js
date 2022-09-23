import * as THREE from 'three';
import clock from './clock.js';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler.js'

const render = function(options) {


    const scene = new THREE.Scene();
    let myCanvas = document.querySelector('#cvs');
    let canvasContainer = document.querySelector('#canvas--container');
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    let model = [];

    const renderer = new THREE.WebGLRenderer({ canvas: myCanvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    /*
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
        },
    )*/



    var light;
    if (options.performance === "low") {
        light = new THREE.PointLight(0xffffff, 1, 42);
    } else {
        light = new THREE.PointLight(0xffffff, 1, 42);
    }
    light.position.set(10, 20, 10);
    scene.add(light);
    //const lightHelper = new THREE.PointLightHelper(light, 1);
    //scene.add(lightHelper);


    var light2 = new THREE.PointLight(0xffffff, 0.5, 42);
    light2.position.set(-10, -20, -10);
    scene.add(light2);
    //const lightHelper2 = new THREE.PointLightHelper(light2, 1);
    //scene.add(lightHelper2)

    let pivotPoint = new THREE.Object3D();
    pivotPoint.position.set(0, 0, 0);
    scene.add(pivotPoint);

    pivotPoint.add(light);
    pivotPoint.add(light2);




    const geometry = new THREE.SphereGeometry(0.1, 8, 8);

    let particles = [];
    let particlePositions = [];


    if (options.performance == "low") {
        var amountX = 50;
        var amountY = 50;
        var seperation = 2;
    } else {
        var amountX = 100;
        var amountY = 100;
        var seperation = 1;
    }


    for (let i = 0; i < amountX; i++) {
        for (let j = 0; j < amountY; j++) {
            var mat;
            if (options.performance == "low") {
                mat = new THREE.MeshStandardMaterial({ color: 0xffffff });
            } else {
                mat = new THREE.MeshPhongMaterial({ color: 0xffffff, reflectivity: 1, shininess: 100 });
            }
            //let mat = new THREE.MeshPhongMaterial({ color: 0xffffff, reflectivity: 1 });
            var particle = new THREE.Mesh(geometry, mat);
            particle.position.x = i * seperation - ((seperation * amountX) / 2);
            particle.position.z = j * seperation - ((seperation * amountY) / 2);
            particle.userData.orignalPosition = particle.position.clone();
            scene.add(particle);
            particles.push(particle);
            particlePositions.push(particle.position);
        }
    }


    camera.position.z = 30;
    camera.position.y = 10;
    camera.position.x = 10;
    /*
    var steps = 0;
    var minSteps = 50;
    var maxSteps = 200;
    var introComplete = false;
    var spiralComplete = false;
    var startPosition = false;
    var completeAnim = false;*/

    function animate() {
        clock();
        requestAnimationFrame(animate);
        animRotation();
        renderRipple();
        render();
    }

    /*
    function animate() {
        requestAnimationFrame(animate);
        animRotation();
        if (!completeAnim) {
            if (steps < maxSteps && !introComplete) {
                renderRipple();
                steps++;
                if (steps == maxSteps) {
                    introComplete = true;
                }
            } else {
                returnToOriginalPosition();
                startPosition = true;
            }
            if (introComplete && startPosition && rippleEnd) {
                if (rotations >= 100) {
                    spiralComplete = true;
                }
                if (!spiralComplete) {
                    renderSpiral();
                } else {
                    returnToOriginalPosition2();
                }
            }
        } else {
            renderWave();
        }
        render();
    }
    */
    //tweenToRipple();


    let freqSlider = document.querySelector('#frequency');
    freqSlider.addEventListener('input', function() {
        console.log(freqSlider.value);
        let sliderValue = 25;
        for (let i = 0; i < freqSlider.value; i++) {
            sliderValue -= 1;
        }
        sliderValue = sliderValue / 10;
        console.log(sliderValue);
        frequency = sliderValue;
    });

    let amplSlider = document.querySelector('#amplitude');
    amplSlider.addEventListener('input', function() {
        console.log(amplSlider.value);
        let sliderValue = 0;
        for (let i = 0; i < amplSlider.value; i++) {
            sliderValue += 1;
        }
        sliderValue = sliderValue / 5;
        console.log(sliderValue);
        amplitude = sliderValue;
    });

    let speedSlider = document.querySelector('#speed');
    speedSlider.addEventListener('input', function() {
        console.log(speedSlider.value);
        let sliderValue = 2750;
        for (let i = 0; i < speedSlider.value; i++) {
            sliderValue -= 250;
        }
        sliderValue = sliderValue;
        console.log(sliderValue);
        speed = sliderValue;
    });


    let colorChoice = document.querySelector('#colour');
    let colourValue1;
    colorChoice.addEventListener('input', function() {
        colourValue1 = colorChoice.value;
    });

    colorChoice.addEventListener('change', function() {
        let color = new THREE.Color(colourValue1);
        light.color = color;
    });

    let colorChoice2 = document.querySelector('#colourTwo');
    let colourValue2;

    colorChoice2.addEventListener('input', function() {
        colourValue2 = colorChoice2.value;
    });

    colorChoice2.addEventListener('change', function() {
        let color = new THREE.Color(colourValue2);
        light2.color = color;
    });

    let lightBrightness1 = document.querySelector('#light1brightness');
    lightBrightness1.addEventListener('input', function() {
        let sliderValue = 0;
        for (let i = 0; i < lightBrightness1.value; i++) {
            sliderValue += 1;
        }
        sliderValue = sliderValue / 50;
        light.intensity = sliderValue;
    });

    let lightBrightness2 = document.querySelector('#light2brightness');
    lightBrightness2.addEventListener('input', function() {
        let sliderValue = 0;
        for (let i = 0; i < lightBrightness2.value; i++) {
            sliderValue += 1;
        }
        sliderValue = sliderValue / 50;
        light2.intensity = sliderValue;
    });


    let speed = 1500;
    let frequency = 2;
    let amplitude = 1;


    // render rippleWave from particle array 
    function renderRipple() {
        for (let i = 0; i < particles.length; i++) {
            let particle = particles[i];
            let distance = Math.sqrt(Math.pow(particle.position.x, 2) + Math.pow(particle.position.z, 2));
            particle.position.y = Math.sin(distance / frequency + (Date.now() / speed)) * amplitude;
        }
    }

    /*
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
    }*/

    /*
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

    setInterval(bounce, 9000);*/

    /*
    var ripple = [];

    function calcRippleTarget() {
        for (let i = 0; i < particles.length; i++) {
            let particle = particles[i];
            let distance = Math.sqrt(Math.pow(particle.position.x, 2) + Math.pow(particle.position.z, 2));
            let target = Math.sin(distance / frequency + (Date.now() / speed)) * amplitude;
            ripple.push(target);
        }
    }
    calcRippleTarget();
    */

    /*
    var rippleComplete = false;

    function tweenToRipple() {
        for (let i = 0; i < particles.length; i++) {
            let particle = particles[i];
            new TWEEN.Tween(particle.position)
                .to({ y: ripple[i] }, 100)
                .easing(TWEEN.Easing.Quadratic.Out)
                .start()
                .onComplete(() => {
                    rippleComplete = true;
                });
        }
    }
        
    var rotations = 0;
    */


    /*

    var rippleEnd = false;

    function returnToOriginalPosition() {
        for (let i = 0; i < particles.length; i++) {
            let endPosY = particles[i].userData.orignalPosition.y;
            let particle = particles[i];
            new TWEEN.Tween(particle.position)
                .to({ y: endPosY, }, 1000)
                .easing(TWEEN.Easing.Quadratic.Out)
                .start()
                .onComplete(() => {
                    setTimeout(() => {
                        rippleEnd = true;
                    }, 5000);
                });
        }
    }



    function returnToOriginalPosition2() {
        for (let i = 0; i < particles.length; i++) {
            let particle = particles[i];
            new TWEEN.Tween(particle.position)
                .to({ x: particle.userData.orignalPosition.x, y: particle.userData.orignalPosition.y, z: particle.userData.orignalPosition.z }, 1000)
                .easing(TWEEN.Easing.Quadratic.Out)
                .start()
                .onComplete(() => {
                    setTimeout(() => {
                        completeAnim = true;
                    }, 2000);
                });
        }
    }

    */
    //render sphere from particle array
    /*
    function renderSpiral() {
        for (let i = 0; i < particles.length; i++) {
            let particle = particles[i];
            let distance = Math.sqrt(Math.pow(particle.position.x, 2) + Math.pow(particle.position.z, 2));
            particle.position.y = Math.sin(distance / frequency + (Date.now() / speed)) * amplitude;
            particle.position.x = particle.position.x + Math.sin(distance / frequency + (Date.now() / speed)) * amplitude;
            particle.position.z = particle.position.z + Math.cos(distance / frequency + (Date.now() / speed)) * amplitude;
        }
        rotations++;
    }*/

    //let steps = 0;
    //let maxSteps = 200;

    // render sphere from particle array
    /*
    function renderDisperse() {
        for (let i = 0; i < particles.length; i++) {
            let particle = particles[i];
            particle.position.y = Math.sin(i / frequency + (Date.now() / speed)) * amplitude;
            particle.position.x = particle.position.x + Math.sin(i / frequency + (Date.now() / speed)) / amplitude;
        }
        steps += 1;
    }

    function renderDisperseReverse() {
        for (let i = 0; i < particles.length; i++) {
            let particle = particles[i];
            particle.position.y = Math.sin(i / frequency + (Date.now() / speed)) * amplitude;
            particle.position.x = particle.position.x + Math.sin(i / frequency + (Date.now() / speed)) / amplitude;
        }
        steps += 1;
    }*/

    /*
    // return particles to original positon
    function renderReset() {
        for (let i = 0; i < particles.length; i++) {
            let particle = particles[i];
            let currentX = particle.position.x;
            let currentY = particle.position.y;
            let currentZ = particle.position.z;

            //calculate distance from current position to original position
            let distanceX = particle.userData.orignalPosition.x - currentX;
            let distanceY = particle.userData.orignalPosition.y - currentY;
            let distanceZ = particle.userData.orignalPosition.z - currentZ;

            //move particle towards original position by each step
            particle.position.x = currentX - distanceX / maxSteps;
            particle.position.y = currentY - distanceY / maxSteps;
            particle.position.z = currentZ - distanceZ / maxSteps;
        }
    }*/


    function animRotation() {
        pivotPoint.rotation.y += 0.005;
        pivotPoint.rotation.z += 0.0005;
        pivotPoint.rotation.x += 0.0005;
    }

    function render() {
        camera.lookAt(scene.position);
        TWEEN.update();
        renderer.render(scene, camera);
    }

    function renderCameraMovement() {
        camera.position.x += (-mouse.x - camera.position.x) * 0.05;
        camera.lookAt(scene.position);
    }

    var mouse = new THREE.Vector2();
    const pointer = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();

    window.addEventListener('mousemove', onMouseMove);

    const content = document.querySelector('#content');
    content.addEventListener('scroll', onScroll);

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
            let color = new THREE.Color(generateRandomHexColour());
            intersect.object.material.color.set(color);
        }
        renderCameraMovement();
    }


    let scrollPos = 0;

    function onScroll(event) {
        scrollPos = event.target.scrollTop;
    }

    function generateRandomHexColour() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }

    function generateRandomBlueHexColour() {
        let r = 0;
        let g = 0;
        let b = Math.floor(Math.random() * 255);
        return '#' + r.toString(16) + g.toString(16) + b.toString(16);
    }

    let increase_size = document.getElementById('increase_size');
    let decrease_size = document.getElementById('decrease_size');

    increase_size.addEventListener('click', () => {
        for (let i = 0; i < particles.length; i++) {
            let particle = particles[i];
            particle.scale.x += 0.2;
            particle.scale.y += 0.2;
            particle.scale.z += 0.2;
        }
    });

    decrease_size.addEventListener('click', () => {
        for (let i = 0; i < particles.length; i++) {
            let particle = particles[i];
            particle.scale.x -= 0.2;
            particle.scale.y -= 0.2;
            particle.scale.z -= 0.2;
        }
    });


    window.addEventListener('resize', onWindowResize, false);

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate();
}

export default render;