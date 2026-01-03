import * as THREE from '../lib/three.module.js';
window.THREE = THREE;  //coloca no escopo glogal para que assim o fontloader e textgeometry funcionem


export const scene = new THREE.Scene();

//(Campo de visão (FOV) , Proporção da tela, Distância mínima visível, Distância máxima visível)
export const camera = new THREE.PerspectiveCamera(
    75, 
    window.innerWidth / window.innerHeight, 
    0.1, 
    1000
);
camera.position.z = 100;

export const renderer = new THREE.WebGLRenderer({ antialias: true }); // true para melhorar as bordas
//como não declarei cor fica a padrão
renderer.setSize(window.innerWidth, window.innerHeight); //canvas size
document.body.appendChild(renderer.domElement); //coloca o canva no html

// Luzes
const spotLight = new THREE.SpotLight(
    0xffdddd, // rgb
    1000,     //intensidade
    800,      
    Math.PI / 3, // ângulo do cone 
    0.3,      // penumbra (borda suave)
    0.4 // decaimento
);

spotLight.position.set(-150, 0, 50);
spotLight.target.position.set(0, 0, 0);

scene.add(spotLight);
scene.add(spotLight.target);

// Luz ambiente fraca
scene.add(new THREE.AmbientLight(0xffffff, 0.5));


window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

export function startAnimation(arrayLetras = []) {
    function animate() {
        requestAnimationFrame(animate); //navegador chamar animate de novo antes do próximo frame

        arrayLetras.forEach(letra => {
            letra.rotation.y += 0.005;
        });

        renderer.render(scene, camera);
    }
    animate();
}