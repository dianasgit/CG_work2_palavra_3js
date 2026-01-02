import * as THREE from './three.module.js';

class TextGeometry extends THREE.ExtrudeGeometry {
    constructor(text, options) {
        const font = options.font;
        const shapes = font.generateShapes(text, options.size);
        super(shapes, {
            depth: options.height,
            bevelEnabled: options.bevelEnabled,
            bevelThickness: options.bevelThickness,
            bevelSize: options.bevelSize,
            curveSegments: options.curveSegments,
        });
        this.type = 'TextGeometry';
    }
}

export { TextGeometry };
