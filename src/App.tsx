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

    const camera: ArcRotateCamera = new ArcRotateCamera(
      'Camera',
      Math.PI / 2,
      Math.PI / 2,
      2,
      Vector3.Zero(),
      scene
    );
    camera.attachControl(cnv, true);
    const light1: HemisphericLight = new HemisphericLight(
      'light1',
      new Vector3(1, 1, 0),
      scene
    );
    const sphere: Mesh = MeshBuilder.CreateSphere(
      'sphere',
      { diameter: 1 },
      scene
    );

    // hide/show the Inspector
    window.addEventListener('keydown', (ev) => {
      // Shift+Ctrl+Alt+I
      if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.keyCode === 73) {
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
