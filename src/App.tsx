import React from 'react';
import '@babylonjs/core/Debug/debugLayer';
import '@babylonjs/inspector';
import {
  Engine,
  Scene,
  ArcRotateCamera,
  Vector3,
  HemisphericLight,
  Mesh,
  MeshBuilder,
  Nullable,
} from '@babylonjs/core';
import './scss/app.scss';

class BabylonCanvas {
  constructor(
    cnv: Nullable<
      | HTMLCanvasElement
      | OffscreenCanvas
      | WebGLRenderingContext
      | WebGL2RenderingContext
    >
  ) {
    // initialize babylon scene and engine
    const engine = new Engine(cnv, true);
    const scene = new Scene(engine);

    //
    const camera: ArcRotateCamera = new ArcRotateCamera(
      'Camera',
      Math.PI / 2,
      Math.PI / 2,
      2,
      Vector3.Zero(),
      scene
    );
    camera.attachControl(cnv, true);
    camera.position = new Vector3(6, 6, 3);

    //
    const light1: HemisphericLight = new HemisphericLight(
      'light1',
      new Vector3(1, 1, 0),
      scene
    );
    console.log(light1);

    //
    const sphere: Mesh = MeshBuilder.CreateSphere(
      'sphere',
      { diameter: 2, segments: 32 },
      scene
    );
    // Move the sphere upward 1/2 its height
    sphere.position.y = 1;
    console.log(sphere);

    // Built-in 'ground' shape.
    const ground = MeshBuilder.CreateGround(
      'ground',
      { width: 6, height: 6 },
      scene
    );

    // hide/show the Inspector
    window.addEventListener('keydown', (ev) => {
      // Shift+Ctrl+Alt+I
      if (
        ev.shiftKey &&
        ev.ctrlKey &&
        ev.altKey &&
        ev.code === '73' // 'i'
      ) {
        if (scene.debugLayer.isVisible()) {
          scene.debugLayer.hide();
        } else {
          scene.debugLayer.show();
        }
      }
    });
    // run the main render loop
    engine.runRenderLoop(() => {
      scene.render();
    });
  }
}

class App extends React.Component {
  private cnv: React.RefObject<HTMLCanvasElement>;

  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.cnv = React.createRef();
  }

  componentDidMount() {
    if (this.cnv.current) {
      new BabylonCanvas(this.cnv.current);
    }
  }

  render() {
    return (
      <>
        <a
          href='https://doc.babylonjs.com/guidedLearning/usingVite#setting-up-vite--babylonjs'
          target='_blanks'
        >
          Vite REact TS BabylonJS App
        </a>
        <canvas
          ref={this.cnv}
          id='BabylonCanvas'
        />
      </>
    );
  }
}

export default App;
