/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */



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
/**
 * A class for generating text as a single geometry. It is constructed by providing a string of text, and a set of
 * parameters consisting of a loaded font and extrude settings.
 *
 * See the {@link FontLoader} page for additional details.
 *
 * `TextGeometry` uses [typeface.json]{@link http://gero3.github.io/facetype.js/} generated fonts.
 * Some existing fonts can be found located in `/examples/fonts`.
 *
 * ```js
 * const loader = new FontLoader();
 * const font = await loader.loadAsync( 'fonts/helvetiker_regular.typeface.json' );
 * const geometry = new TextGeometry( 'Hello three.js!', {
 * 	font: font,
 * 	size: 80,
 * 	depth: 5,
 * 	curveSegments: 12
 * } );
 * ```
 *
 * @augments ExtrudeGeometry
 * @three_import import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
 */

export { TextGeometry };
