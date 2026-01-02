import { FontLoader } from '../lib/FontLoader.js';
import { TextGeometry } from '../lib/TextGeometry.js';
import { scene, camera, renderer } from './anime.js'; 
import * as THREE from '../lib/three.module.js';

const loader = new FontLoader();
const meuArquivoLocal = '../lib/Lucida_Italic.json';

loader.load(meuArquivoLocal, font => {

    const palavra = 'exists';
    const arrayLetras = [];

    const material = new THREE.MeshPhongMaterial({ //classe de aparência
        color: 0xffc400,
        shininess: 80
    });

    let xAtual = 0;

    const palavraFinal = new THREE.Object3D();
    scene.add(palavraFinal);

    [...palavra].forEach((letra) => {
        const contrucLetras = new TextGeometry(letra, { //classe que cria geometria 3D a partir de texto
            font: font,
            size: 30,
            height: 1,
            curveSegments: 100,
            bevelEnabled: true,
            bevelThickness: 2,
            bevelSize: 0.05
        });

        contrucLetras.computeBoundingBox(); //caixa que contém todas letras
        const largura = contrucLetras.boundingBox.max.x - contrucLetras.boundingBox.min.x;
        const minY = contrucLetras.boundingBox.min.y;  //para alinhar pela borda inferior

        contrucLetras.translate(-contrucLetras.boundingBox.min.x, -minY, -contrucLetras.boundingBox.min.z);

        const letraIndividual = new THREE.Mesh(contrucLetras, material);

        letraIndividual.position.x = xAtual; 
        letraIndividual.position.y = 0; // base no y=0
        letraIndividual.position.z = -1000;  //animação entrada do fundo

        palavraFinal.add(letraIndividual);
        arrayLetras.push(letraIndividual);

        xAtual += largura; // 
    });

    // centraliza horizontalmente 
    const totalWidth = xAtual;
    palavraFinal.children.forEach(letraIndividual => {
        letraIndividual.position.x -= totalWidth / 2; //assim move a palavra toda para a esq
    });

    let flagMoverParaFrente = true;
    function trazerParaFrente() {
        flagMoverParaFrente = false;
        arrayLetras.forEach(letraIndividual => {
            if (letraIndividual.position.z < 0) {
                letraIndividual.position.z += 10;
                flagMoverParaFrente = true;
            }
        });
    }

    function animate() {
        requestAnimationFrame(animate);

        trazerParaFrente();

        if (!flagMoverParaFrente) {
            palavraFinal.rotation.y += 0.005;
        }

        renderer.render(scene, camera);
    }

    animate();
});
